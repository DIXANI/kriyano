import test from 'node:test';
import assert from 'node:assert/strict';
import {applyConsent} from '../src/scripts/consent.ts';

// Models a browser page where gtag.js has already been fetched and is executing:
// the real gtag() pushes to dataLayer and would send beacons for hits.
function loadedPage() {
  const data = new Map();
  const storage = {
    getItem: key => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: key => data.delete(key),
  };
  const writes = [];
  const doc = {
    head: { appendChild() {} },
    createElement: () => ({ async: false, src: '' }),
    querySelector: sel => (sel.includes('gtag/js') ? loadedScript : null),
  };
  let cookieValue = '';
  Object.defineProperty(doc, 'cookie', {
    get: () => cookieValue,
    set: v => { writes.push(v); cookieValue = v; },
  });
  const loadedScript = { src: 'https://www.googletagmanager.com/gtag/js?id=G-GT7Q9ETXYM' };
  const beacons = [];
  const calls = [];
  const win = {
    dataLayer: [],
    // Models real gtag.js: it honours window['ga-disable-<ID>'] and the most
    // recent analytics_storage state, so hits are only transmitted while both
    // consent is granted and the tag is not disabled.
    gtag: (...args) => {
      calls.push(args);
      if (args[0] === 'consent' && args[1] === 'update') {
        win.__analyticsStorage = args[2]?.analytics_storage;
        return;
      }
      if (args[0] === 'event') {
        const disabled = win[`ga-disable-${'G-GT7Q9ETXYM'}`] === true;
        if (!disabled && win.__analyticsStorage === 'granted') beacons.push(args);
      }
    },
  };
  return {storage, doc, win, writes, beacons, calls};
}

test('withdrawal after acceptance stops an ALREADY-LOADED gtag from sending hits', () => {
  const page = loadedPage();

  // Accept: analytics granted and the tag is live.
  applyConsent('granted', { storage: page.storage, documentLike: page.doc, windowLike: page.win });

  // A pre-withdrawal event is legitimately sent.
  page.win.gtag('event', 'pre_withdrawal');
  assert.equal(page.beacons.length, 1);

  // Withdraw on the same page view.
  applyConsent('denied', { storage: page.storage, documentLike: page.doc, windowLike: page.win });

  // A post-withdrawal event must NOT be transmitted.
  page.win.gtag('event', 'post_withdrawal');

  const denialCall = page.calls.find(
    call => call[0] === 'consent' && call[1] === 'update' && call[2]?.analytics_storage === 'denied'
  );
  assert.ok(denialCall, 'a consent update with analytics_storage denied must be issued on withdrawal');
  assert.equal(page.win['ga-disable-G-GT7Q9ETXYM'], true, 'the GA kill switch must be set so gtag stops collecting');
  assert.ok(!page.beacons.some(b => b[1] === 'post_withdrawal'), 'no hit is sent after withdrawal');
});

test('withdrawal revokes every Consent Mode signal and removes the loaded script tag', () => {
  const page = loadedPage();
  applyConsent('granted', { storage: page.storage, documentLike: page.doc, windowLike: page.win });

  let removed = false;
  page.doc.querySelector = () => ({ remove: () => { removed = true; } });

  applyConsent('denied', { storage: page.storage, documentLike: page.doc, windowLike: page.win });

  const lastUpdate = [...page.calls].reverse().find(call => call[0] === 'consent' && call[1] === 'update');
  assert.deepEqual(lastUpdate[2], {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
  assert.equal(removed, true, 'the injected gtag.js script tag is removed from the DOM');
});
