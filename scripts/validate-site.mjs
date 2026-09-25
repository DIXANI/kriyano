import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import assert from 'node:assert/strict';
const root=resolve('dist');const files=[];
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=join(dir,entry.name);if(entry.isDirectory())await walk(path);else if(path.endsWith('.html'))files.push(path);}}
await walk(root);let links=0;const titles=new Set();
for(const file of files){const html=await readFile(file,'utf8');assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${file}: exactly one h1`);assert.equal((html.match(/<main(?:\s|>)/g)||[]).length,1,`${file}: exactly one main`);assert.match(html,/<meta name="description" content="[^"]+"/);assert.match(html,/<link rel="canonical" href="https:\/\/kriyano.com\//);const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert.ok(title&&!titles.has(title),`Unique title: ${title}`);titles.add(title);
 for(const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){const url=match[1];if(url.startsWith('//'))continue;const base=join(root,decodeURIComponent(url));const candidates=[base,join(base,'index.html')];let found=false;for(const candidate of candidates){try{if((await stat(candidate)).isFile())found=true;}catch{}}assert.ok(found,`Missing local target ${url} in ${file}`);links++;}}
const sitemap=await readFile(join(root,'sitemap-0.xml'),'utf8');for(const route of ['list-cleaner','uuid-generator','timestamp-converter','jwt-decoder','url-encoder','yaml-validator','json-yaml-converter','base64-encoder','cron-expression-generator','sql-formatter','xml-formatter','url-parser','query-string-parser','sha-256-generator','json-minifier','margin-calculator','quotation-builder'])assert.ok(sitemap.includes(`/tools/${route}`));
assert.ok(!(await readFile(join(root,'index.html'),'utf8')).includes('Coming soon'));
console.log(`Validated ${files.length} pages, ${links} internal asset/link references and the new sitemap entries.`);
