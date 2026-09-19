# KRIYANO — practical tools for everyday work

An update of the supplied Astro project. Existing guide and prompt URLs are preserved.
Start with `QUICK_START.md` for Windows-friendly instructions.

## Included tools

- Spreadsheet List Cleaner: single-column cleanup, duplicate removal, case-sensitive matching, two-list comparisons, copy and text download.
- Margin & Markup Calculator: target margin, target markup or known selling price, discount impact, transparent formulas and rounding.
- Quotation Builder: up to 50 line items, decimal-safe totals, discount and tax, printable quotation. PDF export uses the browser's print dialog; no PDF service is required.
- KRIYANO CHECK: local-only by default, narrower citation signals, limited deterministic arithmetic checks, optional online AI review, timeout and graceful fallback.
- Existing AI Prompt Builder.

## Local commands

Use Node 22.12 or newer compatible with Astro (Node 24 LTS recommended).

```sh
npm ci
npm run validate
npm run preview
```

Open the URL printed by the preview command. For editing use `npm run dev`.
The repo's AGENTS.md specifies `astro dev --background` for agent-managed development.

`npm run validate` builds all pages, runs 14 tests, and checks the generated internal links, metadata, headings, landmarks and sitemap.
The test suite uses Node's experimental VM modules and type stripping; their experimental notices are expected.
The production app does not need jsdom or Node's experimental test flags in the browser.

## Existing hosting architecture

The supplied `wrangler.jsonc` uses Cloudflare Workers with static assets, plus a Workers AI binding named `AI`. This update preserves that architecture. No deployment was performed.

`npm run build` creates static pages under `dist`. It does not deploy the Worker or invoke the AI service.
`npm run preview` serves static pages; `/api/check` is not provided by Astro's static preview. Local checks work in preview, and an attempted online AI review falls back with a clear message. For full online review, use the existing Cloudflare Worker environment with its AI binding after staging/approval.

Do not deploy only `dist` to an unrelated static host and expect online AI review to work. Keep your existing Worker entrypoint, configuration and AI binding together. The updated Worker imports `src/utils/check-tools.mjs`, which must be included in the source deployment.

## Data handling

The three new tools and Prompt Builder operate in browser memory. They do not upload or automatically store their form contents. CHECK makes an API request only when the user enables online review. The application no longer logs review content or returns internal provider error details. Provider processing remains subject to Cloudflare's own policies and configuration.

There is no new analytics service, advertising code, tracking ID or fake consent banner. Add measurement and AdSense only with the correct account configuration and current disclosures. Do not put pasted lists, quotations, customer details or AI text into analytics events.

## Verification completed

- Production build: 130 pages.
- 14 passing tests: calculations, boundaries, production client bundle interactions in jsdom, Worker request validation and mocked AI response handling.
- 3,914 generated internal links and asset references checked.
- New tool routes included in sitemap; 404 excluded.
- Existing nested main landmarks corrected in the guide pages and 404 page.

Limitations: jsdom tests do not render pixels or verify real browser print pagination. The remote preview browser could not access this workspace's localhost. Visual desktop/mobile review, actual PDF pagination and the live Cloudflare AI integration still need a staging/local browser check. No Search Console, traffic analytics or AdSense account data was accessed.

## Before publishing

1. Preview desktop and mobile layouts and run each tool's example. Test a longer quotation through Print / Save as PDF.
2. Confirm the existing contact mailbox is monitored. Supply the real founder name/bio if you want personal authorship on About; no identity or credentials were invented.
3. Verify hosting/AI data practices against the updated privacy wording.
4. Verify `/api/check` in the existing Worker environment. Check request limits, AI usage budget and any Cloudflare rate limiting before promoting the tool broadly; no account-level limit was configured here.
5. Review changes in a branch and deploy through the existing workflow only when ready.
6. Submit/check the sitemap and URL indexing in Google Search Console. Measure starts, successful uses and return visits using your chosen analytics setup; those external accounts have not been configured.
7. Apply for AdSense once the live site, disclosures and account-specific requirements are ready. This release does not guarantee approval or search traffic.
