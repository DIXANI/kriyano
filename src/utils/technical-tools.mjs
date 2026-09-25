const SQL_NEWLINE_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET',
  'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'LEFT JOIN', 'RIGHT JOIN',
  'INNER JOIN', 'FULL JOIN', 'JOIN', 'UNION ALL', 'UNION'
];

export function formatSql(source, indentSize = 2) {
  if (typeof source !== 'string' || !source.trim()) throw new Error('SQL input is empty.');
  const indent = ' '.repeat(Math.max(1, Math.min(8, Number(indentSize) || 2)));
  let sql = source.trim().replace(/\s+/g, ' ');
  for (const keyword of SQL_NEWLINE_KEYWORDS) {
    const escaped = keyword.replace(/ /g, '\\s+');
    sql = sql.replace(new RegExp(`\\s+(${escaped})\\s+`, 'gi'), `\n$1 `);
  }
  sql = sql
    .replace(/\s*,\s*/g, ',\n' + indent)
    .replace(/\s*(=|<>|!=|<=|>=|<|>)\s*/g, ' $1 ')
    .replace(/\s+;/g, ';')
    .replace(/\n{2,}/g, '\n')
    .trim();
  return sql.split('\n').map((line, index) => {
    if (index === 0) return line.trim();
    const trimmed = line.trim();
    if (/^(AND|OR)\b/i.test(trimmed)) return indent + trimmed;
    return trimmed;
  }).join('\n');
}

export function minifyJson(source) {
  if (typeof source !== 'string' || !source.trim()) throw new Error('JSON input is empty.');
  return JSON.stringify(JSON.parse(source));
}

export function parseUrlValue(source, base = 'https://example.com') {
  if (typeof source !== 'string' || !source.trim()) throw new Error('URL input is empty.');
  const value = source.trim();
  let url;
  try {
    url = new URL(value);
  } catch {
    try { url = new URL(value, base); } catch { throw new Error('Enter a valid URL.'); }
  }
  return {
    href: url.href,
    protocol: url.protocol,
    username: url.username,
    password: url.password,
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
    origin: url.origin,
  };
}

export function parseQueryString(source) {
  if (typeof source !== 'string') throw new TypeError('Query string must be text.');
  let value = source.trim();
  if (!value) return [];
  if (value.includes('://')) {
    try { value = new URL(value).search; } catch { throw new Error('Enter a valid URL or query string.'); }
  }
  value = value.replace(/^\?/, '');
  const params = new URLSearchParams(value);
  return [...params.entries()].map(([key, val]) => ({ key, value: val }));
}
