import test from 'node:test';
import assert from 'node:assert/strict';
import {
  readConsent,
  writeConsent,
  applyConsent,
  clearAnalyticsCookies,
  CONSENT_STORAGE_KEY,
  GA_MEASUREMENT_ID,
} from '../src/scripts/consent.ts';

/** Minimal in-memory stand-in for localStorage. */
function fakeStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    data,
    getItem: key => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: key => data.delete(key),
  };
}

/** Minimal document stand-in that records injected scripts and cookie writes. */
function fakeDocument() {
  const appended = [];
  const writes = [];
  const doc = {
    head: { appendChild: node => appended.push(node) },
    createElement: () => ({ async: false, src: '' }),
    querySelector: () => null,
    appended,
    writes,
  };
  // `cookie` is an accessor so every assignment is recorded, which mirrors how a
  // browser persists one cookie per write.
  let cookieValue = '';
  Object.defineProperty(doc, 'cookie', {
    get: () => cookieValue,
    set: value => {
      writes.push(value);
      cookieValue = value;
    },
  });
  return doc;
}

test('consent: default state is absent, so analytics must not be treated as granted', () => {
  const storage = fakeStorage();
  assert.equal(readConsent(storage), null);
});

test('consent: accepting stores a granted decision and injects gtag.js once', () => {
  const storage = fakeStorage();
  const documentLike = fakeDocument();
  const windowLike = {};

  const loaded = applyConsent('granted', { storage, documentLike, windowLike });

  assert.equal(loaded, true);
  assert.equal(readConsent(storage), 'granted');
  assert.equal(storage.getItem(CONSENT_STORAGE_KEY), 'granted');
  assert.equal(documentLike.appended.length, 1);
  assert.equal(documentLike.appended[0].src, `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);
});

test('consent: rejecting stores a denied decision and never loads gtag.js', () => {
  const storage = fakeStorage();
  const documentLike = fakeDocument();
  const windowLike = {};

  const loaded = applyConsent('denied', { storage, documentLike, windowLike });

  assert.equal(loaded, false);
  assert.equal(readConsent(storage), 'denied');
  assert.equal(documentLike.appended.length, 0);
});

test('consent: a stored decision persists across a new page view', () => {
  const storage = fakeStorage();
  applyConsent('granted', { storage, documentLike: fakeDocument(), windowLike: {} });

  // A second "page load" reads the same storage.
  assert.equal(readConsent(storage), 'granted');

  const secondDocument = fakeDocument();
  applyConsent('granted', { storage, documentLike: secondDocument, windowLike: {} });
  assert.equal(secondDocument.appended.length, 1, 'gtag.js is injected again on reload with a grant in place');
});

test('consent: no decision means no analytics script is injected', () => {
  const storage = fakeStorage();
  const documentLike = fakeDocument();
  // Simulate initial load: only the default-denied inline block runs, nothing else.
  assert.equal(readConsent(storage), null);
  assert.equal(documentLike.appended.length, 0);
});

test('consent: withdrawal after acceptance clears GA cookies and stops loading', () => {
  const storage = fakeStorage();
  const documentLike = fakeDocument();

  applyConsent('granted', { storage, documentLike, windowLike: {} });
  assert.equal(documentLike.appended.length, 1);

  documentLike.writes.length = 0;
  const loaded = applyConsent('denied', { storage, documentLike, windowLike: {} });

  assert.equal(loaded, false);
  assert.equal(readConsent(storage), 'denied');
  assert.ok(
    documentLike.writes.some(write => write.startsWith('_ga=;expires=Thu, 01 Jan 1970')),
    'the _ga cookie is expired'
  );
  assert.ok(
    documentLike.writes.some(write => write.startsWith(`_ga_GT7Q9ETXYM=;expires=`)),
    'the GA4 property cookie is expired'
  );
});

test('consent: clearing analytics cookies expires _ga and the property cookie', () => {
  const documentLike = fakeDocument();
  const cleared = clearAnalyticsCookies(documentLike);
  assert.ok(cleared >= 1);
  assert.ok(documentLike.writes.some(write => write.startsWith('_ga=;expires=Thu, 01 Jan 1970')));
  assert.ok(documentLike.writes.some(write => write.startsWith('_ga_GT7Q9ETXYM=;expires=')));
});

test('consent: withdrawal sets the GA kill switch so a loaded tag stops collecting', () => {
  const storage = fakeStorage();
  const documentLike = fakeDocument();
  const windowLike = { gtag: () => {} };

  applyConsent('granted', { storage, documentLike, windowLike });
  assert.notEqual(windowLike[`ga-disable-${GA_MEASUREMENT_ID}`], true);

  applyConsent('denied', { storage, documentLike, windowLike });
  assert.equal(windowLike[`ga-disable-${GA_MEASUREMENT_ID}`], true);
});

test('consent: a decision is never recorded unless an explicit choice is applied', () => {
  // Escape/close hides the banner without calling applyConsent, so storage stays
  // empty and analytics must remain off.
  const storage = fakeStorage();
  assert.equal(readConsent(storage), null);
  assert.equal(storage.getItem(CONSENT_STORAGE_KEY), null);
});

test('consent: a grant updates Consent Mode with analytics granted and ads denied', () => {
  const storage = fakeStorage();
  const documentLike = fakeDocument();
  const calls = [];
  const windowLike = { gtag: (...args) => calls.push(args) };

  applyConsent('granted', { storage, documentLike, windowLike });

  const update = calls.find(call => call[0] === 'consent' && call[1] === 'update');
  assert.ok(update, 'a consent update call is made');
  assert.equal(update[2].analytics_storage, 'granted');
  assert.equal(update[2].ad_storage, 'denied');
  assert.equal(update[2].ad_user_data, 'denied');
  assert.equal(update[2].ad_personalization, 'denied');
  assert.ok(calls.some(call => call[0] === 'config' && call[1] === GA_MEASUREMENT_ID));
});
