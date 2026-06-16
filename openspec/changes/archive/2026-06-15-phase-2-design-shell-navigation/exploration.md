## Exploration: phase-2-design-shell-navigation

### Current State

Phase 1 (`phase-1-localized-routing-seo`) already delivered significant shell infrastructure as part of its corrective shadcn UI pass. The following Phase 2 items are **already complete**:

- **Sticky header**: `BaseNavigation` renders as `<header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60 ...">` at `components/base-navigation.tsx`.
- **Desktop nav**: Route links from `phaseOneRoutes` using `buttonVariants` with ghost/secondary variants and `aria-current="page"` support.
- **Mobile nav**: `Sheet` component with `SheetContent side="right"`, `SheetTrigger`, `SheetClose`, separators between nav and external links.
- **Theme toggle**: `ThemeSwitcher` at `components/theme-switcher.tsx` — `DropdownMenu` with `DropdownMenuRadioGroup` for light/dark/system.
- **Theme provider**: `ThemeProvider` at `components/theme-provider.tsx` — `useSyncExternalStore` for system preference, inline theme script in root layout, localStorage key `purrfold-theme`.
- **Language switch**: `LanguageSwitcher` at `components/language-switcher.tsx` — `DropdownMenu` with `DropdownMenuRadioGroup` for EN/ES.
- **External links**: GitHub, shadcn, Next.js in both desktop nav and mobile sheet.
- **shadcn components installed** (7): `badge`, `button`, `card`, `dropdown-menu`, `separator`, `sheet`, `tooltip`.
- **TooltipProvider** in root layout wrapping entire app tree.
- **PageShell** at `components/page-shell.tsx`: minimal reusable shell with Card/Badge/Separator/Link back.

### Remaining Phase 2 Work

1. **navigation-menu shadcn component** — Not installed. Available in registry for `base` style. The current desktop nav uses raw `Link` + `buttonVariants`. NavigationMenu would provide accessible menu semantics, arrow-key navigation, and potential for sub-menus. **Decision needed**: replace flat Link nav with NavigationMenu, or keep current approach which is simpler for 5 flat links.

2. **CSS animation tokens in `app/globals.css`** — No custom `@keyframes` or `--animate-*` tokens defined. Current imports: `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`. Phase 2 should define subtle shell-entrance animations respecting `prefers-reduced-motion`.

3. **Unit tests for theme/language controls** — No dedicated tests exist for `ThemeSwitcher` or `LanguageSwitcher`. Existing `localized-pages.test.tsx` renders pages inside `ThemeProvider` but does not test the switchers.

4. **E2E tests for mobile nav open/close** — The single E2E spec `localized-routing.spec.ts` does not test mobile nav.

5. **E2E tests for external link href correctness** — No explicit E2E test for GitHub/shadcn/Next.js link targets.

6. **ADR 0002 `docs/adr/0002-design-system-boundaries.md`** — Not created. Decision: shadcn as base design system.

7. **Tooltip integration on nav** — `TooltipProvider` is in root layout but no `Tooltip` components are used on nav items.

8. **State validation** — Phase 2 must pass `npm run check`.

### Affected Areas

| File                                        | Change                                                        |
| ------------------------------------------- | ------------------------------------------------------------- |
| `components/base-navigation.tsx`            | Optionally refactor to NavigationMenu or add Tooltip wrappers |
| `components/ui/navigation-menu.tsx`         | **New file** if installed                                     |
| `app/globals.css`                           | Add custom animation tokens                                   |
| `tests/unit/theme-switcher.test.tsx`        | **New file** — unit tests for ThemeSwitcher                   |
| `tests/unit/language-switcher.test.tsx`     | **New file** — unit tests for LanguageSwitcher                |
| `tests/e2e/mobile-navigation.spec.ts`       | **New file** — E2E mobile nav + external link tests           |
| `docs/adr/0001-i18n-and-routing.md`         | Update status from Proposed to Accepted                       |
| `docs/adr/0002-design-system-boundaries.md` | **New file** — ADR for shadcn as design system base           |

### Approaches

1. **NavigationMenu replacement** — Install `navigation-menu`, replace current Link+buttonVariants.
   - Pros: Accessible menu semantics, closer to original scope.
   - Cons: Overkill for 5 flat links; Radix dependency in a base-style project.
   - **Recommended**: Keep current approach. Document in ADR 0002.

2. **Custom animation tokens** — Add 2-3 subtle `@keyframes` tokens behind `motion-safe:` directives.
   - Effort: Low | **Recommended**: Yes.

3. **Tests-only gap fill** — Add unit + E2E without changing production components.
   - Effort: Low-Medium | **Recommended**: Yes — highest-value remaining work.

### Recommendation

Phase 2 should:

1. Install `navigation-menu`, then document in ADR 0002 that it is available but not used for flat nav.
2. Add CSS animation tokens in `app/globals.css` (2-3 subtle tokens).
3. Add unit tests for `ThemeSwitcher` and `LanguageSwitcher`.
4. Add E2E tests for mobile nav open/close and external link hrefs.
5. Create ADR 0002 with decisions on shadcn base, navigation approach, custom theme provider.
6. Update ADR 0001 status to Accepted.
7. Do NOT rework existing shell components — they pass tests.

### Risks

- navigation-menu may have different API under `base` style vs `radix`. Verify after install.
- E2E mobile tests depend on viewport emulation; use proper waitFor patterns.
- Animation token creep: constrain to 2-3 tokens with explicit purpose.
- ADR 0001 still Proposed despite shipped implementation.

### Planning Notes

- **shadcn MCP**: Configured and enabled in `opencode.json`. Use `npx shadcn@latest` for all shadcn operations.
- **Phase 1 relationship**: Corrective shadcn pass already built most shell. Phase 2 is documentation, animation, and test-gap pass.
- **`npm run check`** must pass before claim.

### Ready for Design

Yes. Design should lock:

1. Install navigation-menu? Keep Link+buttonVariants (recommended).
2. Which animation tokens (2-3 minimal).
3. Tooltip wrappers? Optional, not blocking.
4. ADR 0002 decision statements.
