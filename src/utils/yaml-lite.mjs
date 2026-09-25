function stripComment(line) {
  let single = false, double = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === "'" && !double) {
      if (single && line[i + 1] === "'") { i++; continue; }
      single = !single;
    } else if (ch === '"' && !single && line[i - 1] !== '\\') {
      double = !double;
    } else if (ch === '#' && !single && !double && (i === 0 || /\s/.test(line[i - 1]))) {
      return line.slice(0, i).trimEnd();
    }
  }
  return line.trimEnd();
}

function splitTopLevel(text, delimiter = ',') {
  const out = [];
  let start = 0, depth = 0, single = false, double = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === "'" && !double) {
      if (single && text[i + 1] === "'") { i++; continue; }
      single = !single;
    } else if (ch === '"' && !single && text[i - 1] !== '\\') double = !double;
    else if (!single && !double) {
      if (ch === '[' || ch === '{') depth++;
      else if (ch === ']' || ch === '}') depth--;
      else if (ch === delimiter && depth === 0) { out.push(text.slice(start, i).trim()); start = i + 1; }
    }
  }
  out.push(text.slice(start).trim());
  return out;
}

function findColon(text) {
  let depth = 0, single = false, double = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === "'" && !double) {
      if (single && text[i + 1] === "'") { i++; continue; }
      single = !single;
    } else if (ch === '"' && !single && text[i - 1] !== '\\') double = !double;
    else if (!single && !double) {
      if (ch === '[' || ch === '{') depth++;
      else if (ch === ']' || ch === '}') depth--;
      else if (ch === ':' && depth === 0 && (i === text.length - 1 || /\s/.test(text[i + 1]))) return i;
    }
  }
  return -1;
}

function parseQuoted(text) {
  if (text.startsWith('"')) {
    try { return JSON.parse(text); } catch { throw new Error('Invalid double-quoted string'); }
  }
  if (text.startsWith("'")) {
    if (!text.endsWith("'")) throw new Error('Unclosed single-quoted string');
    return text.slice(1, -1).replace(/''/g, "'");
  }
  return null;
}

function parseScalar(raw) {
  const text = raw.trim();
  if (text === '') return null;
  if (text.startsWith('"') || text.startsWith("'")) return parseQuoted(text);
  if (text.startsWith('[') && text.endsWith(']')) {
    const body = text.slice(1, -1).trim();
    return body ? splitTopLevel(body).map(parseScalar) : [];
  }
  if (text.startsWith('{') && text.endsWith('}')) {
    const body = text.slice(1, -1).trim();
    const obj = {};
    if (!body) return obj;
    for (const part of splitTopLevel(body)) {
      const idx = findColon(part);
      if (idx < 0) throw new Error(`Invalid inline mapping: ${part}`);
      const key = parseKey(part.slice(0, idx));
      obj[key] = parseScalar(part.slice(idx + 1));
    }
    return obj;
  }
  if (/^(?:null|~)$/i.test(text)) return null;
  if (/^(?:true|false)$/i.test(text)) return text.toLowerCase() === 'true';
  if (/^[+-]?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(text)) return Number(text);
  return text;
}

function parseKey(raw) {
  const text = raw.trim();
  if (!text) throw new Error('Mapping key cannot be empty');
  if (text.startsWith('"') || text.startsWith("'")) return String(parseQuoted(text));
  return text;
}

function preprocess(source) {
  if (typeof source !== 'string') throw new TypeError('YAML input must be text');
  const rows = source.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split('\n');
  const lines = [];
  for (let i = 0; i < rows.length; i++) {
    const raw = rows[i];
    if (/^\s*\t/.test(raw) || /^ +\t/.test(raw)) throw new Error(`Line ${i + 1}: tabs are not allowed for indentation`);
    const cleaned = stripComment(raw);
    if (!cleaned.trim() || /^\s*(?:---|\.\.\.)\s*$/.test(cleaned)) continue;
    const indent = cleaned.match(/^ */)[0].length;
    lines.push({ number: i + 1, indent, text: cleaned.slice(indent) });
  }
  return lines;
}

