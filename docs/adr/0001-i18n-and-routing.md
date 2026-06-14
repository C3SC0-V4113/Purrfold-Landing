# ADR 0001: i18n and routing for Phase 1 localized landing

## Status

Proposed

## Context

Phase 1 introduces bilingual EN/ES routing for the landing. The current app is English-only, rooted at `/`, and has no request-time locale negotiation, no prefixed locale URLs, no localized metadata, and no shared route source for hreflang or sitemap generation.

The Phase 1 scope requires:

- Locale-prefixed routes at `/en` and `/es` plus localized deep routes.
- Root negotiation from `/` based on `Accept-Language`.
- Unsupported locale fallback preserving the remaining path when possible.
- Localized metadata, alternates, and sitemap coverage.
- A lightweight implementation that stays App Router-first and server-first.

## Decision

Adopt `next-intl` as the i18n routing foundation with `localePrefix: 'always'`, plus a single project-level `proxy.ts` that owns locale negotiation and unsupported-locale normalization.

The implementation will:

1. Keep public content under `app/[locale]`.
2. Use `proxy.ts` as the only redirect authority for `/` negotiation and unsupported locale fallback.
3. Centralize locale constants, route definitions, alternates, and route path helpers in `i18n/routing.ts`.
4. Generate metadata and sitemap entries from the same route source of truth.
5. Keep Spanish artifact copy neutral, professional, and free from country-specific idioms.

## Options Considered

### Option A: `next-intl`

- App Router-native routing support.
- Good compatibility with locale-prefixed navigation patterns.
- Clear separation between routing config and request config.
- Minimal custom code when paired with a focused proxy.

### Option B: `next-i18next`

- Mature ecosystem.
- More historical usage in Pages Router-era apps.
- Less aligned with the App Router-first shape of this project.

### Option C: Manual routing and JSON dictionaries only

- Lowest dependency surface.
- Highest risk of duplicated locale rules across proxy, pages, metadata, and sitemap.
- Easier to drift over time as localized routes expand.

## Rationale

`next-intl` gives the team a routing-aware foundation that fits Next.js App Router and keeps locale behavior explicit. The project still benefits from lightweight local copy files, but route ownership, locale validation, and future navigation concerns remain centralized instead of being duplicated across features.

Using a dedicated `proxy.ts` also keeps redirect logic in one place, which reduces loop risk and makes the redirect rules easier to test.

## Consequences

### Positive

- Locale URLs stay explicit and SEO-friendly.
- Routing, alternates, metadata, and sitemap can share one contract.
- Phase 1 stays small while still preparing for future locale growth.

### Negative

- Adds `next-intl` as a dependency.
- Introduces one more cross-cutting configuration surface (`proxy.ts`, request config, routing config).

## Risks

- Redirect logic can regress if proxy rules drift from route helpers.
- Root layout remains the only `<html>` owner in App Router, so locale-sensitive document-level behavior must stay deliberate.
- Production metadata quality depends on setting the correct public site URL.

## Follow-up

- Mark this ADR as Accepted when the Phase 1 implementation lands and verification passes.
