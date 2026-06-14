# localized-seo-metadata Specification

## Purpose

Define Phase 1 localized SEO behavior for EN/ES routes using `next-intl` as the routing-aware internationalization source.

## Requirements

### Requirement: Locale-specific metadata

The system MUST generate localized metadata for Phase 1 routes, including locale-appropriate titles and descriptions for EN and ES pages.

#### Scenario: English metadata is localized

- GIVEN a request for `/en/install`
- WHEN metadata is generated
- THEN the title and description are emitted in English for that route

#### Scenario: Spanish metadata is localized

- GIVEN a request for `/es/install`
- WHEN metadata is generated
- THEN the title and description are emitted in Spanish for that route

### Requirement: Alternates and hreflang mapping

The system MUST publish localized alternates and hreflang relationships for each Phase 1 route so EN and ES variants reference each other.

#### Scenario: Deep route exposes alternates

- GIVEN a request for `/en/skills`
- WHEN metadata is generated
- THEN alternates include the `/es/skills` equivalent with hreflang mappings for EN and ES

#### Scenario: Home route exposes alternates

- GIVEN a request for `/es`
- WHEN metadata is generated
- THEN alternates include the `/en` equivalent with hreflang mappings for EN and ES

### Requirement: Localized sitemap coverage

The system MUST include `/en`, `/es`, and the localized Install, Skills, Quality, and Ecosystem routes in the sitemap for Phase 1, and SHOULD keep sitemap generation aligned with the same locale routing source of truth.

#### Scenario: Sitemap includes localized homes

- GIVEN the sitemap is generated
- WHEN Phase 1 routes are collected
- THEN entries include both `/en` and `/es`

#### Scenario: Sitemap includes localized deep routes

- GIVEN the sitemap is generated
- WHEN Phase 1 routes are collected
- THEN entries include localized Install, Skills, Quality, and Ecosystem paths for both locales
