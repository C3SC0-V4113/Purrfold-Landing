## Verification Report

**Change**: phase-2-design-shell-navigation
**Version**: N/A
**Mode**: Strict TDD
**Artifact set**: proposal + specs + design + tasks + apply-progress
**Verification date**: 2026-06-15

### Completeness

| Metric           | Value |
| ---------------- | ----- |
| Tasks total      | 13    |
| Tasks complete   | 13    |
| Tasks incomplete | 0     |

### Build & Tests Execution

**Build**: ➖ No separate `npm run build` gate was requested for this change. Type generation + TypeScript verification passed, the focused `localized-pages` regression passed, and fresh aggregate `npm run check` passed.

**Command Evidence**

**`npm run test -- tests/unit/localized-pages.test.tsx`**

```text
> purrfold-landing@0.1.0 test
> vitest run tests/unit/localized-pages.test.tsx


 RUN  v4.1.8 C:/Users/frank/OneDrive/Documents/purrfold-landing

 ✓ tests/unit/localized-pages.test.tsx (6 tests) 3221ms
     ✓ renders the English home navigation and hub content 1324ms
     ✓ renders the Spanish home navigation and hub content 318ms
     ✓ renders an English placeholder page with context and a CTA 321ms
     ✓ renders a Spanish placeholder page with equivalent localized content 344ms
     ✓ renders localized sub-card labels on Spanish placeholder pages 675ms

 Test Files  1 passed (1)
      Tests  6 passed (6)
   Start at  19:32:26
   Duration  33.19s (transform 2.14s, setup 0ms, import 11.25s, tests 3.22s, environment 16.36s)
```

**`npm run lint`**

```text
> purrfold-landing@0.1.0 lint
> eslint . --no-warn-ignored --max-warnings 0
```

**`npm run typecheck`**

```text
> purrfold-landing@0.1.0 typecheck
> node scripts/refresh-next-types.mjs && next typegen && tsc --noEmit

Generating route types...
✓ Types generated successfully
```

**`npm run format:check`**

```text
> purrfold-landing@0.1.0 format:check
> prettier --check .

Checking formatting...
All matched files use Prettier code style!
```

**`npm run test`**

```text
> purrfold-landing@0.1.0 test
> vitest run


 RUN  v4.1.8 C:/Users/frank/OneDrive/Documents/purrfold-landing

 ✓ tests/unit/design-shell-navigation-artifacts.test.ts (3 tests) 11ms
 ✓ tests/unit/i18n-routing.test.ts (5 tests) 10ms
 ✓ tests/unit/sitemap.test.ts (2 tests) 11ms
stderr | tests/unit/root-layout.test.tsx > RootLayout > sets the html lang attribute from the resolved locale
In HTML, <html> cannot be a child of <div>.
This will cause a hydration error.

 ✓ tests/unit/root-layout.test.tsx (1 test) 87ms
 ✓ tests/unit/language-switcher.test.tsx (2 tests) 957ms
     ✓ shows both locale options 608ms
     ✓ preserves path, query, and hash when switching locales 338ms
 ✓ tests/unit/theme-switcher.test.tsx (2 tests) 1008ms
     ✓ shows localized theme options for English 606ms
     ✓ updates the theme without changing the current route 390ms
 ✓ tests/unit/localized-pages.test.tsx (6 tests) 1587ms
     ✓ renders the English home navigation and hub content 659ms
     ✓ renders localized sub-card labels on Spanish placeholder pages 359ms
 ✓ tests/unit/proxy.test.ts (3 tests) 6ms
 ✓ tests/unit/home.test.tsx (1 test) 3ms

 Test Files  9 passed (9)
      Tests  25 passed (25)
   Start at  19:04:17
   Duration  19.66s (transform 2.51s, setup 0ms, import 17.47s, tests 3.68s, environment 77.22s)
```

**`CI=1 npx playwright test tests/e2e/mobile-navigation.spec.ts --project=chromium --workers=1`**

```text
Running 2 tests using 1 worker
·[WebServer] [browser] [React Scan] react-grab v0.1.32 is outdated (latest: v0.1.44). Update react-scan to pick up the newer react-grab. (https://unpkg.com/react-scan/dist/auto.global.js:2:304115)
·
  2 passed (20.1s)
```

**`npm run doctor`**

