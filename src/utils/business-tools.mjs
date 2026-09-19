function numeric(value, name, min, max) {
 if(String(value).trim()==='' || !/^\d+(?:\.\d+)?$/.test(String(value))) throw new Error(`Enter a valid ${name} using a dot for decimals.`);
 const number=Number(value); if(!Number.isFinite(number)||number<min||number>max) throw new Error(`${name} must be between ${min} and ${max}.`); return number;
}
export const roundMoney = value => Math.round((value + Number.EPSILON) * 100) / 100;
export function calculateMargin({cost, value, discount='0', mode='margin'}) {
 const c=numeric(cost,'unit cost',0,1000000000); const d=numeric(discount,'discount',0,100);
 if(!['margin','markup','price'].includes(mode)) throw new Error('Choose a valid calculation.');
 if(!/^\d+(?:\.\d{1,2})?$/.test(String(cost))) throw new Error('Use up to 2 decimal places for unit cost.');
 const v=numeric(value,mode==='price'?'selling price':mode,0,mode==='margin'?99.99:mode==='markup'?10000:1000000000);
 if(mode!=='price' && c===0) throw new Error('Enter a cost above zero to calculate a target price.');
 if(mode==='price' && !/^\d+(?:\.\d{1,2})?$/.test(String(value))) throw new Error('Use up to 2 decimal places for selling price.');
 const raw=mode==='margin'?c/(1-v/100):mode==='markup'?c*(1+v/100):v;
 // Round a target price upward so the chosen margin/markup is not undercut by cent rounding.
 const price=mode==='price'?raw:Math.ceil(raw*100-1e-7)/100;
 if(!Number.isFinite(price)||price>1000000000) throw new Error('The calculated price is too large. Use a lower cost or target.');
 const discounted=roundMoney(price*(1-d/100)); const profit=roundMoney(discounted-c);
 return {price, discounted, profit, margin:discounted===0?null:profit/discounted*100, markup:c===0?null:profit/c*100, cost:c, discount:d};
}
function decimalUnits(value, precision, name) {
 const text=String(value).trim(); const regex=new RegExp(`^\\d+(?:\\.\\d{1,${precision}})?$`);
 if(!regex.test(text)) throw new Error(`${name}: use a non-negative number with up to ${precision} decimal places.`);
 const [whole,fraction='']=text.split('.'); return BigInt(whole)*10n**BigInt(precision)+BigInt(fraction.padEnd(precision,'0'));
}
const divideRounded = (value, divisor) => (value + divisor/2n)/divisor;
export function calculateQuote(items, discount='0', tax='0') {
 if(!Array.isArray(items)||!items.length||items.length>50) throw new Error('Use between 1 and 50 line items.');
 const discountBP=decimalUnits(discount,2,'Discount'); const taxBP=decimalUnits(tax,2,'Tax');
 if(discountBP>10000n||taxBP>10000n) throw new Error('Discount and tax must be between 0 and 100%.');
 const lines=items.map((item,index)=>{
  const qty=decimalUnits(item.quantity,3,`Line ${index+1} quantity`); const rate=decimalUnits(item.rate,2,`Line ${index+1} unit price`);
  if(qty===0n||qty>1000000000n||rate>100000000000n) throw new Error(`Line ${index+1}: quantity must be above zero and at most 1,000,000; price at most 1,000,000,000.`);
  return divideRounded(qty*rate,1000n);
 });
 const subtotal=lines.reduce((a,b)=>a+b,0n); const discountCents=divideRounded(subtotal*discountBP,10000n); const net=subtotal-discountCents;
 const taxCents=divideRounded(net*taxBP,10000n); const total=net+taxCents;
 if(total>9000000000000n||subtotal>9000000000000n) throw new Error('Quotation total is too large.');
 return { lines:lines.map(Number), subtotal:Number(subtotal), discount:Number(discountCents), tax:Number(taxCents), total:Number(total) };
}
