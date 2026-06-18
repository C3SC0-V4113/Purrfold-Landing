# Tasks: Phase 4 — Install View

## Review Workload Forecast

| Field                   | Value          |
| ----------------------- | -------------- |
| Estimated changed lines | ~800           |
| 400-line budget risk    | High           |
| Chained PRs recommended | No             |
| Suggested split         | Single PR      |
| Delivery strategy       | single-pr      |
| Chain strategy          | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: High

## Phase 1: Foundation

- [x] 1.1 Extend `Pages.install` in `messages/en.json` + `messages/es.json`: tabs, configurator, output, flagsReference, preset keys (ES: neutral/professional)
- [x] 1.2 Create `lib/build-command.ts` with `FlagState` type + `buildCliCommand()` + `buildAgentPrompt()` — RED: `tests/unit/build-command.test.ts`, GREEN: implement pure functions

## Phase 2: Client Components (TDD)

- [x] 2.1 Create `components/flag-configurator.tsx` — RED: `tests/unit/flag-configurator.test.tsx`, GREEN: Collapsible with Checkbox booleans, Select choices (pm/icons), Input for preset
- [x] 2.2 Create `components/generated-output.tsx` — RED: `tests/unit/generated-output.test.tsx`, GREEN: ScrollArea + pre/code + absolute CopyButton, animate on change
- [x] 2.3 Create `components/install-view.tsx` — RED: `tests/unit/install-view.test.tsx`, GREEN: `'use client'` orchestrator with tab state, flag state, composes children

## Phase 3: Server Components

- [x] 3.1 Create `components/flags-reference.tsx` — RED: `tests/unit/flags-reference.test.tsx`, GREEN: static Card/table from messages, all flags + descriptions EN/ES
- [x] 3.2 Create `components/preset-example.tsx` — RED: `tests/unit/preset-example.test.tsx`, GREEN: code block with ScrollArea + CopyButton from messages

## Phase 4: Integration + E2E

- [x] 4.1 Modify `app/[locale]/install/page.tsx` — compose InstallView + server children inside PageShell — RED: `tests/unit/install-page.test.tsx`, GREEN: implement composition
- [x] 4.2 Write E2E `tests/e2e/install-view.spec.ts`: interactive configurator, clipboard copy, bilingual rendering

## Phase 5: Verification

- [x] 5.1 `npm run check` — lint, typecheck, format, test, doctor, build