```text
> purrfold-landing@0.1.0 doctor
> react-doctor . --yes --blocking warning

React Doctor v0.5.4

✔ Scanned 19 files in 22.9s [~8 workers]

  All 1 issue

  Maintainability › 1 warning

  Run npx react-doctor@latest --verbose to list every error and warning

  ┌─────┐  96 / 100 Great
  │ ◠ ◠ │  ████████████████████████████████████████████████░░
  │  ▽  │  React Doctor (https://react.doctor)
  └─────┘

  Share: https://react.doctor/share?p=purrfold-landing&s=96&w=1&f=1
  Docs: https://react.doctor/docs
  GitHub: https://github.com/millionco/react-doctor
```

**`npm run check`**

```text
> purrfold-landing@0.1.0 check
> npm run lint && npm run typecheck && npm run format:check && npm run test && npm run doctor:ci


> purrfold-landing@0.1.0 lint
> eslint . --no-warn-ignored --max-warnings 0


> purrfold-landing@0.1.0 typecheck
> node scripts/refresh-next-types.mjs && next typegen && tsc --noEmit

Generating route types...
✓ Types generated successfully

> purrfold-landing@0.1.0 format:check
> prettier --check .

Checking formatting...
All matched files use Prettier code style!

> purrfold-landing@0.1.0 test
> vitest run


 RUN  v4.1.8 C:/Users/frank/OneDrive/Documents/purrfold-landing

 ✓ tests/unit/sitemap.test.ts (2 tests) 43ms
 ✓ tests/unit/i18n-routing.test.ts (5 tests) 27ms
 ✓ tests/unit/design-shell-navigation-artifacts.test.ts (3 tests) 60ms
stderr | tests/unit/root-layout.test.tsx > RootLayout > sets the html lang attribute from the resolved locale
In HTML, <html> cannot be a child of <div>.
This will cause a hydration error.

 ✓ tests/unit/root-layout.test.tsx (1 test) 289ms

 ✓ tests/unit/language-switcher.test.tsx (2 tests) 1800ms
     ✓ shows both locale options 1165ms
     ✓ preserves path, query, and hash when switching locales 570ms
 ✓ tests/unit/theme-switcher.test.tsx (2 tests) 2095ms
     ✓ shows localized theme options for English 1463ms
     ✓ updates the theme without changing the current route 608ms
 ✓ tests/unit/proxy.test.ts (3 tests) 13ms
 ✓ tests/unit/home.test.tsx (1 test) 13ms
 ✓ tests/unit/localized-pages.test.tsx (6 tests) 2312ms
     ✓ renders the English home navigation and hub content 988ms
     ✓ renders the Spanish home navigation and hub content 339ms
     ✓ renders localized sub-card labels on Spanish placeholder pages 523ms

 Test Files  9 passed (9)
      Tests  25 passed (25)
   Start at  19:34:08
   Duration  49.14s (transform 5.44s, setup 0ms, import 40.03s, tests 6.65s, environment 223.90s)


> purrfold-landing@0.1.0 doctor:ci
> react-doctor . --yes --blocking warning

React Doctor v0.5.4

✔ Scanned 19 files in 32.6s [~8 workers]

  All 1 issue

  Maintainability › 1 warning

  Run npx react-doctor@latest --verbose to list every error and warning

  ┌─────┐  96 / 100 Great
  │ ◠ ◠ │  ████████████████████████████████████████████████░░
  │  ▽  │  React Doctor (https://react.doctor)
  └─────┘

  Share: https://react.doctor/share?p=purrfold-landing&s=96&w=1&f=1
  Docs: https://react.doctor/docs
  GitHub: https://github.com/millionco/react-doctor
```

### TDD Compliance

| Check                                       | Result | Details                                                                                                                                                                                                                                      |
| ------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TDD Evidence reported                       | ✅     | `apply-progress.md` contains a TDD Cycle Evidence table for all 13 tasks.                                                                                                                                                                    |
| All implementation tasks have test evidence | ✅     | 11/11 implementation tasks map to concrete test files; verification tasks 5.1 and 5.2 map to command evidence and artifact review.                                                                                                           |
| RED confirmed (tests exist)                 | ✅     | Referenced files exist: `tests/unit/theme-switcher.test.tsx`, `tests/unit/language-switcher.test.tsx`, `tests/unit/localized-pages.test.tsx`, `tests/unit/design-shell-navigation-artifacts.test.ts`, `tests/e2e/mobile-navigation.spec.ts`. |
| GREEN confirmed (tests pass)                | ✅     | Fresh `npm run test` and targeted Playwright passed.                                                                                                                                                                                         |
| Triangulation adequate                      | ⚠️     | Most requirements have multi-scenario coverage, and external-link safety now has a passing `target`/`rel` assertion in `tests/unit/localized-pages.test.tsx`; motion coverage still proves token definitions more than runtime shell usage.  |
| Safety Net for modified files               | ✅     | Modified behavior is covered by fresh lint, typecheck, format, Vitest, targeted Playwright, doctor, and aggregate `check` runs.                                                                                                              |

