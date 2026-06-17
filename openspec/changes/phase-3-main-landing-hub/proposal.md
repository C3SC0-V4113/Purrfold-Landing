# Proposal: Phase 3 Main Landing Hub

## Intent

Replace the current placeholder home page (`/[locale]`) with a compelling landing hub that explains Purrfold's value, offers quick-install via CLI or agent prompt, summarizes each deep view with navigable cards, shows a simple roadmap, and surfaces foundation links. The current home is a thin PageShell with two CTAs and a foundations section — it does not communicate what Purrfold does or why it matters.

## Scope

### In Scope

- **Hero section**: brief value proposition with eyebrow, title, and description explaining what Purrfold is and why it exists.
- **Quick-install selector**: shadcn `Tabs` component (new install) with CLI tab (`npx purrfold@latest <project-directory>`) and Agent tab (natural-language prompt example). Both tabs include copy-to-clipboard.
- **Summary blocks**: four `Card` components linking to deep views — Install, Skills, Quality Tooling, Ecosystem — each with `CardHeader`, `CardTitle`, `CardDescription`, and localized link.
- **Roadmap section**: simple list with Next.js (shipped), Astro, Vite, and TanStack Start (future). Uses `Badge` for status.
- **Foundations links**: visual links to shadcn and Next.js with `target="_blank"` and `rel="noreferrer noopener"`.
- **New shadcn component**: install `tabs` via CLI.
- **Copy-to-clipboard client component**: small `'use client'` island for clipboard interaction.
- **Bilingual content**: all new copy in `messages/en.json` and `messages/es.json`.

### Out of Scope

- Deep view page content expansion (each deep route stays as-is).
- Accordion patterns — depth lives in dedicated routes.
- Framer Motion or JS animation libraries.
- New routes or routing changes.
- Theme or navigation shell modifications.

## Capabilities

### New Capabilities

- `landing-hub-content`: Hero content, quick-install tabbed selector, summary block cards, roadmap section, foundations links, and copy-to-clipboard behavior for the `/[locale]` home page.

### Modified Capabilities

- `design-shell-navigation`: Foundations links requirement changes — the home foundations section is restructured into a richer hub layout with visual card-style links instead of plain button variants.

## Approach

Restructure `app/[locale]/page.tsx` from a single PageShell into a composed layout with distinct sections. The hero stays inside PageShell for navigation consistency. Summary blocks use a responsive grid of shadcn `Card` components. The install selector uses shadcn `Tabs` with a client-side copy button. All copy flows through `messages/*.json` for EN/ES. CSS-only transitions (hover transforms, opacity) with `prefers-reduced-motion` respect.

## Affected Areas

| Area                                 | Impact   | Description                                             |
| ------------------------------------ | -------- | ------------------------------------------------------- |
| `app/[locale]/page.tsx`              | Modified | Full hub rewrite with hero, cards, roadmap, foundations |
| `components/ui/tabs.tsx`             | New      | shadcn tabs component install                           |
| `components/copy-button.tsx`         | New      | Client component for clipboard copy                     |
| `components/hero-section.tsx`        | New      | Hero with value proposition and install tabs            |
| `components/summary-card.tsx`        | New      | Reusable card linking to deep views                     |
| `components/roadmap-section.tsx`     | New      | Framework roadmap list                                  |
| `components/foundations-section.tsx` | New      | Visual external links to shadcn/Next.js                 |
| `messages/en.json`                   | Modified | New hub copy keys                                       |
| `messages/es.json`                   | Modified | Spanish hub copy keys                                   |
| `messages/en.d.json.ts`              | Modified | Type declarations for new keys                          |
| `tests/unit/`                        | New      | Hub component tests (TDD)                               |
| `tests/e2e/`                         | New      | Hub navigation and clipboard E2E                        |

## Risks

| Risk                                           | Likelihood | Mitigation                                                                        |
| ---------------------------------------------- | ---------- | --------------------------------------------------------------------------------- |
| Tabs component API mismatch with base-rhea     | Med        | Install via `npx shadcn@latest add tabs`; verify generated source                 |
| Copy-to-clipboard fails on non-HTTPS local dev | Low        | Graceful fallback with visible command text; test with `navigator.clipboard` mock |
| Hub page exceeds 400-line review budget        | Med        | Split into focused components; each section is a separate file                    |

## Rollback Plan

Revert `app/[locale]/page.tsx` to the current PageShell-only layout. Remove new components (`copy-button`, `hero-section`, `summary-card`, `roadmap-section`, `foundations-section`). Revert `messages/*.json` to Phase 2 keys. Remove `tabs` component if no other consumer exists.

## Dependencies

- shadcn `tabs` component (base-rhea style, not yet installed).
- Existing `Card`, `Badge`, `Button`, `Separator` components.
- `navigator.clipboard` API (with graceful fallback).

## Success Criteria

- [ ] Home page renders hero, install tabs, four summary cards, roadmap, and foundations links.
- [ ] CLI and Agent tabs display correct content with working copy-to-clipboard.
- [ ] All summary cards link to their corresponding `/[locale]/{route}`.
- [ ] EN and ES content renders correctly with localized copy.
- [ ] `prefers-reduced-motion` disables any CSS transitions.
- [ ] Unit tests cover each new component (TDD: red → green).
- [ ] E2E covers tab switching, clipboard, and card navigation.
- [ ] `npm run lint`, `typecheck`, `format:check`, `test`, `doctor`, and `check` pass.
