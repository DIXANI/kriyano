import test from 'node:test';
import assert from 'node:assert/strict';
import {cleanList,processLists} from '../src/utils/list-tools.mjs';
import {calculateMargin,calculateQuote} from '../src/utils/business-tools.mjs';
import {arithmeticChecks,citationSignals,deduplicateFindings} from '../src/utils/check-tools.mjs';

test('cleaning preserves codes, Unicode and internal spaces',()=>{
 assert.deepEqual(cleanList(' 00125\r\n00125\r\nAB  20\nසිංහල\n').values,['00125','AB  20','සිංහල']);
 assert.deepEqual(cleanList('Ab\nab',{caseSensitive:false}).values,['Ab']);
 assert.deepEqual(cleanList('A\n A ',{trim:false}).values,['A',' A ']);
 assert.deepEqual(cleanList('A\nA',{deduplicate:false}).values,['A','A']);
 assert.throws(()=>cleanList('a\tb'),/one column/);
 assert.throws(()=>cleanList('a'.repeat(500001)),/500,000/);
 assert.throws(()=>cleanList('a\n'.repeat(20001)),/20,000/);
});
test('set comparisons preserve first occurrence and treat case as requested',()=>{
 const a='001\n002\n001\nABC';const b='002\n003\nabc';
 assert.deepEqual(processLists(a,b,{mode:'only-a',caseSensitive:false}).values,['001']);
 assert.deepEqual(processLists(a,b,{mode:'only-b',caseSensitive:false}).values,['003']);
 assert.deepEqual(processLists(a,b,{mode:'common',caseSensitive:false}).values,['002','ABC']);
 assert.deepEqual(processLists(a,b,{mode:'combine',caseSensitive:false}).values,['001','002','ABC','003']);
 assert.deepEqual(processLists('',b,{mode:'only-b'}).values,['002','003','abc']);
 assert.equal(processLists(a,b,{mode:'combine'}).duplicates,1);
});
test('margin, markup, discount, zero revenue and below-cost sales',()=>{
 let r=calculateMargin({cost:'75',value:'25',discount:'10',mode:'margin'});
 assert.equal(r.price,100);assert.equal(r.discounted,90);assert.equal(r.profit,15);assert.ok(Math.abs(r.margin-16.6666666667)<1e-8);
 r=calculateMargin({cost:'75',value:'25',mode:'markup'});assert.equal(r.price,93.75);assert.equal(r.margin,20);
 r=calculateMargin({cost:'10',value:'30',mode:'margin'});assert.equal(r.price,14.29);assert.ok(r.margin>=30);
 r=calculateMargin({cost:'10',value:'5',mode:'price'});assert.equal(r.profit,-5);assert.equal(r.margin,-100);
 assert.equal(calculateMargin({cost:'10',value:'10',discount:'100',mode:'price'}).margin,null);
 assert.equal(calculateMargin({cost:'0',value:'10',mode:'price'}).markup,null);
 for(const input of [{cost:'1',value:'100'},{cost:'-1',value:'25'},{cost:'',value:'25'},{cost:'0',value:'25'},{cost:'1.005',value:'25'},{cost:'10',value:'25',discount:'101'}])assert.throws(()=>calculateMargin(input));
});
test('quotation uses decimal arithmetic, line rounding and tax after discount',()=>{
 assert.deepEqual(calculateQuote([{quantity:'10',rate:'25'},{quantity:'1',rate:'50'}],'5','10'),{lines:[25000,5000],subtotal:30000,discount:1500,tax:2850,total:31350});
 assert.equal(calculateQuote([{quantity:'0.5',rate:'0.01'}]).total,1);
 assert.equal(calculateQuote([{quantity:'3',rate:'0.10'}]).total,30);
 assert.equal(calculateQuote([{quantity:'1',rate:'10'}],'100','15').total,0);
 assert.throws(()=>calculateQuote([{quantity:'0',rate:'10'}]));
 assert.throws(()=>calculateQuote([{quantity:'1',rate:'1.005'}]));
 assert.throws(()=>calculateQuote([{quantity:'1',rate:'10'}],'101'));
 assert.throws(()=>calculateQuote([]));
});
test('local review avoids generic citation words and checks limited arithmetic',()=>{
 assert.deepEqual(citationSignals('Write an inventory report and research a product.'),[]);
 assert.equal(citationSignals('According to Smith [1], data from a report by Lee supports this.').length,4);
 assert.equal(arithmeticChecks('100 - 90 = 20').length,1);
 assert.equal(arithmeticChecks('10 / 3 = 3.33').length,0);
 assert.equal(arithmeticChecks('10 / 0 = 0').length,1);
 assert.equal(arithmeticChecks('1 + 2 + 3 = 10').length,0);
 assert.equal(arithmeticChecks('1,000 - 900 = 20').length,0);
 assert.equal(arithmeticChecks('System stock is 100 units and physical stock is 90 units. The shortage is 20 units.').length,1);
 assert.equal(arithmeticChecks('System stock is 100 units and physical stock is 90 units. The shortage is 10 units.').length,0);
 assert.equal(arithmeticChecks('System stock is 100 units. System stock is 90 units. Physical stock is 80 units. Shortage is 30 units.').length,0);
});
test('duplicate conclusions merge without dropping a high-impact classification',()=>{
 const findings=[{type:'factual_claim',text:'The supplier delivered fewer items.'},{type:'factual_claim',text:'This proves the supplier delivered fewer items.'},{type:'high_impact',text:'The supplier delivered fewer items.'}];
 assert.equal(deduplicateFindings(findings).length,2);
});
