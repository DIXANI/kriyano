import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolve,dirname,extname} from 'node:path';
import {SourceTextModule} from 'node:vm';
import {JSDOM} from 'jsdom';

async function page(route,source){
 const html=await readFile(resolve('dist',route,'index.html'),'utf8');
 const dom=new JSDOM(html,{url:`https://kriyano.com/${route}/`,runScripts:'outside-only',pretendToBeVisual:true});
 const w=dom.window;w.HTMLElement.prototype.scrollIntoView=function(){};w.matchMedia=()=>({addEventListener(){}});
 w.AbortSignal=AbortSignal;let copied='',downloads=0,printed=0,requests=0;
 Object.defineProperty(w.navigator,'clipboard',{value:{writeText:async text=>{copied=text;}}});
 w.URL.createObjectURL=()=>{downloads++;return 'blob:test';};w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=function(){};
 w.print=()=>{printed++;};w.fetch=async()=>{requests++;throw new Error('Simulated service failure');};
 const context=dom.getInternalVMContext();const modules=new Map();
 async function load(code,id){const module=new SourceTextModule(code,{context,identifier:id});modules.set(id,module);await module.link(async(specifier,parent)=>{let path=resolve(dirname(parent.identifier),specifier);if(!extname(path))path+='.ts';return modules.get(path)||await load(await readFile(path,'utf8'),path);});return module;}
 // Run the actual production bundles, including shared navigation, in an isolated DOM.
 const scripts=[...w.document.querySelectorAll('script[type="module"]')];
 for(const [index,script] of scripts.entries()){const src=script.getAttribute('src');if(src)assert.ok(src.startsWith('/_astro/'));const path=src?resolve('dist',src.slice(1)):resolve('dist',route,`inline-${index}.js`);const code=src?await readFile(path,'utf8'):script.textContent;const module=modules.get(path)||await load(code,path);if(module.status==='linked')await module.evaluate();}
 const get=id=>w.document.getElementById(id);
 const input=(id,value)=>{get(id).value=value;get(id).dispatchEvent(new w.Event('input',{bubbles:true}));};
 const change=(id,value)=>{get(id).value=value;get(id).dispatchEvent(new w.Event('change',{bubbles:true}));};
 const submit=id=>get(id).dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
 return {w,dom,get,input,change,submit,state:()=>({copied,downloads,printed,requests})};
}
const settle=()=>new Promise(resolve=>setImmediate(resolve));

