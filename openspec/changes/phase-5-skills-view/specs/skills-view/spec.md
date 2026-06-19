# Skills View Specification

## Purpose

Define the localized `/[locale]/skills` page behavior for presenting all skills with equal weight, short utility examples, and safe source-appropriate references.

## Requirements

### Requirement: Skills overview philosophy

The system MUST render a skills overview section that explains that every skill solves a different problem and that the page shows where each skill fits.

#### Scenario: EN overview renders

- GIVEN a visitor opens `/en/skills`
- WHEN the page renders
- THEN the overview heading explains the equal-weight skills philosophy
- AND the overview copy explains the page shows fit, utility, and examples

#### Scenario: ES overview renders

- GIVEN a visitor opens `/es/skills`
- WHEN the page renders
- THEN the overview content is shown in Spanish
- AND no user-facing skills copy is hardcoded outside locale messages

### Requirement: Categorized skills list

The system MUST display the full skills catalog as categorized entries. Each entry MUST show name, purpose, when-it-helps copy, an example of utility, and a source badge.

#### Scenario: EN page shows all skills

- GIVEN a visitor opens a localized skills page
- WHEN the skills list renders
- THEN all skills are visible by name
- AND each visible skill includes purpose, when-it-helps copy, and an example

#### Scenario: Skills are grouped by category

- GIVEN the skills list renders
- WHEN the visitor scans the page
- THEN skills are organized under category groups
- AND each skill exposes its category through visible grouping or label text

### Requirement: Local versus skills.sh source distinction

The system MUST derive source labels from `skills-lock.json`. Skills present in the lockfile MUST be labeled `skills.sh`; project-authored skills MUST be labeled `Local`.

The system MUST label `react-doctor` with a dedicated React Doctor tag instead of `Local` or `skills.sh`.

#### Scenario: Source distinction is visible

- GIVEN a visitor opens a localized skills page
- WHEN the skills list renders
- THEN each skill entry shows either a Local or skills.sh source label
- AND the distinction is visible without opening external links

#### Scenario: skills.sh links use source-appropriate URLs

- GIVEN a skills.sh-backed skill entry renders
- WHEN its external link is inspected
- THEN it points to the skill's skills.sh source page
- AND it uses safe external-link attributes

### Requirement: Localized content source

The system MUST source all user-facing skills-page copy from `messages/en.json` and `messages/es.json`. The system MUST NOT add new routes, shell changes, animation libraries, featured sections, or full tutorials for this capability.

#### Scenario: Bilingual messages drive copy

- GIVEN `/en/skills` and `/es/skills` render
- WHEN localized text is compared
- THEN English copy comes from `messages/en.json`
- AND Spanish copy comes from `messages/es.json`

#### Scenario: Non-goals remain excluded

- GIVEN the skills view is implemented
- WHEN routes, shell behavior, animation dependencies, and content depth are reviewed
- THEN no new route or shell behavior is added
- AND no animation library or full tutorial content is introduced
