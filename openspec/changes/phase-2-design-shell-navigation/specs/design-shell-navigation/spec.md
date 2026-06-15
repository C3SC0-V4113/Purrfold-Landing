# Design Shell Navigation Specification

## Purpose

Define Phase 2 shell navigation behavior, motion limits, documentation boundaries, and verification for the localized landing.

## Requirements

### Requirement: Desktop primary navigation menu

The system MUST render desktop primary navigation with shadcn `NavigationMenu`, preserve localized internal routes, and keep active-page indication for the current route.

#### Scenario: Desktop nav renders localized links

- GIVEN a visitor on `/en` or `/es`
- WHEN the desktop header is visible
- THEN the primary nav uses `NavigationMenu` links for home, install, skills, quality, and ecosystem
- AND each link targets the current locale path

#### Scenario: Active route remains visible

- GIVEN a visitor on a localized deep route
- WHEN the matching desktop nav item is rendered
- THEN that item exposes the active state with `aria-current="page"`

### Requirement: Mobile sheet navigation accessibility

The system MUST keep mobile navigation in a `Sheet`, with an accessible open trigger, close control, title, and predictable open/close behavior.

#### Scenario: Mobile sheet opens and closes

- GIVEN a mobile viewport on a localized page
- WHEN the visitor opens the menu and then closes it
- THEN the sheet becomes visible and then hidden without losing the current page

#### Scenario: Mobile sheet exposes accessible labels

- GIVEN a screen-reader or role-based test
- WHEN mobile navigation is inspected
- THEN the open trigger, close control, and sheet title are discoverable by accessible name

### Requirement: External link placement and safety

The system MUST keep GitHub as the only navbar external action, show it with an icon affordance, and open it with safe external-link attributes.

#### Scenario: Navbar exposes GitHub only

- GIVEN the desktop or mobile header
- WHEN external actions are rendered
- THEN GitHub appears in the navbar
- AND shadcn and Next.js do not appear there

#### Scenario: External action is safe

- GIVEN the GitHub navbar link
- WHEN its attributes are inspected
- THEN it opens in a new tab
- AND it includes safe external-link rel attributes

### Requirement: Home foundations links

The system MUST move shadcn and Next.js external references into a home foundations section with localized copy.

#### Scenario: Home page owns secondary external references

- GIVEN the localized home page
- WHEN the foundations section is rendered
- THEN shadcn and Next.js links are present there
- AND each href matches the documented external destination

### Requirement: Theme and language controls preserve context

The system MUST preserve current ThemeSwitcher behavior and MUST switch languages by keeping the current path, query string, and hash.

#### Scenario: Theme selection remains functional

- GIVEN a visitor changes theme from the dropdown
- WHEN a theme option is selected
- THEN the selected theme state updates without changing the current route

#### Scenario: Locale switch preserves deep location

- GIVEN a visitor on a localized deep route with query or hash
- WHEN they switch language
- THEN the destination keeps the same path intent, search params, and hash under the target locale

### Requirement: Minimal motion tokens respect reduced motion

The system MUST define only minimal shell animation tokens in `app/globals.css` and MUST disable motion-dependent behavior when reduced motion is requested.

#### Scenario: Standard motion uses shared tokens

- GIVEN a motion-safe environment
- WHEN shell UI applies entrance or reveal motion
- THEN it uses shared CSS tokens defined in `app/globals.css`

#### Scenario: Reduced motion disables extra animation

- GIVEN `prefers-reduced-motion: reduce`
- WHEN shell UI renders
- THEN reduced-motion rules suppress non-essential animation

### Requirement: Documentation and verification stay aligned

The system MUST record design-system boundaries in `docs/adr/0002-design-system-boundaries.md`, align ADR 0001 status if Phase 1 is shipped, document enabled shadcn MCP in `AGENTS.md` and `README.md`, and verify the change with unit tests, mobile/external-link E2E, and `npm run check`.

#### Scenario: Durable docs are updated

- GIVEN the Phase 2 planning artifacts
- WHEN documentation is reviewed
- THEN ADR 0002 exists, ADR 0001 status is aligned if needed, and shadcn MCP guidance references repo-level `opencode.json`

#### Scenario: Verification covers controls and navigation

- GIVEN the implemented change
- WHEN verification runs
- THEN unit tests cover theme and language controls
- AND E2E covers mobile sheet behavior and external href placement
- AND `npm run check` passes