**TDD Compliance**: 5/6 checks passed

---

### Test Layer Distribution

| Layer       | Tests  | Files | Tools                    |
| ----------- | ------ | ----- | ------------------------ |
| Unit        | 7      | 3     | Vitest                   |
| Integration | 6      | 1     | Vitest + Testing Library |
| E2E         | 2      | 1     | Playwright               |
| **Total**   | **15** | **5** |                          |

---

### Changed File Coverage

Coverage analysis skipped — no coverage tool detected.

---

### Assertion Quality

**Assertion quality**: ✅ All assertions in the change-related tests exercise real files, components, routes, or browser behavior. No tautologies, ghost loops, or assertion-free smoke tests were found.

---

### Quality Metrics

**Linter**: ✅ No errors (`npm run lint`)
**Type Checker**: ✅ No errors (`npm run typecheck`)

### Spec Compliance Matrix

| Requirement                                  | Scenario                                     | Test                                                                                                                                                                                                                                                          | Result       |
| -------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Desktop primary navigation menu              | Desktop nav renders localized links          | `tests/unit/localized-pages.test.tsx > renders the English home navigation and hub content`; `tests/unit/localized-pages.test.tsx > renders the Spanish home navigation and hub content`                                                                      | ✅ COMPLIANT |
| Desktop primary navigation menu              | Active route remains visible                 | `tests/unit/localized-pages.test.tsx > keeps the active desktop route visible on localized deep pages`                                                                                                                                                        | ✅ COMPLIANT |
| Mobile sheet navigation accessibility        | Mobile sheet opens and closes                | `tests/e2e/mobile-navigation.spec.ts > opens and closes the mobile sheet without leaving the page`                                                                                                                                                            | ✅ COMPLIANT |
| Mobile sheet navigation accessibility        | Mobile sheet exposes accessible labels       | `tests/e2e/mobile-navigation.spec.ts > opens and closes the mobile sheet without leaving the page`                                                                                                                                                            | ✅ COMPLIANT |
| External link placement and safety           | Navbar exposes GitHub only                   | `tests/e2e/mobile-navigation.spec.ts > keeps GitHub in the navbar and moves framework links to the home foundations section`                                                                                                                                  | ✅ COMPLIANT |
| External link placement and safety           | External action is safe                      | `tests/unit/localized-pages.test.tsx > renders the English home navigation and hub content`                                                                                                                                                                   | ✅ COMPLIANT |
| Home foundations links                       | Home page owns secondary external references | `tests/unit/localized-pages.test.tsx > renders the English home navigation and hub content`; `tests/e2e/mobile-navigation.spec.ts > keeps GitHub in the navbar and moves framework links to the home foundations section`                                     | ✅ COMPLIANT |
| Theme and language controls preserve context | Theme selection remains functional           | `tests/unit/theme-switcher.test.tsx > updates the theme without changing the current route`                                                                                                                                                                   | ✅ COMPLIANT |
| Theme and language controls preserve context | Locale switch preserves deep location        | `tests/unit/language-switcher.test.tsx > preserves path, query, and hash when switching locales`                                                                                                                                                              | ✅ COMPLIANT |
| Minimal motion tokens respect reduced motion | Standard motion uses shared tokens           | `tests/unit/design-shell-navigation-artifacts.test.ts > defines minimal shared motion tokens and reduced-motion guards in globals.css`                                                                                                                        | ⚠️ PARTIAL   |
| Minimal motion tokens respect reduced motion | Reduced motion disables extra animation      | `tests/unit/design-shell-navigation-artifacts.test.ts > defines minimal shared motion tokens and reduced-motion guards in globals.css`                                                                                                                        | ✅ COMPLIANT |
| Documentation and verification stay aligned  | Durable docs are updated                     | `tests/unit/design-shell-navigation-artifacts.test.ts > records the accepted design-system boundary ADR and aligns ADR 0001 status`; `tests/unit/design-shell-navigation-artifacts.test.ts > documents repo-level shadcn MCP enablement in AGENTS and README` | ✅ COMPLIANT |
| Documentation and verification stay aligned  | Verification covers controls and navigation  | `npm run test`; `CI=1 npx playwright test tests/e2e/mobile-navigation.spec.ts --project=chromium --workers=1`; `npm run check`                                                                                                                                | ✅ COMPLIANT |

