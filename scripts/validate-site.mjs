import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
const root=resolve('dist');const files=[];
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=join(dir,entry.name);if(entry.isDirectory())await walk(path);else if(path.endsWith('.html'))files.push(path);}}
await walk(root);let links=0;const titles=new Set();
for(const file of files){const html=await readFile(file,'utf8');assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${file}: exactly one h1`);assert.equal((html.match(/<main(?:\s|>)/g)||[]).length,1,`${file}: exactly one main`);assert.match(html,/<meta name="description" content="[^"]+"/);assert.match(html,/<link rel="canonical" href="https:\/\/kriyano.com\//);const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert.ok(title&&!titles.has(title),`Unique title: ${title}`);titles.add(title);
 for(const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){const url=match[1];if(url.startsWith('//'))continue;const base=join(root,decodeURIComponent(url));const candidates=[base,join(base,'index.html')];let found=false;for(const candidate of candidates){try{if((await stat(candidate)).isFile())found=true;}catch{}}assert.ok(found,`Missing local target ${url} in ${file}`);links++;}}
const sitemap=await readFile(join(root,'sitemap-0.xml'),'utf8');for(const route of ['list-cleaner','uuid-generator','timestamp-converter','jwt-decoder','url-encoder','yaml-validator','json-yaml-converter','base64-encoder','cron-expression-generator','sql-formatter','xml-formatter','url-parser','query-string-parser','sha-256-generator','json-minifier','margin-calculator','quotation-builder'])assert.ok(sitemap.includes(`/tools/${route}`));
assert.ok(!(await readFile(join(root,'index.html'),'utf8')).includes('Coming soon'));

/*
 * Canonical host and scheme checks.
 *
 * Search Console reported impressions on http:// and http://www. variants of
 * the same URLs, so every sitemap location must use the single canonical
 * origin. This locks in the worker redirect and prevents a regression back to
 * mixed-protocol or www URLs.
 */
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  assert.match(
    match[1],
    /^https:\/\/kriyano\.com\//,
    `Sitemap location must use the canonical origin: ${match[1]}`
  );
}

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

/*
 * Consent and analytics gating checks.
 *
 * Strict prior-consent model: the Consent Mode defaults must be denied on every
 * page, and the Google tag itself must NOT be in the static HTML. The gtag.js
 * loader is injected at runtime only after a visitor accepts analytics, so its
 * absence here is the guarantee that no request reaches Google before consent.
 */
for (const file of files) {
  const html = await readFile(file, 'utf8');

  // Consent Mode v2 default block is present with denied storage.
  assert.match(html, /gtag\('consent',\s*'default'/, `${file}: Consent Mode default call present`);
  assert.match(html, /analytics_storage:\s*'denied'/, `${file}: analytics_storage denied by default`);
  assert.match(html, /ad_storage:\s*'denied'/, `${file}: ad_storage denied by default`);

  // The gtag.js library must not appear in the static HTML; it is injected after consent.
  assert.ok(
    !/<script[^>]+src="https:\/\/www\.googletagmanager\.com\/gtag\/js/.test(html),
    `${file}: gtag.js must not be loaded before consent`
  );

  // A persistent way to change the choice must exist on every page.
  assert.match(html, /data-consent-open/, `${file}: persistent cookie settings control present`);
}

console.log(`Validated ${files.length} pages for denied Consent Mode defaults, absent pre-consent gtag.js and a persistent cookie-settings control.`);

/*
 * Stylesheet selector resolution checks.
 *
 * The Prompt Builder shipped with every form control unstyled because its rules
 * were written as `.builder-hero input`, but the form had been moved into a
 * sibling `.builder-section`. Neither the unit tests nor the checks above caught
 * it: they assert that markup and CSS exist, never that a selector resolves.
 * The page rendered select options in the browser default white-on-white while
 * the whole suite stayed green.
 *
 * The rule below encodes that specific failure. For each class-prefixed
 * descendant selector that targets a form control, the class must actually
 * contain that control somewhere in the built HTML. Scope is deliberately
 * narrow so it stays high signal:
 *  - Only class prefixes combined with input/select/textarea/option.
 *  - Pseudo-classes and pseudo-elements are stripped, since :hover, :focus and
 *    ::placeholder are styling states rather than containment paths.
 *  - A selector passes if it matches on at least one page; wrappers such as
 *    .quote-item are scoped to a tool page and need not appear everywhere.
 *  - Rows rendered from a <template> are cloned into the DOM by script, so
 *    <template> content is parsed and searched alongside the live document.
 *    Without this, .quote-item input would false-positive even though the
 *    markup is present and the selector resolves once a row is added.
 */
const stylesheets = (await readdir(join(root, '_astro'))).filter(name => name.endsWith('.css'));
assert.ok(stylesheets.length > 0, 'dist/_astro contains built stylesheets');

const controlSelector = /\.([a-z][a-z0-9-]*)\s+(input|select|textarea|option)\b(?![\w-])/g;
const pairs = new Map();
for (const name of stylesheets) {
  const css = await readFile(join(root, '_astro', name), 'utf8');
  const stripped = css.replace(/::?[a-z-]+(\([^)]*\))?/g, '');
  for (const [, cls, control] of stripped.matchAll(controlSelector)) {
    if (!pairs.has(`${cls} ${control}`)) pairs.set(`${cls} ${control}`, { cls, control });
  }
}

let resolvedSelectors = 0;
for (const { cls, control } of pairs.values()) {
  let matched = false;
  for (const file of files) {
    const document = new JSDOM(await readFile(file, 'utf8')).window.document;
    // Template content is inert and reachable only via .content, not as a child.
    const scope = [document, ...[...document.querySelectorAll('template')].map(node => node.content)];
    if (scope.some(node => node.querySelector(`.${cls} ${control}`) !== null)) {
      matched = true;
      break;
    }
  }
  assert.ok(
    matched,
    `Stylesheet selector ".${cls} ${control}" matches no element in the built HTML; ` +
      `the class must contain that control, or the rules silently do nothing`
  );
  resolvedSelectors++;
}

console.log(
  `Validated ${resolvedSelectors} stylesheet class-prefixed form-control selectors resolve against the built HTML.`
);
