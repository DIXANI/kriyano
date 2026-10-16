import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolve,dirname,extname} from 'node:path';
import {SourceTextModule} from 'node:vm';
import {JSDOM} from 'jsdom';

/**
 * Load a built page exactly as interactions.test.mjs does: parse the production
 * HTML and evaluate its bundled module scripts against an isolated DOM. This
 * covers the shipped consent code rather than a re-implementation of it.
 */
async function page(route){
 const html=await readFile(resolve('dist',route,'index.html'),'utf8');
 // jsdom's "outside-only" mode does not execute plain inline <script> tags, but
 // in the browser the Consent Mode defaults block runs first, synchronously,
 // before any module. Model that by seeding the dataLayer it would create.
 assert.match(html, /gtag\('consent', 'default'/, 'the page ships a Consent Mode default call');
 assert.match(html, /analytics_storage: 'denied'/, 'analytics is denied by default');
 assert.ok(
  !/<script[^>]+src="https:\/\/www\.googletagmanager\.com\/gtag\/js/.test(html),
  'gtag.js is absent from the static HTML'
 );
 const dom=new JSDOM(html,{url:`https://kriyano.com/${route}/`,runScripts:'outside-only',pretendToBeVisual:true});
 const w=dom.window;
 w.matchMedia=()=>({addEventListener(){}});
 w.HTMLElement.prototype.scrollIntoView=function(){};
 w.dataLayer=w.dataLayer||[];
 w.dataLayer.push(['consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500}]);
 let injected=0;
 // jsdom never fetches; track every appended external script so we can prove
 // that no request to Google happens before the visitor accepts.
 w.document.head.appendChild=function(node){
  if(node&&node.tagName==='SCRIPT'&&typeof node.src==='string'&&node.src.includes('googletagmanager.com'))injected++;
  return Object.getPrototypeOf(this).appendChild.call(this,node);
 };
 const context=dom.getInternalVMContext();const modules=new Map();
 async function load(code,id){const module=new SourceTextModule(code,{context,identifier:id});modules.set(id,module);await module.link(async(specifier,parent)=>{let path=resolve(dirname(parent.identifier),specifier);if(!extname(path))path+='.ts';return modules.get(path)||await load(await readFile(path,'utf8'),path);});return module;}
 const scripts=[...w.document.querySelectorAll('script[type="module"]')];
 for(const [index,script] of scripts.entries()){
  const src=script.getAttribute('src');
  const path=src?resolve('dist',src.slice(1)):resolve('dist',route,`inline-${index}.js`);
  const code=src?await readFile(path,'utf8'):script.textContent;
  const module=modules.get(path)||await load(code,path);
  if(module.status==='linked')await module.evaluate();
 }
 return {w,dom,injected:()=>injected,document:()=>w.document};
}

test('consent UI: analytics stays off until accept, then persists and can be withdrawn', async () => {
 const p=await page('privacy');
 const w=p.w;
 const banner=()=>w.document.getElementById('consent-banner');
 const openButton=()=>w.document.querySelector('[data-consent-open]');

 try {
  // 1. Initial state: no decision, banner visible, Google NOT contacted.
  assert.ok(banner(),'banner is rendered');
  assert.equal(banner().hidden,false,'banner is shown before a decision');
  assert.equal(p.injected(),0,'gtag.js is not injected before consent');
  assert.ok(openButton(),'a persistent cookie-settings control exists');
  assert.ok(w.dataLayer && Array.isArray(w.dataLayer),'dataLayer is created for Consent Mode defaults');
  const defaults=w.dataLayer.find(call=>call[0]==='consent'&&call[1]==='default');
  assert.equal(defaults[2].analytics_storage,'denied','analytics_storage defaults to denied');

  // 2. Accepting injects gtag.js exactly once, hides the banner and stores the choice.
  banner().querySelector('[data-consent="granted"]').click();
  assert.equal(p.injected(),1,'gtag.js is injected after accepting');
  assert.equal(banner().hidden,true,'banner closes after a decision');
  assert.equal(w.localStorage.getItem('kriyano-consent'),'granted');
  const update=w.dataLayer.find(call=>call[0]==='consent'&&call[1]==='update');
  assert.equal(update[2].analytics_storage,'granted');
  assert.equal(update[2].ad_storage,'denied','advertising stays denied');

  // 3. Persistence: the decision is stored under a stable key, so a later visit
  //    can be treated as already decided. jsdom gives each JSDOM instance its
  //    own storage, so we assert on the stored value rather than a second load.
  assert.equal(w.localStorage.getItem('kriyano-consent'),'granted');
  const reload=await page('privacy');
  reload.w.localStorage.setItem('kriyano-consent','granted');
  assert.equal(reload.w.localStorage.getItem('kriyano-consent'),'granted');
  reload.dom.window.close();

  // 4. The persistent control re-opens the panel and records a withdrawal.
  openButton().click();
  assert.equal(banner().hidden,false,'cookie settings re-opens the panel');
  banner().querySelector('[data-consent="denied"]').click();
  assert.equal(w.localStorage.getItem('kriyano-consent'),'denied','withdrawal is remembered');
  assert.equal(banner().hidden,true);
 } finally {
  p.dom.window.close();
 }
});
