# Delta for Main Landing Hub

New `landing-hub-content` (ADDED) and modified `design-shell-navigation` (MODIFIED foundations). Phase 2 shell stays untouched; Phase 3 enriches only the `/[locale]` home page.

## ADDED Requirements

### Requirement: Landing Hero

The system MUST render a hero section on the localized home page with an eyebrow, a title, a description explaining what Purrfold is, and a primary CTA button linking to the install route.

#### Scenario: EN hero renders

- GIVEN a visitor on `/en`
- WHEN the home page renders
- THEN the hero shows EN eyebrow, title, description, and a CTA to `/en/install`

#### Scenario: ES hero renders

- GIVEN a visitor on `/es`
- WHEN the home page renders
- THEN the hero shows ES eyebrow, title, description, and a CTA to `/es/install`

### Requirement: Quick Install Selector

The system MUST render a shadcn `Tabs` with a CLI tab and an Agent tab. The CLI tab MUST display `npx purrfold@latest <project-directory>`. The Agent tab MUST display a natural-language install prompt. Each tab MUST expose a copy-to-clipboard button that copies the active tab content and reports success without navigating away.

#### Scenario: CLI tab is default

- GIVEN a visitor on a localized home
- WHEN the install selector renders
- THEN the CLI tab is active and displays the `npx` command

#### Scenario: Switch to Agent tab

- GIVEN the CLI tab is active
- WHEN the visitor activates the Agent tab
- THEN the Agent tab content replaces the CLI content

#### Scenario: Copy button copies active content

- GIVEN a tab is active and `navigator.clipboard` is available
- WHEN the visitor clicks the copy button
- THEN the active tab text is written to the clipboard and a success state is shown

#### Scenario: Copy fallback when clipboard unavailable

- GIVEN `navigator.clipboard` is unavailable
- WHEN the visitor clicks the copy button
- THEN the command text remains visible and no uncaught error is thrown

### Requirement: Summary Cards

The system MUST render four `Card` components linking to `/install`, `/skills`, `/quality`, and `/ecosystem` under the current locale, each with `CardHeader`, `CardTitle`, `CardDescription`, and a localized navigable link.

#### Scenario: Cards link to deep views

- GIVEN the localized home page
- WHEN the summary grid renders
- THEN four cards appear with locale-prefixed hrefs to install, skills, quality, and ecosystem

#### Scenario: Card navigation preserves locale

- GIVEN a visitor on `/es`
- WHEN a summary card is followed
- THEN the destination is `/es/{route}` for that card

### Requirement: Roadmap Section

The system MUST render a roadmap list with Next.js as current and Astro, Vite, and TanStack Start as future, using `Badge` for status.

#### Scenario: Roadmap shows shipped and future frameworks

- GIVEN the localized home page
- WHEN the roadmap section renders
- THEN Next.js appears as shipped and Astro, Vite, TanStack Start appear as future

### Requirement: Bilingual Hub Content

The system MUST source all hero, tab, card, roadmap, and foundations copy from `messages/en.json` and `messages/es.json`. No hard-coded user-facing copy is allowed.

#### Scenario: ES copy is neutral professional Spanish

- GIVEN the `messages/es.json` hub keys
- WHEN the ES home renders
- THEN copy is neutral professional Spanish without country-specific idioms

## MODIFIED Requirements

### Requirement: Home foundations links

The system MUST render shadcn and Next.js as visual card-style external links in the home foundations section, each with `target="_blank"` and `rel="noreferrer noopener"`, with localized copy from `messages/*.json`.

(Previously: shadcn and Next.js were plain references in a home foundations section with localized copy.)

#### Scenario: Home page owns secondary external references

- GIVEN the localized home page
- WHEN the foundations section is rendered
- THEN shadcn and Next.js links are present there
- AND each href matches the documented external destination

#### Scenario: Foundations links are safe external anchors

- GIVEN a foundations card link
- WHEN its anchor attributes are inspected
- THEN it opens in a new tab with `rel="noreferrer noopener"`

#### Scenario: ES foundations copy is localized

- GIVEN a visitor on `/es`
- WHEN the foundations section renders
- THEN shadcn and Next.js labels use ES copy from `messages/es.json`
