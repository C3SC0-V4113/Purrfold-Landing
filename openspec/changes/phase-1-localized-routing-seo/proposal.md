# Proposal: Phase 1 Localized Routing SEO

## Intent

Introduce bilingual EN/ES routing and SEO so the landing works as a locale-aware entrypoint for agent-driven installation, while keeping the CLI easy to reach. Fix the current English-only root, missing locale negotiation, and lack of localized metadata, alternates, and sitemap support.

## Scope

### In Scope

- Add request-time locale negotiation at `/` with redirects: Spanish → `/es`, English/unknown/other → `/en`.
- Add localized App Router paths: `/[locale]`, `/[locale]/install`, `/[locale]/skills`, `/[locale]/quality`, `/[locale]/ecosystem`.
- Add `next-intl` routing, locale-aware navigation, localized metadata/titles/descriptions, hreflang/alternates, sitemap inputs, and unsupported-locale fallback preserving the remaining path when possible.
- Phase 1 deep routes ship with minimal useful placeholders: title, short description, and navigation context/CTA.
- Record ADR `docs/adr/0001-i18n-and-routing.md` for choosing `next-intl` over `next-i18next`.

### Out of Scope

- Full marketing copy expansion for deep pages.
- CSS-only animation enhancements or any Framer/Motion work.
- Non-EN/ES locales.

## Capabilities

### New Capabilities

- `localized-routing`: Locale-prefixed routes, root negotiation, and unsupported-locale fallback behavior.
- `localized-landing-content`: Bilingual hub and placeholder deep-route content with sober locale-specific tone.
- `localized-seo-metadata`: Locale-specific metadata, hreflang/alternates, and sitemap coverage.

### Modified Capabilities

- None.

## Approach

Adopt `next-intl` with App Router-first routing (`/[locale]`), centralized routing helpers, and request-time locale negotiation. Keep the root as redirect-only, move content under locale segments, and generate locale-aware metadata/sitemap from one routing source of truth.

## Affected Areas

| Area                                | Impact   | Description                                   |
| ----------------------------------- | -------- | --------------------------------------------- |
| `package.json`                      | Modified | Add `next-intl`.                              |
| `app/page.tsx`                      | Modified | Root redirect handoff.                        |
| `app/[locale]/**`                   | New      | Localized hub, deep routes, layout, metadata. |
| `proxy.ts`                          | New      | Locale negotiation and fallback entrypoint.   |
| `messages/*.json`                   | New      | EN/ES translations.                           |
| `app/sitemap.ts`                    | New      | Localized sitemap entries.                    |
| `docs/adr/0001-i18n-and-routing.md` | New      | Durable routing/i18n decision record.         |
| `tests/unit/**`, `tests/e2e/**`     | Modified | Locale render and `/en` `/es` coverage.       |

## Risks

| Risk                                     | Likelihood | Mitigation                                                                  |
| ---------------------------------------- | ---------- | --------------------------------------------------------------------------- |
| Redirect loops or wrong locale detection | Med        | Centralize routing rules and verify `/`, `/en`, `/es`, unsupported locales. |
| Metadata/hreflang drift across pages     | Med        | Derive alternates and titles from shared locale routing config.             |

## Rollback Plan

Remove locale routing/proxy, restore single-language root page, remove `next-intl`, and revert sitemap/metadata changes to the current English-only setup.

## Dependencies

- `next-intl` compatible with Next.js 16 App Router.

## Success Criteria

- [ ] `/` redirects server-side to `/es` for Spanish and `/en` otherwise.
- [ ] `/en` and `/es` load with localized hub content and preserved-path locale switching.
- [ ] Deep localized routes exist with minimal placeholder content.
- [ ] Locale-specific titles/descriptions, alternates/hreflang, and sitemap entries exist for Phase 1 routes.
- [ ] Test plan is enabled for locale render coverage and `/en` `/es` E2E coverage.