export function parseYaml(source) {
  const trimmed = String(source ?? '').trim();
  if (!trimmed) throw new Error('YAML input is empty');
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try { return JSON.parse(trimmed); } catch { /* continue as YAML */ }
  }
  const lines = preprocess(source);
  if (!lines.length) return null;

  function parseBlock(index, indent) {
    if (index >= lines.length) return { value: null, next: index };
    if (lines[index].indent < indent) return { value: null, next: index };
    if (lines[index].indent !== indent) throw new Error(`Line ${lines[index].number}: unexpected indentation`);
    const isArray = /^-(?:\s|$)/.test(lines[index].text);
    const value = isArray ? [] : {};

    while (index < lines.length) {
      const line = lines[index];
      if (line.indent < indent) break;
      if (line.indent > indent) throw new Error(`Line ${line.number}: unexpected indentation`);
      const lineIsArray = /^-(?:\s|$)/.test(line.text);
      if (lineIsArray !== isArray) throw new Error(`Line ${line.number}: cannot mix sequence items and mapping keys at the same indentation`);

      if (isArray) {
        const rest = line.text.replace(/^-(?:\s|$)/, '').trim();
        if (!rest) {
          index++;
          if (index < lines.length && lines[index].indent > indent) {
            const child = parseBlock(index, lines[index].indent); value.push(child.value); index = child.next;
          } else value.push(null);
          continue;
        }
        const colon = findColon(rest);
        if (colon >= 0) {
          const obj = {};
          const key = parseKey(rest.slice(0, colon));
          const rhs = rest.slice(colon + 1).trim();
          index++;
          if (rhs) obj[key] = parseScalar(rhs);
          else if (index < lines.length && lines[index].indent > indent) {
            const child = parseBlock(index, lines[index].indent); obj[key] = child.value; index = child.next;
          } else obj[key] = null;

          while (index < lines.length && lines[index].indent > indent) {
            const extraIndent = lines[index].indent;
            if (/^-(?:\s|$)/.test(lines[index].text)) break;
            const extra = parseBlock(index, extraIndent);
            if (!extra.value || Array.isArray(extra.value) || typeof extra.value !== 'object') throw new Error(`Line ${lines[index].number}: expected mapping fields`);
            Object.assign(obj, extra.value); index = extra.next;
          }
          value.push(obj);
          continue;
        }
        value.push(parseScalar(rest)); index++;
      } else {
        const colon = findColon(line.text);
        if (colon < 0) throw new Error(`Line ${line.number}: expected a mapping key followed by ':'`);
        const key = parseKey(line.text.slice(0, colon));
        if (Object.prototype.hasOwnProperty.call(value, key)) throw new Error(`Line ${line.number}: duplicate key '${key}'`);
        const rhs = line.text.slice(colon + 1).trim();
        index++;
        if (rhs === '|' || rhs === '>') {
          const folded = rhs === '>';
          const parts = [];
          let childIndent = null;
          while (index < lines.length && lines[index].indent > indent) {
            if (childIndent === null) childIndent = lines[index].indent;
            parts.push(' '.repeat(Math.max(0, lines[index].indent - childIndent)) + lines[index].text);
            index++;
          }
          value[key] = folded ? parts.join(' ').replace(/\s+/g, ' ').trim() + '\n' : parts.join('\n') + '\n';
        } else if (rhs) value[key] = parseScalar(rhs);
        else if (index < lines.length && lines[index].indent > indent) {
          const child = parseBlock(index, lines[index].indent); value[key] = child.value; index = child.next;
        } else value[key] = null;
      }
    }
    return { value, next: index };
  }

  const result = parseBlock(0, lines[0].indent);
  if (result.next !== lines.length) throw new Error(`Line ${lines[result.next].number}: could not parse YAML`);
  return result.value;
}

function needsQuotes(value) {
  return value === '' || /^[-?:,\[\]{}#&*!|>'"%@`]/.test(value) || /:\s|\s#/.test(value) || /^\s|\s$/.test(value) || /^(?:null|~|true|false)$/i.test(value) || /^[+-]?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(value);
}
function scalarToYaml(value) {
  if (value === null) return 'null';
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  if (typeof value !== 'string') return null;
  const text = value;
  if (text.includes('\n')) return null;
  return needsQuotes(text) ? JSON.stringify(text) : text;
}
function keyToYaml(key) { return needsQuotes(String(key)) ? JSON.stringify(String(key)) : String(key); }

export function stringifyYaml(value, indentSize = 2) {
  const step = Math.max(1, Math.min(8, Number(indentSize) || 2));
  const lines = [];
  function write(node, indent, prefix = '') {
    const pad = ' '.repeat(indent);
    const scalar = scalarToYaml(node);
    if (scalar !== null) { lines.push(`${pad}${prefix}${scalar}`); return; }
    if (typeof node === 'string') {
      lines.push(`${pad}${prefix}|`);
      for (const line of node.replace(/\n$/, '').split('\n')) lines.push(`${' '.repeat(indent + step)}${line}`);
      return;
    }
    if (Array.isArray(node)) {
      if (!node.length) { lines.push(`${pad}${prefix}[]`); return; }
      if (prefix) lines.push(`${pad}${prefix.trimEnd()}`);
      for (const item of node) {
        const itemScalar = scalarToYaml(item);
        if (itemScalar !== null) lines.push(`${pad}- ${itemScalar}`);
        else if (Array.isArray(item)) { lines.push(`${pad}-`); write(item, indent + step); }
        else if (item && typeof item === 'object') {
          const entries = Object.entries(item);
          if (!entries.length) lines.push(`${pad}- {}`);
          else {
            const [firstKey, firstVal] = entries[0];
            const firstScalar = scalarToYaml(firstVal);
            if (firstScalar !== null) lines.push(`${pad}- ${keyToYaml(firstKey)}: ${firstScalar}`);
            else { lines.push(`${pad}- ${keyToYaml(firstKey)}:`); write(firstVal, indent + step * 2); }
            for (const [key, val] of entries.slice(1)) writeMappingEntry(key, val, indent + step);
          }
        }
      }
      return;
    }
    if (node && typeof node === 'object') {
      if (prefix) lines.push(`${pad}${prefix.trimEnd()}`);
      const entries = Object.entries(node);
      if (!entries.length) { lines.push(`${pad}{}`); return; }
      for (const [key, val] of entries) writeMappingEntry(key, val, indent);
      return;
    }
    lines.push(`${pad}${prefix}${JSON.stringify(node)}`);
  }
  function writeMappingEntry(key, val, indent) {
    const pad = ' '.repeat(indent), scalar = scalarToYaml(val), safeKey = keyToYaml(key);
    if (scalar !== null) lines.push(`${pad}${safeKey}: ${scalar}`);
    else if (typeof val === 'string') {
      lines.push(`${pad}${safeKey}: |`);
      for (const line of val.replace(/\n$/, '').split('\n')) lines.push(`${' '.repeat(indent + step)}${line}`);
    } else if (Array.isArray(val) && !val.length) lines.push(`${pad}${safeKey}: []`);
    else if (val && typeof val === 'object' && !Array.isArray(val) && !Object.keys(val).length) lines.push(`${pad}${safeKey}: {}`);
    else { lines.push(`${pad}${safeKey}:`); write(val, indent + step); }
  }
  write(value, 0);
  return lines.join('\n') + '\n';
}
