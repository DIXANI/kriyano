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

/*
 * SEO/metadata and accessibility checks.
 *
 * These are additive to the structural checks above. Each rule is written to
 * match the confirmed shape of the production output so it does not raise
 * false positives for intentional exceptions:
 *  - Every page (including the noindex 404) ships an absolute https OG image.
 *  - The 404 page is the only noindex page and is excluded from the sitemap,
 *    so metadata is still required there.
 */
const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const metaContent = (html, attr, name) => {
  const match = html.match(new RegExp(`<meta ${attr}="${escapeRegExp(name)}" content="([^"]*)"`));
  return match ? match[1] : null;
};

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const ogImageUrl = metaContent(html, 'property', 'og:image');

  // 2. HTML lang attribute must be present and English.
  assert.match(html, /<html[^>]*\slang="en"/, `${file}: html lang="en"`);

  // 4. The skip-link target (#main-content) must resolve on every page.
  assert.match(html, /<a[^>]*href="#main-content"/, `${file}: skip link to #main-content`);
  assert.ok(html.includes('id="main-content"'), `${file}: skip link target id="main-content" exists`);

  // 3. og:image must be an absolute https URL.
  assert.ok(ogImageUrl !== null, `${file}: og:image present`);
  assert.match(ogImageUrl, /^https:\/\/[^\s"]+$/, `${file}: og:image is an absolute https URL`);

  // 5. Open Graph image metadata for reliable social previews.
  const ogImageType = metaContent(html, 'property', 'og:image:type');
  const ogImageWidth = metaContent(html, 'property', 'og:image:width');
  const ogImageHeight = metaContent(html, 'property', 'og:image:height');
  assert.match(ogImageType ?? '', /^image\/[a-z0-9.+-]+$/i, `${file}: og:image:type is a valid MIME type`);
  assert.match(ogImageWidth ?? '', /^\d+$/, `${file}: og:image:width is numeric`);
  assert.match(ogImageHeight ?? '', /^\d+$/, `${file}: og:image:height is numeric`);

  // 1. Every JSON-LD block must parse as JSON.
  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.ok(jsonLdBlocks.length > 0, `${file}: contains JSON-LD`);
  for (const [index, block] of jsonLdBlocks.entries()) {
    let parsed;
    try {
      parsed = JSON.parse(block[1].trim());
    } catch (error) {
      assert.fail(`${file}: JSON-LD block ${index + 1} is not valid JSON (${error.message})`);
    }
    assert.ok(parsed && typeof parsed === 'object', `${file}: JSON-LD block ${index + 1} is an object`);
  }
}

console.log(`Validated ${files.length} pages, ${links} internal asset/link references and the new sitemap entries.`);
console.log(`Validated ${files.length} pages for JSON-LD, html lang, absolute https og:image, skip-link target and Open Graph image metadata.`);
