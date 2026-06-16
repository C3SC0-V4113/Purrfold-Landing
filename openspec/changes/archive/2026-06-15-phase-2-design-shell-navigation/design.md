# Design: Phase 2 Design Shell Navigation

## Technical Approach

Build on Phase 1’s shipped shell (`BaseNavigation`, `ThemeSwitcher`, `LanguageSwitcher`, `PageShell`). Phase 2 swaps the desktop nav implementation to shadcn/base-rhea `NavigationMenu`, keeps mobile `Sheet`, moves secondary external links to home content, adds minimal Tailwind v4 motion tokens, and records design-system boundaries in ADR/docs.

## Architecture Decisions

| Decision              | Choice                                                                      | Alternatives considered                   | Rationale                                                                                                                     |
| --------------------- | --------------------------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Desktop nav primitive | Adopt shadcn `navigation-menu` with Base UI `render={<Link />}` composition | Keep raw `Link` + `buttonVariants`        | User selected NavigationMenu; it aligns with shadcn-first rules and prepares accessible menu semantics without custom markup. |
| Mobile nav            | Keep current `Sheet` pattern                                                | Use NavigationMenu for mobile too         | Existing Sheet has correct side panel semantics and avoids mixing desktop menu behavior with mobile disclosure behavior.      |
| External links        | GitHub only in navbar; shadcn/Next.js in home foundations section           | Keep all external links in navbar         | Reduces header clutter and makes GitHub the only persistent external action.                                                  |
| Motion                | Add 2-3 CSS tokens in `app/globals.css`                                     | Add animation library or page transitions | DESIGN.md requires subtle motion; tokens are enough and respect reduced motion.                                               |
| Docs                  | ADR 0002 + README/AGENTS shadcn MCP notes                                   | README-only note                          | shadcn/base-rhea and MCP are durable workflow boundaries, so ADR + operational docs are appropriate.                          |

## Data Flow

```text
i18n/routing + messages
  ├─ BaseNavigation ── desktop NavigationMenu ── localized Links + GitHub
  ├─ BaseNavigation ── mobile Sheet ─────────── localized Links + GitHub
  └─ Home page ────── foundations section ───── shadcn + Next.js external links

ThemeProvider ── ThemeSwitcher dropdown ── html.dark + localStorage
pathname/router ── LanguageSwitcher ───── localized replacement path
```

## File Changes

| File                                        | Action | Description                                                                                                                   |
| ------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `components/ui/navigation-menu.tsx`         | Create | Generated shadcn base-rhea NavigationMenu component.                                                                          |
| `components/base-navigation.tsx`            | Modify | Import NavigationMenu; render desktop links via `NavigationMenuList/Item/Link`; keep mobile Sheet; keep only GitHub external. |
| `app/[locale]/page.tsx`                     | Modify | Add home foundations section below existing hero/card actions.                                                                |
| `messages/en.json`, `messages/es.json`      | Modify | Add sober EN/ES labels/copy for foundations links.                                                                            |
| `app/globals.css`                           | Modify | Add minimal `--animate-*` tokens/keyframes and reduced-motion guard.                                                          |
| `tests/unit/theme-switcher.test.tsx`        | Create | Verify dropdown options and theme selection/localStorage/class behavior.                                                      |
| `tests/unit/language-switcher.test.tsx`     | Create | Verify locale radio options and `router.replace` target.                                                                      |
| `tests/e2e/mobile-navigation.spec.ts`       | Create | Verify mobile sheet open/close and GitHub/shadcn/Next.js href locations.                                                      |
| `docs/adr/0002-design-system-boundaries.md` | Create | Accepted ADR for shadcn/base-rhea, Base UI `render`, lucide, semantic tokens, and MCP.                                        |
| `docs/adr/0001-i18n-and-routing.md`         | Modify | Mark Accepted if implementation already landed.                                                                               |
| `AGENTS.md`, `README.md`                    | Modify | Document `opencode.json` shadcn MCP is enabled and important.                                                                 |

## Interfaces / Contracts

Use generated shadcn API shape:

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink
        render={<Link href="/en/install" />}
        className={navigationMenuTriggerStyle()}
      />
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

Navbar external contract: `externalLinkItems` contains only `{ href: externalLinks.github, labelKey: 'github' }`. Home foundations own `externalLinks.shadcn` and `externalLinks.nextjs`.

## Testing Strategy

| Layer | What to Test      | Approach                                                                          |
| ----- | ----------------- | --------------------------------------------------------------------------------- |
| Unit  | Theme dropdown    | Testing Library click/select assertions; mock `matchMedia`; assert storage/class. |
| Unit  | Language dropdown | Mock `next/navigation`; assert locale labels and replacement URL.                 |
| E2E   | Mobile nav        | Chromium mobile viewport; open sheet, check links, close sheet.                   |
| E2E   | External hrefs    | Assert navbar GitHub and home shadcn/Next.js hrefs without navigating away.       |

## Migration / Rollout

No data migration required. Implement in one Phase 2 PR if under review budget; otherwise split docs/tests from nav UI after asking per chained-PR strategy.

## Verification Gates

Run `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm run test`, targeted Playwright for mobile/external hrefs, `npm run doctor`, and `npm run check`.

## Open Questions

- [ ] None blocking; verify generated `navigation-menu` source after installation before implementation.
