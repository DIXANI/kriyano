import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker.ts';
const request=(text,method='POST')=>new Request('https://kriyano.com/api/check',{method,...(method==='POST'?{body:text,headers:{'Content-Type':'application/json'}}:{})});
const env={AI:{run:async()=>({response:JSON.stringify({summary:'Sample review',priorities:[{type:'factual_claim',text:'The supplier delivered fewer items.',why:'Unproven',howToVerify:'Check records'},{type:'factual_claim',text:'This proves the supplier delivered fewer items.',why:'Unproven',howToVerify:'Check records'}]})})},ASSETS:{fetch:async()=>new Response('asset')}};
test('worker validates requests without invoking AI',async()=>{
 let calls=0;const noAI={...env,AI:{run:async()=>{calls++;throw new Error('Unexpected call');}}};
 for(const [req,status] of [[request('', 'GET'),405],[request('{'),400],[request('null'),400],[request('{}'),400],[request(JSON.stringify({text:' '})),400],[request(JSON.stringify({text:'x'.repeat(8001)})),400],[request('x'.repeat(65537)),413]])assert.equal((await worker.fetch(req,noAI)).status,status);
 assert.equal(calls,0);
});
test('worker deduplicates findings, prevents response caching, serves assets',async()=>{
 const response=await worker.fetch(request(JSON.stringify({text:'Sample'})),env);assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'no-store');const data=await response.json();assert.equal(data.analysis.priorities.length,1);assert.equal(data.analysis.reviewLevel,'review_advised');
 assert.equal(await (await worker.fetch(new Request('https://kriyano.com/'),env)).text(),'asset');
});
test('provider errors return a generic message without leaked details',async()=>{
 const response=await worker.fetch(request(JSON.stringify({text:'Sample'})),{...env,AI:{run:async()=>{throw new Error('sensitive internal failure');}}});assert.equal(response.status,503);assert.ok(!(await response.text()).includes('sensitive'));
});
