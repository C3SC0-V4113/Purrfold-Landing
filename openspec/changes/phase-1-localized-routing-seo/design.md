# Design: Phase 1 Localized Routing & SEO

## Technical Approach

Move public content from the English-only `app/page.tsx` scaffold into explicit `app/[locale]` routes for `en` and `es`. Use `next-intl` for routing/messages/navigation, Next.js 16 `proxy.ts` for locale redirects, and one route/locale source for navigation, metadata alternates, and sitemap.

Next.js 16 docs confirm `proxy.ts` replaces `middleware`, dynamic `params` are Promises, and `PageProps`/`LayoutProps` helpers should type route params.

## Architecture Decisions

| Decision           | Choice                                                                                                                                        | Tradeoff / Rationale                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Locale URLs        | `localePrefix: 'always'` with `/en` and `/es`                                                                                                 | Avoids duplicate unprefixed SEO URLs and matches specs.                                                   |
| Redirect authority | Root `proxy.ts` delegates supported-locale routing to `next-intl` middleware and handles unsupported first-segment fallback before delegation | Slight custom code, but preserves `/fr/install` → `/en/install` instead of treating `fr` as page content. |
| Shared source      | `i18n/routing.ts` exports locales, default locale, route definitions, navigation helpers, and SEO route metadata                              | Prevents navigation/sitemap/hreflang drift.                                                               |
| Rendering model    | Server Components by default; only language switch becomes a tiny client island if path access requires `usePathname`                         | Keeps Phase 1 lightweight and server-first.                                                               |

## Data Flow

```text
Request / or /fr/install
  -> proxy.ts
  -> negotiate or normalize locale
  -> /[locale]/... route
  -> i18n/request.ts loads messages/{locale}.json
  -> page/layout renders content + metadata from shared route config
  -> sitemap.ts reads same route config
```

## File Changes

| File                                                       | Action        | Description                                                                                                                                                                                                       |
| ---------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `package.json`                                             | Modify        | Add `next-intl`; add negotiation packages only if next-intl proxy needs them.                                                                                                                                     |
| `proxy.ts`                                                 | Create        | Next.js 16 proxy; skip `_next`, assets, `sitemap.xml`, `robots.txt`; redirect `/` by Accept-Language; redirect unsupported locale-like first segment to `/en/{rest}`; otherwise delegate to next-intl middleware. |
| `i18n/routing.ts`                                          | Create        | `defineRouting`, `createNavigation`, locale constants, `phaseOneRoutes`, `buildLocalizedPath`, `getAlternates`.                                                                                                   |
| `i18n/request.ts`                                          | Create        | `getRequestConfig` loads `messages/${locale}.json`; invalid locale falls back through routing validation.                                                                                                         |
| `messages/en.json`, `messages/es.json`                     | Create        | Navigation, hub, CTA, page title/description copy. Spanish copy stays sober, neutral, and professional.                                                                                                           |
| `app/layout.tsx`                                           | Modify        | Keep fonts, globals, dev `react-scan`; remove static English metadata. Root layout remains the only `<html>/<body>` owner.                                                                                        |
| `app/page.tsx`                                             | Modify        | Thin fallback/handoff only; proxy owns normal `/` redirect.                                                                                                                                                       |
| `app/[locale]/layout.tsx`                                  | Create        | Await `params`, validate locale, set `html lang` strategy via root-compatible structure if needed, wrap children with `NextIntlClientProvider` only if client translations are used.                              |
| `app/[locale]/page.tsx`                                    | Create        | Localized hub with base navigation.                                                                                                                                                                               |
| `app/[locale]/{install,skills,quality,ecosystem}/page.tsx` | Create        | Minimal placeholder title, description, and navigation context/CTA.                                                                                                                                               |
| `app/sitemap.ts`                                           | Create        | Generate 10 localized entries from `phaseOneRoutes` with alternates.                                                                                                                                              |
| `docs/adr/0001-i18n-and-routing.md`                        | Create        | Proposed ADR for `next-intl` + prefixed routing.                                                                                                                                                                  |
| `tests/unit/**`, `tests/e2e/**`                            | Modify/Create | Locale rendering, proxy, sitemap, and path-switch coverage.                                                                                                                                                       |

## Interfaces / Contracts

```ts
export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = 'en';
export const phaseOneRoutes = ['', '/install', '/skills', '/quality', '/ecosystem'] as const;
export const routing = defineRouting({ locales, defaultLocale, localePrefix: 'always' });
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
```

`generateMetadata(props: PageProps<'/[locale]/install'>)` must `await props.params`, read localized title/description via `getTranslations`, and call `getAlternates(route)` for `en`/`es` hreflang plus canonical current URL.

## Testing Strategy

| Layer | What to Test                                                   | Approach                                                                                    |
| ----- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Unit  | Locale constants, route builders, alternates, sitemap entries  | Vitest pure helper tests; no shared mutable state.                                          |
| Unit  | Proxy matcher and redirects                                    | Use Next.js proxy testing helpers where available; otherwise isolate pure redirect helpers. |
| Unit  | EN/ES page render smoke                                        | Testing Library render of server output/helpers where practical.                            |
| E2E   | `/` redirects to `/es` for Spanish and `/en` otherwise         | Playwright with explicit `Accept-Language`.                                                 |
| E2E   | `/en`, `/es`, all deep routes, path-preserving language switch | Prefer role/text locators; assert URL and localized content.                                |

Quality gates: `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm run test`, `npm run test:e2e`, `npm run doctor`, `npm run check`.

## Migration / Rollout

No data migration. Roll out in one PR after ADR and tests. Rollback: remove `proxy.ts`, `next-intl`, locale routes/messages/sitemap/ADR, and restore current root page metadata/content.

## ADR Plan

Create `docs/adr/0001-i18n-and-routing.md`: Status Proposed, Context, Decision, Options (`next-intl`, `next-i18next`, manual), Rationale, Consequences, Risks. Mark Accepted only when implementation lands.

## Risks / Tradeoffs

- Redirect loops: keep `proxy.ts` as the only redirect authority and test supported/unsupported paths.
- SEO drift: derive metadata alternates and sitemap from `i18n/routing.ts` only.
- Next.js 16 API churn: all route params are awaited and typed with `PageProps`/`LayoutProps`; use `proxy.ts`, not `middleware.ts`.
- `next-intl` compatibility: pin a version compatible with Next.js 16 before implementation.
- Root fallback duplicate content: `/` should redirect in proxy; canonical URLs stay locale-prefixed.

## Open Questions

None blocking.
