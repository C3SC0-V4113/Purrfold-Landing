# localized-routing Specification

## Purpose

Define Phase 1 locale-prefixed routing, root negotiation, fallback redirects, and locale-preserving navigation for EN and ES.

## Requirements

### Requirement: Locale-prefixed route map

The system MUST expose `/en`, `/es`, `/[locale]/install`, `/[locale]/skills`, `/[locale]/quality`, and `/[locale]/ecosystem` for supported locales `en` and `es`.

#### Scenario: Supported localized route resolves

- GIVEN a request for `/es/skills`
- WHEN the route is matched
- THEN the Spanish Skills page is served

#### Scenario: Unsupported locale preserves path

- GIVEN a request for `/fr/install`
- WHEN the locale is unsupported
- THEN the request is redirected to `/en/install`

### Requirement: Root locale negotiation

The system MUST redirect `/` using request-time locale negotiation: Spanish to `/es`, English to `/en`, and unknown or other locales to `/en`.

#### Scenario: Spanish request lands on Spanish home

- GIVEN a request for `/` with a Spanish locale preference
- WHEN locale negotiation runs
- THEN the response redirects to `/es`

#### Scenario: Unknown locale defaults to English

- GIVEN a request for `/` with no supported locale preference
- WHEN locale negotiation runs
- THEN the response redirects to `/en`

### Requirement: Locale switch preserves current path

The system MUST let users switch between `en` and `es` while preserving the current Phase 1 path when an equivalent route exists.

#### Scenario: Switch preserves deep route

- GIVEN a user is on `/es/install`
- WHEN the user switches to English
- THEN navigation goes to `/en/install`

#### Scenario: Switch preserves home route

- GIVEN a user is on `/en`
- WHEN the user switches to Spanish
- THEN navigation goes to `/es`

### Requirement: Routing decision record and baseline verification

The project MUST include `docs/adr/0001-i18n-and-routing.md` describing the Phase 1 choice of `next-intl` with locale-prefixed routing, and MUST verify `/en` and `/es` through automated tests and later quality gates.

#### Scenario: ADR is required for the routing choice

- GIVEN the Phase 1 routing architecture is introduced
- WHEN the change is documented
- THEN `docs/adr/0001-i18n-and-routing.md` exists and records the routing/i18n decision

#### Scenario: Routing coverage is exercised

- GIVEN Phase 1 localized routing is implemented
- WHEN verification runs
- THEN unit coverage renders EN and ES pages, E2E coverage exercises `/en` and `/es`, and later gates include `npm run check` and `npm run test:e2e`
