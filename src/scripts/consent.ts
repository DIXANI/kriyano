/*
 * KRIYANO consent manager.
 *
 * Strict prior-consent model:
 *  - Google Analytics 4 (G-GT7Q9ETXYM) is NOT loaded, and no request is sent to
 *    Google, until the visitor actively accepts analytics.
 *  - Google Consent Mode v2 defaults are emitted inline in BaseLayout before any
 *    Google code runs, with analytics_storage/ad_storage denied.
 *  - The gtag.js library is only injected after an explicit "Accept" decision.
 *  - Rejecting, or having made no choice, keeps analytics disabled.
 *
 * The pure helpers below are exported so the behaviour can be tested without a
 * browser (see tests/consent.test.mjs).
 */

export const CONSENT_STORAGE_KEY = "kriyano-consent";
export const GA_MEASUREMENT_ID = "G-GT7Q9ETXYM";
export const GTAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

/** Selector used to find an already-injected gtag.js loader. */
const GTAG_SCRIPT_SELECTOR = `script[src^="https://www.googletagmanager.com/gtag/js"]`;

/**
 * Flag recorded on the window once gtag has been initialised (js + config) for
 * this page view. Re-accepting must not repeat those calls, because the dataLayer
 * is replayed by the library and would emit a second page_view.
 */
const GA_INITIALISED_FLAG = `__kriyanoGaInitialised_${GA_MEASUREMENT_ID}`;

export type ConsentDecision = "granted" | "denied";

export interface ConsentStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/** Read the stored decision, returning null when absent or unrecognised. */
export function readConsent(storage: ConsentStorageLike): ConsentDecision | null {
  try {
    const value = storage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

/** Persist a decision. Storage failures (private mode, disabled) are non-fatal. */
export function writeConsent(storage: ConsentStorageLike, decision: ConsentDecision): void {
  try {
    storage.setItem(CONSENT_STORAGE_KEY, decision);
  } catch {
    /* Storage unavailable — the choice still applies to this page view. */
  }
}

const GA_COOKIE_NAMES = ["_ga", `_ga_${GA_MEASUREMENT_ID.replace(/^G-/, "")}`, "_gid", "_gat"];

/**
 * Expire Google Analytics cookies so a withdrawal stops being linked to the
 * visitor's previous identifier. Best-effort: cookie access can throw.
 */
export function clearAnalyticsCookies(documentLike: { cookie: string }): number {
  let cleared = 0;
  const host = typeof location !== "undefined" ? location.hostname : "";
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const name of GA_COOKIE_NAMES) {
    for (const domain of domains) {
      const existing = documentLike.cookie;
      const scope = domain ? `;domain=${domain}` : "";
      documentLike.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${scope}`;
      if (documentLike.cookie !== existing) cleared++;
    }
  }
  return cleared;
}

export interface ApplyConsentOptions {
  storage: ConsentStorageLike;
  documentLike: { cookie: string; createElement(tag: string): HTMLScriptElement; head: { appendChild(node: unknown): void } };
  windowLike: { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; [key: string]: unknown };
}

/**
 * Apply a decision to the page.
 *
 * On "granted": clear the GA kill switch, update Consent Mode with
 * analytics_storage granted, inject gtag.js if it is not already present and
 * initialise the GA4 property exactly once per page view. Ad-related signals
 * remain denied because no advertising is implemented. Re-accepting after a
 * withdrawal therefore re-enables collection without duplicating the loader or
 * emitting a second page_view.
 * On "denied": set the GA kill switch, revoke analytics consent on any already
 * loaded tag, clear GA cookies and remove any previously loaded gtag script.
 * Returns true when the Google script is (or becomes) loaded.
 */
export function applyConsent(decision: ConsentDecision, options: ApplyConsentOptions): boolean {
  const { storage, documentLike, windowLike } = options;
  writeConsent(storage, decision);

  windowLike.dataLayer = (windowLike.dataLayer as unknown[]) || [];
  const gtag =
    typeof windowLike.gtag === "function"
      ? (windowLike.gtag as (...args: unknown[]) => void)
      : function gtagProxy(...args: unknown[]) {
          (windowLike.dataLayer as unknown[]).push(args);
        };
  windowLike.gtag = gtag;

  if (decision === "denied") {
    // Stopping an already-loaded gtag.js is not the same as never loading it.
    // Once the library has executed it keeps its own internal state, so three
    // separate actions are required to actually stop collection:
    (windowLike as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
    gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    clearAnalyticsCookies(documentLike);
    const loadedScript = (
      documentLike as unknown as { querySelector?: (s: string) => unknown }
    ).querySelector?.(GTAG_SCRIPT_SELECTOR) as
      | { remove?: () => void }
      | null
      | undefined;
    loadedScript?.remove?.();
    return false;
  }

  // Re-accepting after a withdrawal must undo the kill switch, otherwise the
  // library (and any re-fetched copy) keeps refusing to collect even though
  // Consent Mode has been updated back to granted.
  (windowLike as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

  gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });

  const alreadyLoaded = documentLike
    ? (documentLike as unknown as { querySelector?: (s: string) => unknown }).querySelector?.(
        GTAG_SCRIPT_SELECTOR
      )
    : null;
  if (!alreadyLoaded) {
    const script = documentLike.createElement("script");
    script.async = true;
    script.src = GTAG_SRC;
    documentLike.head.appendChild(script);
  }

  // Initialise the property only once per page view. A withdrawal removes the
  // script tag but leaves the dataLayer queue intact, so repeating js/config on a
  // later acceptance would be replayed by the library as a duplicate page_view.
  const settings = windowLike as Record<string, unknown>;
  if (!settings[GA_INITIALISED_FLAG]) {
    settings[GA_INITIALISED_FLAG] = true;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
  }
  return true;
}
