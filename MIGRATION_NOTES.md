# KRIYANO technical pivot — phase 1

## What changed
- Repositioned homepage from AI prompts to developer/web/data utilities.
- Rebuilt `/tools/` around Developer, Web, and Text & Data categories.
- Replaced primary navigation with technical-tool navigation.
- Kept the existing Prompt Library and Learn pages live as legacy resources.
- Kept all existing tool URLs live; business and AI utilities are shown only under a collapsed Legacy utilities section.
- Updated About, footer, site metadata and 404 messaging to match the new direction.

## New tools
- `/tools/uuid-generator/`
- `/tools/timestamp-converter/`
- `/tools/jwt-decoder/`
- `/tools/url-encoder/`

All four new tools are designed to run locally in the browser.

## Intentionally not removed
No legacy prompt, learn, creator, AI-for-work, AI-for-business, calculator or quotation URL was deleted in this phase. Redirect/removal decisions should wait for Search Console and backlink review.

## Local validation
Run:

```bash
npm install
npm run validate
```

The supplied project ZIP originally contained Windows `node_modules`; do not commit or reuse those dependencies on another operating system. Install dependencies fresh.

## Phase 2 — technical toolkit expansion

Added four browser-first technical utilities:

- `/tools/yaml-validator/` — validates common YAML structures and previews parsed JSON.
- `/tools/json-yaml-converter/` — two-way JSON/YAML conversion for common configuration data.
- `/tools/base64-encoder/` — UTF-8-safe Base64 and Base64URL encode/decode.
- `/tools/cron-expression-generator/` — builds standard 5-field cron expressions and previews upcoming runs.

The homepage, tool directory, About page, footer, metadata and sitemap validation were updated to surface the expanded technical toolkit. Legacy prompt and AI routes remain unchanged and available.

## Phase 3
Added six technical utilities without removing any legacy routes:
- SQL Formatter
- XML Formatter
- URL Parser
- Query String Parser
- SHA-256 Generator
- JSON Minifier

The homepage, tools directory, footer, About page and sitemap validation were updated to surface the expanded technical toolkit.
