# Tasks: Phase 3 Main Landing Hub

## Review Workload Forecast

| Field                   | Value          |
| ----------------------- | -------------- |
| Estimated changed lines | 850-950        |
| 400-line budget risk    | High           |
| Chained PRs recommended | No             |
| Suggested split         | Single PR      |
| Delivery strategy       | single-pr      |
| Chain strategy          | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: High

### Suggested Work Units

Single PR (user pre-approved size exception for 800-line budget)

## Phase 1: Foundation & Messages

- [x] 1.1 `npx shadcn@latest add tabs` → verify `components/ui/tabs.tsx` matches base-rhea API
- [x] 1.2 Add `HomePage.hub.*` keys to `messages/en.json` + `messages/es.json` (hero, tabs, cards, roadmap, foundations). ES: neutral/professional Spanish
- [x] 1.3 Update `messages/en.d.json.ts` type declarations for new hub keys

## Phase 2: Components (TDD: write failing test → implement)

- [x] 2.1 Test `tests/unit/copy-button.test.tsx` → `components/copy-button.tsx`: client clipboard copy with Check icon success state, ghost/icon Button
- [x] 2.2 Test `tests/unit/hero-section.test.tsx` → `components/hero-section.tsx`: Badge eyebrow, h1, description, CTA to `/{locale}/install`
- [x] 2.3 Test `tests/unit/quick-install.test.tsx` → `components/quick-install.tsx`: shadcn Tabs (CLI/Agent) + CopyButton per tab
- [x] 2.4 Test `tests/unit/summary-cards.test.tsx` → `components/summary-cards.tsx`: 4 Card grid with locale-prefixed hrefs
- [x] 2.5 Test `tests/unit/roadmap-section.test.tsx` → `components/roadmap-section.tsx`: Badge variants for shipped/future frameworks
- [x] 2.6 Test `tests/unit/foundations-section.test.tsx` → `components/foundations-section.tsx`: Card external links with `target="_blank"` + `rel="noreferrer noopener"`

## Phase 3: Integration & Verification

- [x] 3.1 Rewrite `app/[locale]/page.tsx` — drop PageShell, compose BaseNavigation + 5 hub sections, staggered CSS animation
- [x] 3.2 Update `tests/unit/localized-pages.test.tsx`: adapt home assertions for new hub structure, keep deep-page tests
- [x] 3.3 Create `tests/unit/hub-page.test.tsx`: full composition smoke test — all 5 sections + BaseNavigation, no PageShell
- [x] 3.4 Create `tests/e2e/hub-landing.spec.ts`: tab switch, clipboard with `page.evaluate`, card nav hrefs, bilingual EN/ES
- [x] 3.5 Run `npm run check` (lint, typecheck, format:check, test, doctor:ci) → fix issues