test('list UI: example, options, comparison, copy, download and stale result clearing',async()=>{
 const p=await page('tools/list-cleaner','src/pages/tools/list-cleaner/index.astro');
 p.get('list-example').click();p.submit('list-form');assert.equal(p.get('list-result').value,'00125\n00126\nAB-20\nab-20');assert.equal(p.get('list-duplicate-count').textContent,'1');
 p.get('list-copy').click();await settle();assert.equal(p.state().copied,p.get('list-result').value);
 p.get('list-download').click();assert.equal(p.state().downloads,1);
 p.change('list-mode','only-a');assert.equal(p.get('list-b-field').hidden,false);assert.equal(p.get('list-copy').disabled,true);p.submit('list-form');assert.equal(p.get('list-result').value,'00125\nab-20');
 p.input('list-a','a\tb');p.submit('list-form');assert.match(p.get('list-error').textContent,/one column/);assert.equal(p.get('list-copy').disabled,true);p.dom.window.close();
});
test('pricing UI: example, result, mode change, zero revenue and copying',async()=>{
 const p=await page('tools/margin-calculator','src/pages/tools/margin-calculator/index.astro');p.get('margin-example').click();assert.equal(p.get('margin-price').textContent,'USD 100.00');assert.equal(p.get('margin-profit').textContent,'USD 15.00');assert.equal(p.get('margin-percent').textContent,'16.67%');p.get('margin-copy').click();await settle();assert.match(p.state().copied,/Gross profit: USD 15.00/);
 p.change('margin-mode','price');assert.equal(p.get('margin-output').hidden,true);p.input('margin-value','0');p.submit('margin-form');assert.equal(p.get('margin-percent').textContent,'N/A');assert.match(p.get('margin-warning').textContent,/gross loss/);p.dom.window.close();
});
test('quotation UI: line totals, printing, invalid dates, literal HTML and clear',async()=>{
 const p=await page('tools/quotation-builder','src/pages/tools/quotation-builder/index.astro');p.get('quote-example').click();assert.equal(p.get('quote-preview-section').hidden,false);assert.match(p.get('quote-preview').textContent,/USD 285.00/);p.get('quote-print').click();assert.equal(p.state().printed,1);
 p.input('quote-client','<img src=x onerror=alert(1)>');assert.equal(p.get('quote-preview-section').hidden,true);p.submit('quote-form');assert.match(p.get('quote-preview').textContent,/<img src=x/);assert.equal(p.get('quote-preview').querySelectorAll('img').length,0);
 p.input('quote-valid','2000-01-01');p.submit('quote-form');assert.match(p.get('quote-error').textContent,/validity date/);assert.equal(p.get('quote-preview-section').hidden,true);
 p.get('quote-add').click();assert.equal(p.get('quote-items').children.length,3);p.get('quote-clear').click();assert.equal(p.get('quote-items').children.length,1);assert.equal(p.get('quote-business').value,'');p.dom.window.close();
});
test('CHECK UI: local result makes no request, online failure leaves local result', async () => {
  const p = await page('check', 'src/pages/check/index.astro');

  const waitForCompletion = async () => {
    const deadline = Date.now() + 2000;

    while (p.get('check-button').disabled) {
      if (Date.now() >= deadline) {
        assert.fail('CHECK did not finish within 2 seconds');
      }
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  };

  try {
    // Local checks must complete without sending any request.
    p.get('check-example').click();
    p.get('check-button').click();

    assert.equal(p.get('check-button').disabled, true);
    await waitForCompletion();

    assert.equal(p.state().requests, 0);
    assert.equal(p.get('check-results').hidden, false);
    assert.equal(p.get('arithmetic-results').hidden, false);
    assert.match(
      p.get('arithmetic-list').textContent,
      /10 units, not 20/
    );
    assert.equal(p.get('stat-citations').textContent, '0');
    assert.equal(p.get('semantic-results').hidden, true);

    // A simulated online failure must preserve local results.
    p.get('check-online').checked = true;
    p.get('check-online').dispatchEvent(new p.w.Event('change'));
    p.get('check-button').click();

    await waitForCompletion();

    assert.equal(p.state().requests, 1);
    assert.equal(p.get('semantic-results').hidden, false);
    assert.equal(p.get('semantic-error').hidden, false);
    assert.equal(p.get('review-badge').textContent, 'UNAVAILABLE');
    assert.equal(p.get('arithmetic-results').hidden, false);
    assert.equal(p.get('ai-output').disabled, false);
    assert.equal(p.get('check-online').disabled, false);
    assert.equal(p.get('check-example').disabled, false);

    // Editing the input must hide outdated results.
    p.input('ai-output', 'New text');
    assert.equal(p.get('check-results').hidden, true);
  } finally {
    p.dom.window.close();
  }
});
async()=>{
 const p=await page('check','src/pages/check/index.astro');p.get('check-example').click();p.get('check-button').click();await settle();assert.equal(p.state().requests,0);assert.equal(p.get('arithmetic-results').hidden,false);assert.match(p.get('arithmetic-list').textContent,/10 units, not 20/);assert.equal(p.get('stat-citations').textContent,'0');assert.equal(p.get('semantic-results').hidden,true);
 p.get('check-online').checked=true;p.get('check-online').dispatchEvent(new p.w.Event('change'));p.get('check-button').click();await settle();assert.equal(p.state().requests,1);assert.equal(p.get('semantic-error').hidden,false);assert.equal(p.get('arithmetic-results').hidden,false);assert.equal(p.get('ai-output').disabled,false);
 p.input('ai-output','New text');assert.equal(p.get('check-results').hidden,true);p.dom.window.close();
};
test('directory filters and navigation Escape state',async()=>{
 const p=await page('tools','src/pages/tools/index.astro');p.input('tool-search','Excel');assert.equal([...p.w.document.querySelectorAll('[data-tool-card]')].filter(e=>!e.hidden).length,1);p.input('tool-search','nothingmatches');assert.equal(p.get('tool-empty').hidden,false);p.get('reset-filters').click();assert.equal(p.get('tool-empty').hidden,true);
 const toggle=p.w.document.querySelector('.mobile-menu-toggle');assert.equal(p.get('mobile-menu').hidden,true);toggle.click();assert.equal(toggle.getAttribute('aria-expanded'),'true');p.w.document.dispatchEvent(new p.w.KeyboardEvent('keydown',{key:'Escape'}));assert.equal(p.get('mobile-menu').hidden,true);p.dom.window.close();
});
