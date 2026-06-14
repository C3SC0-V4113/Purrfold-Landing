## Exploration: phase-1-localized-routing-seo

### Current State

The app is still a minimal Next.js 16 scaffold: only `app/layout.tsx` and `app/page.tsx` exist, metadata is static and English-only, and there is no locale segment, `proxy.ts`, `next-intl` setup, sitemap, ADR folder, or route-aware navigation. Tests are smoke-level only (`tests/unit/home.test.tsx` renders the root page and `tests/e2e/home.spec.ts` only checks `/`).

### Affected Areas

- `package.json` — add `next-intl` and keep scripts/test flow unchanged.
- `app/layout.tsx` — keep root shell/global metadata base; likely becomes the place for site-wide metadata defaults.
- `app/page.tsx` — current `/` route likely becomes a redirect or thin handoff to default locale `/en`.
- `app/[locale]/layout.tsx` — localized layout for `lang`, messages, navigation shell, and locale-aware metadata.
- `app/[locale]/page.tsx` — localized hub page content for EN/ES.
- `app/[locale]/{install,skills,quality,ecosystem}/page.tsx` — Phase 1 route skeletons required by the localized IA.
- `app/sitemap.ts` — basic sitemap with localized alternates per route.
- `proxy.ts` — Next.js 16 locale routing entrypoint for prefixed locale handling.
- `lib/` or `i18n/` helpers (new) — routing config, navigation wrappers, locale validation, and message loading.
- `messages/en.json` and `messages/es.json` (new) — translation source for hub/navigation/route titles.
- `tests/unit/home.test.tsx` or new localized page tests — update to assert EN and ES render paths/content.
- `tests/e2e/home.spec.ts` or new i18n E2E spec — cover `/en` and `/es` plus base navigation links.
- `docs/adr/0001-i18n-and-routing.md` — record why next-intl + prefixed localized App Router routes were chosen.

### Approaches

1. **next-intl routing-first architecture** — Add `app/[locale]` routes, `defineRouting`, `createNavigation`, and `proxy.ts` with `localePrefix: 'always'`.
   - Pros: Aligns with user constraints, keeps `/en` and `/es` explicit, centralizes SEO alternates/sitemap path generation, reduces custom routing code.
   - Cons: Requires route migration from `/` to localized segments and introduces translation/message plumbing early.
   - Effort: Medium

2. **Manual locale segment without next-intl routing helpers** — Use raw App Router params and custom metadata/link generation.
   - Pros: Fewer library abstractions and slightly smaller dependency surface.
   - Cons: Rebuilds routing/SEO helpers the chosen library already solves, higher risk of inconsistent links/hreflang/sitemap behavior, weaker path ergonomics for future phases.
   - Effort: Medium/High

### Recommendation

Use **next-intl routing-first architecture** with `localePrefix: 'always'`, `app/[locale]` pages, a root `proxy.ts`, and shared routing/navigation helpers. That matches the required `/en` and `/es` URLs, fits Next.js 16 App Router patterns, and gives one source of truth for locale-aware links, metadata alternates, and sitemap generation.

### Risks

- Route migration changes the current `/` contract; Phase 1 should explicitly decide whether `/` redirects to `/en` and whether it remains indexable.
- Next.js 16 async `params` affect localized `layout.tsx`, `page.tsx`, and `generateMetadata`; incorrect typing will cause avoidable implementation churn.
- E2E tests currently assume `/`; they must be updated carefully to avoid false positives while localized routing is introduced.
- Missing message structure conventions now can create churn in later phases when the hub expands beyond placeholder content.

### Ready for Proposal

Yes — tell the user Phase 1 is well-bounded. The proposal should lock three migration decisions up front: `/` redirect behavior, localized message file structure, and whether localized route pages ship as lightweight content skeletons or fuller descriptive hub sections in this phase.
