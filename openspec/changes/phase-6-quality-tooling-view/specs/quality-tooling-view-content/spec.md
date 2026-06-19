# Quality Tooling View Content Specification

## Purpose

The `/[locale]/quality` view SHALL explain Purrfold's sane default quality stack, why it exists, and which optional tools are enabled by install flags. It MUST help users understand quality signals without changing install behavior or becoming a full tooling catalog.

## Requirements

### Requirement: Quality stack value proposition

The system MUST present the quality page as a concise explanation of the defaults Purrfold installs to catch regressions early, protect review confidence, and make project health visible.

#### Scenario: User reads page purpose

- GIVEN a visitor opens `/en/quality` or `/es/quality`
- WHEN the page renders
- THEN it explains why quality tooling exists in the selected locale
- AND it distinguishes default tooling from optional additions

#### Scenario: Non-goal content stays absent

- GIVEN the quality page renders
- WHEN the visitor reviews the content
- THEN it MUST NOT describe CLI installation flow changes
- AND it MUST NOT present an exhaustive tooling catalog or interactive demos

### Requirement: Ordered signal sections

The system MUST organize quality tooling by signal type in this exact order: quality gates, commit hygiene, CI confidence, runtime insight.

#### Scenario: Required order is visible

- GIVEN the quality page renders
- WHEN section headings are read from top to bottom
- THEN they appear as quality gates, commit hygiene, CI confidence, runtime insight

#### Scenario: Optional category is unavailable

- GIVEN a tool does not fit one of the four signal sections
- WHEN content is authored
- THEN the system SHOULD omit it instead of adding another section

### Requirement: Default and optional tooling mapping

The system MUST label React Doctor and React Scan as default quality-gate tools. It MUST label Vitest, commitlint, and Playwright as optional tools with their enabling flags: Vitest `--unit`, commitlint `--commitlint`, Playwright `--e2e`.

#### Scenario: Optional flag mapping is explicit

- GIVEN the page lists optional tooling
- WHEN the visitor reads Vitest, commitlint, or Playwright entries
- THEN each entry shows its optional status and exact enabling flag

#### Scenario: Default tools are not confused with flags

- GIVEN the page lists React Doctor or React Scan
- WHEN the visitor reads their entries
- THEN each is described as part of the default quality stack
- AND no optional enablement flag is shown for them

### Requirement: Locale-driven bilingual copy

The system MUST render equivalent English and Spanish content from locale-driven copy. Spanish copy SHALL be neutral/professional and preserve tool names, flags, and official product terminology.

#### Scenario: English route uses English copy

- GIVEN a visitor opens `/en/quality`
- WHEN the page renders
- THEN headings, utility copy, and labels appear in English

#### Scenario: Spanish route uses Spanish copy

- GIVEN a visitor opens `/es/quality`
- WHEN the page renders
- THEN headings, utility copy, and labels appear in Spanish
- AND flags such as `--unit`, `--commitlint`, and `--e2e` remain unchanged

### Requirement: Official external link safety

The system MUST link only to official documentation or official project sources for referenced tools. External links SHALL be rendered safely for new-tab navigation.

#### Scenario: Official links are used

- GIVEN a tooling entry includes a link
- WHEN the link target is inspected
- THEN it points to an official source for that tool

#### Scenario: External links are safe

- GIVEN an external official link renders
- WHEN its attributes are inspected
- THEN it opens safely without giving the destination opener access
