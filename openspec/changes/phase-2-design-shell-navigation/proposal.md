# Proposal: Phase 2 Design Shell Navigation

## Intent

Finish Phase 2 shell/navigation planning after Phase 1 already delivered sticky header, mobile sheet, theme/language controls, and shadcn correction work. This change formalizes the remaining design-system boundary, adopts `navigation-menu`, tightens external-link placement, adds minimal motion tokens, and closes test/documentation gaps.

## Scope

### In Scope

- Install/adopt shadcn `navigation-menu` for desktop primary navigation using base-rhea/Base UI `render` composition with Next.js `Link`.
- Keep only GitHub as a navbar external link with modern lucide icon styling.
- Move shadcn and Next.js external links into a home “foundations” section.
- Preserve theme and language dropdown behavior while adding focused unit coverage.
- Add minimal CSS animation tokens in `app/globals.css`, respecting reduced motion.
- Add mobile nav open/close E2E and external href E2E.
- Create `docs/adr/0002-design-system-boundaries.md`; align ADR 0001 status if needed.
- Document enabled shadcn MCP in `AGENTS.md`/`README.md` as appropriate.

### Out of Scope

- Heavy page transitions, animation libraries, or broad visual redesign.
- New locales, route model changes, or proxy redirect changes.
- Production implementation in this planning phase.

## Capabilities

### New Capabilities

- `design-shell-navigation`: Shell navigation, design-system boundaries, external-link placement, motion tokens, and shell control verification.

### Modified Capabilities

- None; `openspec/specs/` has no existing capability specs.

## Approach

Use the existing Phase 1 shell as the base. Replace the desktop link group with shadcn/base `NavigationMenu` while leaving the mobile `Sheet` pattern intact. Update home content to host shadcn/Next.js foundation links, constrain motion to reusable CSS tokens, and document shadcn MCP plus ADR decisions before implementation.

## Affected Areas

| Area                                        | Impact   | Description                                               |
| ------------------------------------------- | -------- | --------------------------------------------------------- |
| `components/base-navigation.tsx`            | Modified | Desktop NavigationMenu; GitHub-only external navbar link. |
| `components/ui/navigation-menu.tsx`         | New      | shadcn base-rhea component source.                        |
| `app/[locale]/page.tsx`, `messages/*.json`  | Modified | Home foundations section with shadcn/Next.js links.       |
| `app/globals.css`                           | Modified | Minimal shell motion tokens.                              |
| `tests/unit/*switcher*.test.tsx`            | New      | Theme/language dropdown behavior.                         |
| `tests/e2e/mobile-navigation.spec.ts`       | New      | Mobile nav and external href coverage.                    |
| `docs/adr/0001-i18n-and-routing.md`         | Modified | Status alignment if shipped.                              |
| `docs/adr/0002-design-system-boundaries.md` | New      | shadcn/base-rhea boundary.                                |
| `AGENTS.md`, `README.md`                    | Modified | shadcn MCP documentation.                                 |

## Risks

| Risk                             | Likelihood | Mitigation                                                             |
| -------------------------------- | ---------- | ---------------------------------------------------------------------- |
| NavigationMenu overfits flat nav | Med        | Use simple `NavigationMenuLink`; no submenu content yet.               |
| Base UI API mismatch             | Med        | Use `npx shadcn@latest docs navigation-menu`; verify generated source. |
| Mobile/E2E flake                 | Low        | Use role locators and viewport-specific tests.                         |
| Motion creep                     | Low        | Limit to 2-3 tokens; no page transitions.                              |

## Rollback Plan

Revert the change folder implementation: restore `buttonVariants` desktop links, remove `navigation-menu`, remove added tests/docs/tokens, and keep Phase 1 shell behavior.

## Dependencies

- shadcn CLI/MCP enabled via `opencode.json`.
- Existing `@base-ui/react`, lucide, Tailwind v4, Vitest, Playwright.

## Success Criteria

- [ ] Navigation uses shadcn `navigation-menu` without regressing localized routes.
- [ ] Navbar external links contain GitHub only; shadcn/Next.js appear on home.
- [ ] Theme/language unit tests and mobile/external href E2E exist.
- [ ] ADR/docs reflect shadcn base-rhea and MCP setup.
- [ ] `npm run lint`, `typecheck`, `format:check`, `test`, `doctor`, and `check` pass.
