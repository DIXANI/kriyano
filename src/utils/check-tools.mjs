export function citationSignals(text) {
 const matches=text.match(/\b(?:according to|published by|data from|study by|research by|report by|reported by|source\s*:|doi\s*:)|https?:\/\/(?:dx\.)?doi\.org\/\S+|\[\d{1,3}\]/gi)||[];
 return [...new Set(matches.map(value=>value.trim()))];
}
export function arithmeticChecks(text) {
 const findings=[];
 const pattern=/(?:^|[;:\n])\s*(-?\d+(?:\.\d+)?)\s*([+−\-×*÷/])\s*(-?\d+(?:\.\d+)?)\s*=\s*(-?\d+(?:\.\d+)?)(?=\s*(?:$|[;\n]|\.(?:\s|$)))/g;
 for(const match of text.matchAll(pattern)){
  const a=Number(match[1]),b=Number(match[3]),claimed=Number(match[4]);
  if(Math.max(Math.abs(a),Math.abs(b),Math.abs(claimed))>1e12)continue;
  const operation=match[2];const result=operation==='+'?a+b:['-','−'].includes(operation)?a-b:['*','×'].includes(operation)?a*b:b===0?NaN:a/b;
  if(!Number.isFinite(result)){findings.push(`${match[0].replace(/^[;:\s]+/, "")}: division by zero is undefined.`);continue;}
  // Allow rounding to the precision written in the claimed result.
  const decimals=(match[4].split('.')[1]||'').length;const tolerance=0.5*10**(-decimals)+1e-10;
  if(Math.abs(result-claimed)>tolerance)findings.push(`${match[0].replace(/^[;:\s]+/, "")}: calculated result is ${Number(result.toPrecision(12))}. Check the intended inputs and rounding.`);
 }
 // Only a single, explicitly labelled stock comparison; no unit conversion or inferred quantities.
 const system=[...text.matchAll(/\bsystem stock is (\d+(?:\.\d+)?) units\b/gi)];
 const physical=[...text.matchAll(/\bphysical stock is (\d+(?:\.\d+)?) units\b/gi)];
 const shortage=[...text.matchAll(/\b(?:the )?shortage is (\d+(?:\.\d+)?) units\b/gi)];
 if(system.length===1&&physical.length===1&&shortage.length===1){const s=Number(system[0][1]),p=Number(physical[0][1]),n=Number(shortage[0][1]);if(s>=p&&Math.max(s,p,n)<=1e12&&Math.abs(s-p-n)>1e-8)findings.push(`The stated quantities give ${s} − ${p} = ${Number((s-p).toPrecision(12))} units, not ${n}. Confirm both stock figures refer to the same item, unit and point in time.`);}
 return [...new Set(findings)].slice(0,10);
}
export function deduplicateFindings(items) {
 const normalize=value=>String(value).toLowerCase().replace(/^(?:this\s+(?:proves|shows|means)\s+(?:that\s+)?)/,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
 const seen=new Set();
 return items.filter(item=>{const key=`${item.type==='high_impact'?'high:':''}${normalize(item.text)}`;if(!key||seen.has(key))return false;seen.add(key);return true;}).filter((item,index,all)=>item.type!=='number'||!all.some((other,j)=>j!==index&&other.type!=='number'&&normalize(other.text).split(' ').includes(normalize(item.text))));
}
