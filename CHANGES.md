# Changes in this update

## Visitor experience

- New task-focused homepage in KRIYANO's existing dark green/lime visual identity.
- Removed future-tool placeholders from the homepage.
- One shared catalogue drives homepage and tool directory, avoiding inconsistent availability counts.
- Searchable tool directory with category filters and a recoverable empty state.
- Shorter navigation; existing Work, Business and Creators pages remain accessible from the footer.
- Three new browser-only tools with examples, instructions, limitations and related links.
- High-contrast result panels, responsive grids, keyboard focus indicators, skip link and Escape-to-close mobile navigation.
- Shortened Prompt Builder hero so users reach the form sooner.

## CHECK

- Local checks by default, explicit opt-in to online AI review and inline data handling explanation.
- Example input, limited equation/stock arithmetic checks and fewer generic citation false positives.
- Conservative deduplication of repeated conclusions; high-impact classifications are retained.
- Request timeout, cleared stale results and disabled inputs while online review is in progress.
- Worker rejects invalid JSON and oversized input; generic provider failure responses; successful AI responses are not cached.
- No review-content console logging. No independent fact verification or universal arithmetic detection is claimed.

## Content and discoverability

- Updated About and Privacy pages using verifiable product behavior; no invented founder biography.
- Descriptive titles, tool metadata and WebApplication structured data.
- New tool routes in the generated sitemap; explicit 404 filtering.
- One main landmark per page, including legacy learning articles.
- Existing prompt and guide routes preserved.

## Checks

130 pages build successfully. 14 automated tests cover pure calculations, generated production JavaScript interactions in jsdom and Worker behavior with mocked AI. 3,914 internal links/asset references resolve in the build. Real rendered mobile/desktop appearance, print pagination and live AI response quality still require review in a browser/Cloudflare environment.

## 2026-09-25 — Technical pivot Phase 2

- Added YAML Validator.
- Added JSON ↔ YAML Converter.
- Added Base64 Encoder & Decoder with Base64URL support.
- Added Cron Expression Generator with 5-field validation and next-run preview.
- Expanded homepage from four to eight featured technical tools.
- Updated technical-tool directory, About content, footer links and sitemap validation.
- Added YAML parser/stringifier tests for common configuration structures.