**Compliance summary**: 12/13 scenarios fully compliant, 1/13 partial, 0/13 untested

### Correctness (Static Evidence)

| Requirement                                                          | Status                      | Notes                                                                                                                               |
| -------------------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Desktop navigation uses shadcn `NavigationMenu` with localized links | ✅ Implemented              | `components/base-navigation.tsx` renders desktop links through `NavigationMenuLink render={<Link ... />}` and runtime tests passed. |
| Mobile navigation remains a `Sheet` with accessible controls         | ✅ Implemented              | `components/base-navigation.tsx` keeps `Sheet`, open trigger, close control, and title; targeted Playwright passed.                 |
| GitHub is the only navbar external action                            | ✅ Implemented              | Runtime browser proof confirms GitHub remains in navbar while framework links moved to home.                                        |
| External action includes safe attributes                             | ✅ Implemented and verified | `tests/unit/localized-pages.test.tsx` asserts the GitHub navbar link keeps `target="_blank"` and `rel="noreferrer noopener"`.       |
| Home page owns shadcn and Next.js external references                | ✅ Implemented              | Runtime unit/E2E evidence confirms location and hrefs.                                                                              |
| Theme and language controls preserve route context                   | ✅ Implemented              | Unit tests passed for route-stable theme changes and locale preservation.                                                           |
| Minimal motion stays CSS-only and reduced-motion aware               | ⚠️ Partially verified       | Tokens and reduced-motion overrides exist, but shell runtime consumption is not directly proven.                                    |
| Docs and ADRs reflect the design-system boundary                     | ✅ Implemented              | Artifact tests passed and docs are present.                                                                                         |

### Coherence (Design)

| Decision                                                                         | Followed? | Notes                                                                       |
| -------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------- |
| Desktop nav primitive = shadcn `NavigationMenu` with Base UI `render={<Link />}` | ✅ Yes    | Matches `design.md` and implementation in `components/base-navigation.tsx`. |
| Mobile nav stays on `Sheet`                                                      | ✅ Yes    | Matches design and passing Playwright evidence.                             |
| GitHub-only navbar external; shadcn/Next.js move to home foundations             | ✅ Yes    | Matches design and passing runtime evidence.                                |
| Motion limited to 2-3 CSS tokens in `app/globals.css`                            | ✅ Yes    | Tokens are defined exactly as designed.                                     |
| ADR + README/AGENTS carry the boundary decision                                  | ✅ Yes    | Docs exist and artifact tests passed.                                       |
| Verification gates run before completion                                         | ✅ Yes    | All required commands were executed fresh in this verification pass.        |

### Issues Found

**CRITICAL**

- None.

**WARNING**

- Required spec scenario **Minimal motion tokens respect reduced motion → Standard motion uses shared tokens** is only **PARTIAL**. Tests prove token definitions in `app/globals.css`, but grep/source review found no runtime assertion that shell UI uses those tokens when motion is applied.
- `tests/unit/root-layout.test.tsx` still emits the jsdom hydration warning: `In HTML, <html> cannot be a child of <div>. This will cause a hydration error.`
- Targeted Playwright still reports the browser-console warning: `react-grab v0.1.32 is outdated (latest: v0.1.44).`
- React Doctor passes but reports 1 maintainability warning (score 96/100).

**SUGGESTION**

- If shell motion is intended to be active, add a behavior-level assertion proving the consuming UI uses the shared animation tokens; otherwise narrow the scenario wording in a future spec revision.

### Verdict

PASS WITH WARNINGS

All required verification commands passed, task completion is 13/13, and the previously stale external-link safety gap is now covered by a passing localized-pages regression. Formal verification still carries warnings because shell motion is only partially runtime-proven, `root-layout` still emits the jsdom `<html>` nesting warning, Playwright still logs the outdated `react-grab` console warning, and React Doctor still reports 1 maintainability warning.
