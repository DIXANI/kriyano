# Kriyano URL Inventory & Disposition (GSC window: last ~3 months)

Source: `kriyano.com-Performance-on-Search-2026-10-25.zip` (`Pages.csv`) joined against every
`src/pages/**/index.astro` route. Impressions and clicks are summed per path across the
`http://`, `http://www.` and `https://` variants that GSC reports separately; `Pos` is the
mean position across those rows and is a triage guide rather than a weighted average.

## Totals

- **Pages in inventory:** 143
- **IMPROVE**: 12 pages
- **CONNECT**: 7 pages
- **KEEP**: 16 pages
- **LEAVE**: 108 pages

## Decision key

- **IMPROVE** — ranking for a real query but earning no clicks: rewrite the title and meta description, sharpen on-page intent.
- **CONNECT** — keep the page and add internal links that route its equity toward tool pages.
- **KEEP** — healthy or neutral: leave as-is and monitor.
- **LEAVE** — keep live and indexable, but stop spending time here.

## Disposition table

| Path | Action | Impr | Clicks | Pos | File | Rationale |
| --- | --- | ---: | ---: | ---: | --- | --- |
| `/tools/base64-encoder/` | IMPROVE | 61 | 0 | 53.9 | `src/pages/tools/base64-encoder/index.astro` | Tool ranking for real queries with zero clicks - fix title/meta and on-page intent. |
| `/tools/cron-expression-generator/` | IMPROVE | 44 | 0 | 41.3 | `src/pages/tools/cron-expression-generator/index.astro` | Tool ranking for real queries with zero clicks - fix title/meta and on-page intent. |
| `/creators/` | IMPROVE | 34 | 0 | 4.4 | `src/pages/creators/index.astro` | Hub page at mean position 4.4 with zero clicks - title/meta CTR fix. |
| `/tools/` | IMPROVE | 30 | 0 | 6.4 | `src/pages/tools/index.astro` | Tool ranking for real queries with zero clicks - fix title/meta and on-page intent. |
| `/tools/margin-calculator/` | IMPROVE | 24 | 0 | 53.7 | `src/pages/tools/margin-calculator/index.astro` | Tool ranking for real queries with zero clicks - fix title/meta and on-page intent. |
| `/tools/prompt-builder/` | IMPROVE | 24 | 0 | 79.1 | `src/pages/tools/prompt-builder/index.astro` | Tool ranking for real queries with zero clicks - fix title/meta and on-page intent. |
| `/ai-for-work/` | IMPROVE | 23 | 0 | 9.0 | `src/pages/ai-for-work/index.astro` | Hub page at mean position 9.0 with zero clicks - title/meta CTR fix. |
| `/tools/sha-256-generator/` | IMPROVE | 18 | 0 | 48.0 | `src/pages/tools/sha-256-generator/index.astro` | Tool ranking for real queries with zero clicks - fix title/meta and on-page intent. |
| `/about/` | IMPROVE | 17 | 0 | 6.5 | `src/pages/about/index.astro` | Hub page at mean position 6.5 with zero clicks - title/meta CTR fix. |
| `/check/` | IMPROVE | 17 | 0 | 6.9 | `src/pages/check/index.astro` | Tool ranking for real queries with zero clicks - fix title/meta and on-page intent. |
| `/tools/list-cleaner/` | IMPROVE | 11 | 0 | 9.1 | `src/pages/tools/list-cleaner/index.astro` | Tool ranking for real queries with zero clicks - fix title/meta and on-page intent. |
| `/tools/xml-formatter/` | IMPROVE | 10 | 0 | 60.5 | `src/pages/tools/xml-formatter/index.astro` | Tool ranking for real queries with zero clicks - fix title/meta and on-page intent. |
| `/prompts/operations-logistics/` | CONNECT ✅ | 49 | 0 | 59.4 | `src/pages/prompts/operations-logistics/index.astro` | Legacy prompt with demand - supporting-tools block now links List Cleaner, Margin Calculator and CHECK. |
| `/learn/accuracy-and-research/why-ai-can-produce-wrong-answers/` | CONNECT ✅ | 20 | 1 | 16.6 | `src/pages/learn/accuracy-and-research/why-ai-can-produce-wrong-answers/index.astro` | Learn page with demand - tool-callout retargeted from Prompt Builder to CHECK. |
| `/prompts/` | CONNECT ✅ | 18 | 0 | 11.4 | `src/pages/prompts/index.astro` | Legacy prompt with demand - featured-header link now routes to CHECK. |
| `/prompts/corrective-action-plan/` | CONNECT ✅ | 17 | 0 | 11.3 | `src/pages/prompts/corrective-action-plan/index.astro` | Legacy prompt with demand - new relatedTools block links CHECK and List Cleaner. |
| `/learn/` | CONNECT ✅ | 13 | 0 | 5.1 | `src/pages/learn/index.astro` | Learn page with demand - CHECK added to quickResources above Prompt Builder. |
| `/learn/accuracy-and-research/how-to-fact-check-ai-output/` | CONNECT ✅ | 13 | 0 | 30.5 | `src/pages/learn/accuracy-and-research/how-to-fact-check-ai-output/index.astro` | Learn page with demand - tool-callout retargeted from Prompt Builder to CHECK. |
| `/learn/better-ai-systems/combining-multiple-ai-tasks/` | CONNECT ✅ | 13 | 0 | 10.2 | `src/pages/learn/better-ai-systems/combining-multiple-ai-tasks/index.astro` | Learn page with demand - new CHECK callout placed at the verify-at-handoff step. |
| `/` | KEEP | 51 | 3 | 3.1 | `src/pages/index.astro` | Hub page at mean position 3.1 already earning clicks - hold, monitor. |
| `/ai-for-business/` | KEEP | 7 | 0 | 9.6 | `src/pages/ai-for-business/index.astro` | Hub page with impressions - hold, monitor. |
| `/contact/` | KEEP | 5 | 0 | 6.8 | `src/pages/contact/index.astro` | Hub page with impressions - hold, monitor. |
| `/privacy/` | KEEP | 5 | 0 | 6.2 | `src/pages/privacy/index.astro` | Hub page with impressions - hold, monitor. |
| `/tools/timestamp-converter/` | KEEP | 3 | 0 | 11.3 | `src/pages/tools/timestamp-converter/index.astro` | Tool earning impressions and clicks - hold, monitor. |
| `/terms/` | KEEP | 2 | 0 | 9.5 | `src/pages/terms/index.astro` | Hub page with impressions - hold, monitor. |
| `/tools/json-yaml-converter/` | KEEP | 2 | 0 | 15.0 | `src/pages/tools/json-yaml-converter/index.astro` | Tool earning impressions and clicks - hold, monitor. |
| `/tools/quotation-builder/` | KEEP | 2 | 0 | 16.0 | `src/pages/tools/quotation-builder/index.astro` | Tool earning impressions and clicks - hold, monitor. |
| `/tools/url-encoder/` | KEEP | 1 | 0 | 23.0 | `src/pages/tools/url-encoder/index.astro` | Tool earning impressions and clicks - hold, monitor. |
| `/tools/url-parser/` | KEEP | 1 | 0 | 6.0 | `src/pages/tools/url-parser/index.astro` | Tool earning impressions and clicks - hold, monitor. |
| `/tools/yaml-validator/` | KEEP | 1 | 0 | 22.0 | `src/pages/tools/yaml-validator/index.astro` | Tool earning impressions and clicks - hold, monitor. |
| `/tools/json-minifier/` | KEEP | 0 | 0 | — | `src/pages/tools/json-minifier/index.astro` | Tool, no impressions in window - indexed and canonical. |
| `/tools/jwt-decoder/` | KEEP | 0 | 0 | — | `src/pages/tools/jwt-decoder/index.astro` | Tool, no impressions in window - indexed and canonical. |
| `/tools/query-string-parser/` | KEEP | 0 | 0 | — | `src/pages/tools/query-string-parser/index.astro` | Tool, no impressions in window - indexed and canonical. |
| `/tools/sql-formatter/` | KEEP | 0 | 0 | — | `src/pages/tools/sql-formatter/index.astro` | Tool, no impressions in window - indexed and canonical. |
| `/tools/uuid-generator/` | KEEP | 0 | 0 | — | `src/pages/tools/uuid-generator/index.astro` | Tool, no impressions in window - indexed and canonical. |
| `/prompts/rewrite-for-clarity/` | LEAVE | 10 | 0 | 46.3 | `src/pages/prompts/rewrite-for-clarity/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/learn/prompting-fundamentals/using-roles-constraints-and-examples/` | LEAVE | 8 | 0 | 9.9 | `src/pages/learn/prompting-fundamentals/using-roles-constraints-and-examples/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/learn/using-ai-for-real-work/human-review-and-quality-control/` | LEAVE | 8 | 0 | 37.1 | `src/pages/learn/using-ai-for-real-work/human-review-and-quality-control/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/prompts/problem-solving/` | LEAVE | 8 | 0 | 8.9 | `src/pages/prompts/problem-solving/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/character-consistency/` | LEAVE | 7 | 0 | 6.8 | `src/pages/prompts/character-consistency/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/humanize-ai-written-text/` | LEAVE | 7 | 0 | 68.0 | `src/pages/prompts/humanize-ai-written-text/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/sop-creation/` | LEAVE | 7 | 0 | 21.4 | `src/pages/prompts/sop-creation/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/learn/using-ai-for-real-work/building-reusable-prompts/` | LEAVE | 6 | 0 | 84.7 | `src/pages/learn/using-ai-for-real-work/building-reusable-prompts/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/prompts/proofreading-grammar/` | LEAVE | 6 | 0 | 6.6 | `src/pages/prompts/proofreading-grammar/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/warehouse-process-improvement/` | LEAVE | 6 | 0 | 30.0 | `src/pages/prompts/warehouse-process-improvement/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/pricing-strategy/` | LEAVE | 5 | 0 | 4.4 | `src/pages/prompts/pricing-strategy/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/process-improvement/` | LEAVE | 5 | 0 | 12.8 | `src/pages/prompts/process-improvement/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/thumbnail-design/` | LEAVE | 5 | 0 | 9.4 | `src/pages/prompts/thumbnail-design/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/learn/ai-fundamentals/what-ai-is-good-at/` | LEAVE | 4 | 0 | 7.3 | `src/pages/learn/ai-fundamentals/what-ai-is-good-at/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/learn/prompting-fundamentals/anatomy-of-a-good-prompt/` | LEAVE | 4 | 0 | 52.8 | `src/pages/learn/prompting-fundamentals/anatomy-of-a-good-prompt/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/learn/safe-and-responsible-use/ai-and-workplace-information/` | LEAVE | 4 | 0 | 30.5 | `src/pages/learn/safe-and-responsible-use/ai-and-workplace-information/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/prompts/fact-checking/` | LEAVE | 4 | 0 | 10.0 | `src/pages/prompts/fact-checking/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/learn/ai-fundamentals/where-ai-can-go-wrong/` | LEAVE | 3 | 0 | 22.0 | `src/pages/learn/ai-fundamentals/where-ai-can-go-wrong/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/prompts/customer-pain-point-research/` | LEAVE | 3 | 0 | 22.0 | `src/pages/prompts/customer-pain-point-research/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/hook-generator/` | LEAVE | 3 | 0 | 6.0 | `src/pages/prompts/hook-generator/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/manager-update-writer/` | LEAVE | 3 | 0 | 18.7 | `src/pages/prompts/manager-update-writer/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/swot-analysis/` | LEAVE | 3 | 0 | 10.0 | `src/pages/prompts/swot-analysis/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/work-document-simplifier/` | LEAVE | 3 | 0 | 11.5 | `src/pages/prompts/work-document-simplifier/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/learn/accuracy-and-research/evaluating-sources/` | LEAVE | 2 | 0 | 20.0 | `src/pages/learn/accuracy-and-research/evaluating-sources/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/prompts/article-blog-writer/` | LEAVE | 2 | 0 | 11.0 | `src/pages/prompts/article-blog-writer/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/business/` | LEAVE | 2 | 0 | 8.5 | `src/pages/prompts/business/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/cinematic-camera-motion/` | LEAVE | 2 | 0 | 2.0 | `src/pages/prompts/cinematic-camera-motion/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/landing-page-messaging/` | LEAVE | 2 | 0 | 16.0 | `src/pages/prompts/landing-page-messaging/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/meeting-summary/` | LEAVE | 2 | 0 | 10.5 | `src/pages/prompts/meeting-summary/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/social-media-content-planner/` | LEAVE | 2 | 0 | 27.5 | `src/pages/prompts/social-media-content-planner/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/learn/ai-fundamentals/ai-vs-human-judgment/` | LEAVE | 1 | 0 | 37.0 | `src/pages/learn/ai-fundamentals/ai-vs-human-judgment/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/learn/ai-fundamentals/what-generative-ai-actually-does/` | LEAVE | 1 | 0 | 41.0 | `src/pages/learn/ai-fundamentals/what-generative-ai-actually-does/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/learn/prompting-fundamentals/how-to-give-ai-better-context/` | LEAVE | 1 | 0 | 43.0 | `src/pages/learn/prompting-fundamentals/how-to-give-ai-better-context/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/learn/safe-and-responsible-use/copyright-and-ai-content/` | LEAVE | 1 | 0 | 2.0 | `src/pages/learn/safe-and-responsible-use/copyright-and-ai-content/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/learn/safe-and-responsible-use/responsible-ai-use/` | LEAVE | 1 | 0 | 41.0 | `src/pages/learn/safe-and-responsible-use/responsible-ai-use/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/learn/safe-and-responsible-use/what-not-to-share-with-ai/` | LEAVE | 1 | 0 | 11.0 | `src/pages/learn/safe-and-responsible-use/what-not-to-share-with-ai/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/learn/using-ai-for-real-work/choosing-tasks-for-ai/` | LEAVE | 1 | 0 | 52.0 | `src/pages/learn/using-ai-for-real-work/choosing-tasks-for-ai/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/prompts/competitor-research/` | LEAVE | 1 | 0 | 16.0 | `src/pages/prompts/competitor-research/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/marketing-strategy/` | LEAVE | 1 | 0 | 2.0 | `src/pages/prompts/marketing-strategy/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/product-commercial-video/` | LEAVE | 1 | 0 | 27.0 | `src/pages/prompts/product-commercial-video/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/professional-email-writer/` | LEAVE | 1 | 0 | 8.0 | `src/pages/prompts/professional-email-writer/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/root-cause-analysis/` | LEAVE | 1 | 0 | 2.0 | `src/pages/prompts/root-cause-analysis/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/text-to-video/` | LEAVE | 1 | 0 | 10.0 | `src/pages/prompts/text-to-video/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/topic-deep-dive/` | LEAVE | 1 | 0 | 7.0 | `src/pages/prompts/topic-deep-dive/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/weekly-work-planner/` | LEAVE | 1 | 0 | 34.0 | `src/pages/prompts/weekly-work-planner/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/learn/accuracy-and-research/ai-assisted-research/` | LEAVE | 0 | 0 | — | `src/pages/learn/accuracy-and-research/ai-assisted-research/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/learn/better-ai-systems/building-ai-workflows/` | LEAVE | 0 | 0 | — | `src/pages/learn/better-ai-systems/building-ai-workflows/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/learn/better-ai-systems/creating-prompt-templates/` | LEAVE | 0 | 0 | — | `src/pages/learn/better-ai-systems/creating-prompt-templates/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/learn/better-ai-systems/reviewing-and-improving-your-system/` | LEAVE | 0 | 0 | — | `src/pages/learn/better-ai-systems/reviewing-and-improving-your-system/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/learn/prompting-fundamentals/improving-a-weak-prompt/` | LEAVE | 0 | 0 | — | `src/pages/learn/prompting-fundamentals/improving-a-weak-prompt/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/learn/using-ai-for-real-work/ai-assisted-workflows/` | LEAVE | 0 | 0 | — | `src/pages/learn/using-ai-for-real-work/ai-assisted-workflows/index.astro` | Learn page, low demand - keep live, no further investment. |
| `/prompts/action-plan-generator/` | LEAVE | 0 | 0 | — | `src/pages/prompts/action-plan-generator/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/ad-copy-writer/` | LEAVE | 0 | 0 | — | `src/pages/prompts/ad-copy-writer/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/advertising-creative/` | LEAVE | 0 | 0 | — | `src/pages/prompts/advertising-creative/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/ai-image-prompt-builder/` | LEAVE | 0 | 0 | — | `src/pages/prompts/ai-image-prompt-builder/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/ai-video-prompt-builder/` | LEAVE | 0 | 0 | — | `src/pages/prompts/ai-video-prompt-builder/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/audience-question-generator/` | LEAVE | 0 | 0 | — | `src/pages/prompts/audience-question-generator/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/business-decision-framework/` | LEAVE | 0 | 0 | — | `src/pages/prompts/business-decision-framework/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/business-idea-evaluator/` | LEAVE | 0 | 0 | — | `src/pages/prompts/business-idea-evaluator/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/business-plan-builder/` | LEAVE | 0 | 0 | — | `src/pages/prompts/business-plan-builder/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/business-risk-analysis/` | LEAVE | 0 | 0 | — | `src/pages/prompts/business-risk-analysis/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/campaign-idea-generator/` | LEAVE | 0 | 0 | — | `src/pages/prompts/campaign-idea-generator/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/caption-writer/` | LEAVE | 0 | 0 | — | `src/pages/prompts/caption-writer/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/character-scene-continuity/` | LEAVE | 0 | 0 | — | `src/pages/prompts/character-scene-continuity/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/competitor-analysis/` | LEAVE | 0 | 0 | — | `src/pages/prompts/competitor-analysis/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/content-repurposing/` | LEAVE | 0 | 0 | — | `src/pages/prompts/content-repurposing/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/creator-content-pillar-builder/` | LEAVE | 0 | 0 | — | `src/pages/prompts/creator-content-pillar-builder/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/creator-workflow-planner/` | LEAVE | 0 | 0 | — | `src/pages/prompts/creator-workflow-planner/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/creators/` | LEAVE | 0 | 0 | — | `src/pages/prompts/creators/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/customer-persona-builder/` | LEAVE | 0 | 0 | — | `src/pages/prompts/customer-persona-builder/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/decision-making/` | LEAVE | 0 | 0 | — | `src/pages/prompts/decision-making/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/difficult-workplace-conversation/` | LEAVE | 0 | 0 | — | `src/pages/prompts/difficult-workplace-conversation/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/email-marketing-campaign/` | LEAVE | 0 | 0 | — | `src/pages/prompts/email-marketing-campaign/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/food-photography/` | LEAVE | 0 | 0 | — | `src/pages/prompts/food-photography/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/image-generation/` | LEAVE | 0 | 0 | — | `src/pages/prompts/image-generation/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/image-to-video/` | LEAVE | 0 | 0 | — | `src/pages/prompts/image-to-video/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/infographic-image/` | LEAVE | 0 | 0 | — | `src/pages/prompts/infographic-image/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/inventory-discrepancy-investigation/` | LEAVE | 0 | 0 | — | `src/pages/prompts/inventory-discrepancy-investigation/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/inventory-report-analysis/` | LEAVE | 0 | 0 | — | `src/pages/prompts/inventory-report-analysis/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/market-research/` | LEAVE | 0 | 0 | — | `src/pages/prompts/market-research/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/marketing-performance-review/` | LEAVE | 0 | 0 | — | `src/pages/prompts/marketing-performance-review/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/marketing/` | LEAVE | 0 | 0 | — | `src/pages/prompts/marketing/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/multi-scene-video/` | LEAVE | 0 | 0 | — | `src/pages/prompts/multi-scene-video/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/performance-review-preparation/` | LEAVE | 0 | 0 | — | `src/pages/prompts/performance-review-preparation/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/product-photography/` | LEAVE | 0 | 0 | — | `src/pages/prompts/product-photography/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/professional-tone-rewriter/` | LEAVE | 0 | 0 | — | `src/pages/prompts/professional-tone-rewriter/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/receiving-discrepancy-investigation/` | LEAVE | 0 | 0 | — | `src/pages/prompts/receiving-discrepancy-investigation/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/report-writer/` | LEAVE | 0 | 0 | — | `src/pages/prompts/report-writer/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/research-comparison/` | LEAVE | 0 | 0 | — | `src/pages/prompts/research-comparison/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/research-plan-builder/` | LEAVE | 0 | 0 | — | `src/pages/prompts/research-plan-builder/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/research-summary/` | LEAVE | 0 | 0 | — | `src/pages/prompts/research-summary/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/research/` | LEAVE | 0 | 0 | — | `src/pages/prompts/research/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/short-form-reel-video/` | LEAVE | 0 | 0 | — | `src/pages/prompts/short-form-reel-video/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/short-form-video-idea-generator/` | LEAVE | 0 | 0 | — | `src/pages/prompts/short-form-video-idea-generator/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/short-form-video-script/` | LEAVE | 0 | 0 | — | `src/pages/prompts/short-form-video-script/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/social-media-visual/` | LEAVE | 0 | 0 | — | `src/pages/prompts/social-media-visual/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/source-evaluation/` | LEAVE | 0 | 0 | — | `src/pages/prompts/source-evaluation/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/stock-count-planning/` | LEAVE | 0 | 0 | — | `src/pages/prompts/stock-count-planning/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/task-prioritization/` | LEAVE | 0 | 0 | — | `src/pages/prompts/task-prioritization/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/text-summarizer/` | LEAVE | 0 | 0 | — | `src/pages/prompts/text-summarizer/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/tone-style-adapter/` | LEAVE | 0 | 0 | — | `src/pages/prompts/tone-style-adapter/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/value-proposition-builder/` | LEAVE | 0 | 0 | — | `src/pages/prompts/value-proposition-builder/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/video-generation/` | LEAVE | 0 | 0 | — | `src/pages/prompts/video-generation/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/warehouse-kpi-analysis/` | LEAVE | 0 | 0 | — | `src/pages/prompts/warehouse-kpi-analysis/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/warehouse-safety-review/` | LEAVE | 0 | 0 | — | `src/pages/prompts/warehouse-safety-review/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/work-productivity/` | LEAVE | 0 | 0 | — | `src/pages/prompts/work-productivity/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/writing/` | LEAVE | 0 | 0 | — | `src/pages/prompts/writing/index.astro` | Legacy prompt, low demand - keep live, no further investment. |
| `/prompts/youtube-video-outline/` | LEAVE | 0 | 0 | — | `src/pages/prompts/youtube-video-outline/index.astro` | Legacy prompt, low demand - keep live, no further investment. |

