import test from 'node:test';
import assert from 'node:assert/strict';
import {applyConsent, GA_MEASUREMENT_ID} from '../src/scripts/consent.ts';

const DISABLE_KEY = `ga-disable-${GA_MEASUREMENT_ID}`;

/**
 * A browser-accurate page mock.
 *
 * gtag.js really behaves like this: it reads window['ga-disable-<ID>'] and the
 * latest Consent Mode state every time it is asked to send a hit, and it replays
 * whatever is already queued in dataLayer when the library finishes loading.
 * Modelling both is what lets these tests catch the re-acceptance bug.
 */
function browser() {
  const store = new Map();
  const storage = {
    getItem: key => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: key => store.delete(key),
  };

  const appended = [];
  const removed = [];
  let injectedScripts = 0;
  let cookieValue = '';
  const currentScript = {src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`};
  currentScript.remove = () => { injectedScripts--; removed.push(currentScript); };

  const doc = {
    head: {appendChild: node => { appended.push(node); injectedScripts++; }},
    createElement: () => ({async: false, src: ''}),
    // Reflects the real DOM: the injected tag is found until withdrawal removes it.
    querySelector: () => (injectedScripts > 0 ? currentScript : null),
  };
  Object.defineProperty(doc, 'cookie', {
    get: () => cookieValue,
    set: v => { cookieValue = v; },
  });

  // Hits that would actually be transmitted to Google.
  const sent = [];
  // Every emitted event, regardless of whether it was collected.
  const hits = [];
  const win = {dataLayer: []};

  // The real gtag() shim: queues calls, and a "request builder" decides whether a
  // queued item results in a network hit given the current flag + consent state.
  const consentState = {analytics_storage: 'denied'};
  win.gtag = (...args) => {
    win.dataLayer.push(args);
    const [command, action, params] = args;
    if (command === 'consent' && action === 'update') {
      consentState.analytics_storage = params.analytics_storage;
      return;
    }
    if (command === 'config' || command === 'event') {
      const disabled = win[DISABLE_KEY] === true;
      const collected = !disabled && consentState.analytics_storage === 'granted';
      if (command === 'event') {
        hits.push(args);
        if (collected) sent.push(args);
      }
    }
  };

  const decide = decision =>
    applyConsent(decision, {storage, documentLike: doc, windowLike: win});

  return {storage, win, decide, sent, hits, appended, removed, injected: () => injectedScripts};
}

test('re-acceptance: Accept -> Reject -> Accept restores collection without a reload', () => {
  const page = browser();

  // --- Accept -------------------------------------------------------------
  assert.equal(page.decide('granted'), true);
  assert.equal(page.injected(), 1, 'one gtag.js loader after accepting');
  page.win.gtag('event', 'while_accepted');
  assert.equal(page.sent.length, 1, 'an accepted session sends hits');


test('re-acceptance: no duplicate gtag.js loader is added', () => {
  const page = browser();
  page.decide('granted');
  assert.equal(page.injected(), 1);

  page.decide('denied');
  page.decide('granted');
  assert.equal(page.injected(), 1, 'exactly one loader remains after re-accepting');

  // Repeated acceptance must stay idempotent too.
  page.decide('granted');
  page.decide('granted');
  assert.equal(page.injected(), 1, 'repeated accepts never add another loader');
});

test('re-acceptance: the GA property is configured only once, so page_view is not duplicated', () => {
  const page = browser();
  page.decide('granted');
  page.decide('denied');
  page.decide('granted');
  page.decide('granted');

  const configs = page.win.dataLayer.filter(call => call[0] === 'config');
  assert.equal(configs.length, 1, 'config is issued exactly once per page view');
  assert.equal(configs[0][1], GA_MEASUREMENT_ID);
  assert.equal(
    page.win.dataLayer.filter(call => call[0] === 'js').length,
    1,
    'js is issued exactly once per page view'
  );
});

test('re-acceptance: consent updates reflect the latest decision at every step', () => {
  const page = browser();
  page.decide('granted');
  page.decide('denied');
  page.decide('granted');

  const updates = page.win.dataLayer.filter(
    call => call[0] === 'consent' && call[1] === 'update'
  );
  assert.deepEqual(
    updates.map(call => call[2].analytics_storage),
    ['granted', 'denied', 'granted'],
    'each decision is reported to Consent Mode in order'
  );
  assert.ok(
    updates.every(call => call[2].ad_storage === 'denied'),
    'advertising stays denied throughout'
  );
  assert.equal(page.storage.getItem('kriyano-consent'), 'granted');
});

test('re-acceptance: rejection without earlier acceptance never loads Google Analytics', () => {
  const page = browser();
  assert.equal(page.decide('denied'), false);
  assert.equal(page.injected(), 0, 'no loader is created for a lone rejection');
  assert.equal(page.appended.length, 0, 'nothing is appended to the document');
  assert.equal(page.sent.length, 0, 'no hits are sent');
  assert.equal(page.win[DISABLE_KEY], true, 'the kill switch is set defensively');
  assert.ok(
    !page.win.dataLayer.some(call => call[0] === 'config'),
    'the property is never configured'
  );
});

test('re-acceptance: withdrawal still stops collection after a re-accept cycle', () => {
  const page = browser();
  page.decide('granted');
  page.decide('denied');
  page.decide('granted');
  page.win.gtag('event', 'still_collecting');
  assert.equal(page.sent.length, 1);

  // Withdraw again and confirm collection stops once more.
  assert.equal(page.decide('denied'), false);
  assert.equal(page.win[DISABLE_KEY], true);
  page.win.gtag('event', 'after_second_withdrawal');
  assert.equal(page.sent.length, 1, 'the second withdrawal also stops collection');

  // And a third acceptance must still recover.
  page.decide('granted');
  assert.equal(page.win[DISABLE_KEY], false);
  page.win.gtag('event', 'recovered_again');
  assert.equal(page.sent.length, 2, 'collection recovers on every subsequent accept');
  assert.equal(page.hits.length, 3, 'all three events were emitted, one of them dropped');
});

  // --- Reject -------------------------------------------------------------
  assert.equal(page.decide('denied'), false);
  assert.equal(page.win[DISABLE_KEY], true, 'withdrawal sets the kill switch');
  page.win.gtag('event', 'while_rejected');
  assert.equal(page.sent.length, 1, 'no hits are sent while rejected');

  // --- Accept again (same session, no reload) -----------------------------
  assert.equal(page.decide('granted'), true);
  assert.equal(page.win[DISABLE_KEY], false, 're-accepting clears the kill switch');
  page.win.gtag('event', 'after_reaccept');
  assert.equal(page.sent.length, 2, 'collection resumes after re-accepting');
  assert.equal(page.sent.at(-1)[1], 'after_reaccept');
});
