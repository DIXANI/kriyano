export function cleanList(text, options = {}) {
 const { trim = true, caseSensitive = true, deduplicate = true, sort = false } = options;
 if (text.length > 500000) throw new Error('Please use up to 500,000 characters per list.');
 if (text.includes('\t')) throw new Error('Paste one column at a time. Multiple columns (tabs) were found.');
 const lines = text === '' ? [] : text.replace(/\r\n?/g, '\n').split('\n');
 if (lines.length > 20000) throw new Error('Please use up to 20,000 rows per list.');
 const values = lines.map(value => trim ? value.trim() : value).filter(value => value.trim() !== '');
 const seen = new Set(); const unique = [];
 for (const value of values) { const key = caseSensitive ? value : value.toLowerCase(); if (!seen.has(key)) { seen.add(key); unique.push(value); } }
 const result = deduplicate ? unique : values;
 if (sort) result.sort((a,b) => a.localeCompare(b, 'en', { sensitivity:caseSensitive?'variant':'base', numeric:false }));
 return { values:result, inputCount:values.length, duplicates:values.length-unique.length, blanks:lines.length-values.length };
}
export function processLists(a, b, options = {}) {
 const mode = options.mode || 'clean';
 if (!['clean','only-a','only-b','common','combine'].includes(mode)) throw new Error('Choose a valid list operation.');
 const opts = { ...options, deduplicate:mode==='clean' ? options.deduplicate !== false : true };
 const left=cleanList(a,opts); const right=mode==='clean'?null:cleanList(b,opts);
 const key = value => options.caseSensitive === false ? value.toLowerCase() : value;
 let values = left.values;
 if(right){ const aKeys=new Set(left.values.map(key)); const bKeys=new Set(right.values.map(key));
  if(mode==='only-a') values=left.values.filter(value=>!bKeys.has(key(value)));
  if(mode==='only-b') values=right.values.filter(value=>!aKeys.has(key(value)));
  if(mode==='common') values=left.values.filter(value=>bKeys.has(key(value)));
  if(mode==='combine') values=[...left.values,...right.values.filter(value=>!aKeys.has(key(value)))];
 }
 if(options.sort) values.sort((a,b)=>a.localeCompare(b,'en',{sensitivity:options.caseSensitive===false?'base':'variant',numeric:false}));
 return { values, inputCount:left.inputCount+(right?.inputCount||0), duplicates:left.duplicates+(right?.duplicates||0), blanks:left.blanks+(right?.blanks||0) };
}