## Notes

- `MISSING` marks a GSC path with no matching route (trailing-slash or retired alias). Verify in GSC before redirecting.
- `IMPROVE` is scoped to pages with **10+ impressions and 0 clicks**, so effort follows demonstrated demand
  rather than guesses. Pages at 3-9 impressions stay `KEEP` until the window shows more signal.

## Progress log

### Pass 2 — CONNECT internal linking (all 7 targets done)

The GSC window showed every learn article ending in the same callout: "Open Prompt Builder".
That pushed verification and research traffic into the weakest tool (`/tools/prompt-builder/`,
24 impressions at position 79.1) instead of `/check/`, which is the page that actually does
the work being described.

Changes by page:

| Page | Change |
| --- | --- |
| `/learn/accuracy-and-research/why-ai-can-produce-wrong-answers/` | `tool-callout` retargeted to `/check/` with copy about flagging unsupported claims. |
| `/learn/accuracy-and-research/how-to-fact-check-ai-output/` | `tool-callout` retargeted to `/check/`. |
| `/learn/accuracy-and-research/evaluating-sources/` | `tool-callout` retargeted to `/check/`. |
| `/learn/accuracy-and-research/ai-assisted-research/` | `tool-callout` retargeted to `/check/`. |
| `/learn/ai-fundamentals/where-ai-can-go-wrong/` | `tool-callout` retargeted to `/check/`. |
| `/learn/better-ai-systems/combining-multiple-ai-tasks/` | New `tool-callout` at the "verify at the handoff" step. |
| `/learn/` | `/check/` added to `quickResources` ahead of Prompt Builder. |
| `/prompts/operations-logistics/` | `supporting-tools` block now lists List Cleaner, Margin Calculator and CHECK. |
| `/prompts/corrective-action-plan/` | New `relatedTools` block (CHECK + List Cleaner). |
| `/prompts/` | Featured-header link rerouted to `/check/`. |

Supporting component work:

- `PromptPage.astro` gained an optional `relatedTools` prop and a scoped `.related-tools` block.
  It defaults to `[]`, so none of the existing prompt pages change.
- The two claim-checking pages in the source cluster (`where-ai-can-go-wrong`,
  `evaluating-sources`, `ai-assisted-research`) were added ahead of schedule because they sat
  in the same semantic cluster as the CONNECT targets and shared the identical misdirected callout.

Deliberately left on Prompt Builder: `what-ai-is-good-at`,
`what-generative-ai-actually-does`, the four `prompting-fundamentals` guides,
`ai-assisted-workflows`, `building-reusable-prompts`, `choosing-tasks-for-ai`,
`what-not-to-share-with-ai` and `reviewing-and-improving-your-system`. Those pages are
about *writing* prompts, where Prompt Builder is the correct destination.

### Pass 1 — IMPROVE title/meta rewrites

Seven zero-click pages rewritten in the earlier commit: `/tools/base64-encoder/`,
`/tools/cron-expression-generator/`, `/creators/`, `/tools/`, `/tools/margin-calculator/`,
`/check/`, `/about/`. Two tools promoted out of Legacy into a new Business category.

