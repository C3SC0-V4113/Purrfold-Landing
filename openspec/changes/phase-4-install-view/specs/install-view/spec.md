# Delta for install-view

> Phase 4 replaces the placeholder `/[locale]/install` page (single `PageShell` card) with a sectioned install guide. No prior spec exists for this domain, so all requirements are ADDED.

## ADDED Requirements

### Requirement: Unified CLI/Agent Tabs

The install page MUST render a `Tabs` component with exactly two tabs: CLI and Agent. Switching tabs MUST update all content below the tabs (configurator and generated output) and MUST preserve current flag selections.

#### Scenario: Tab switching updates content

- GIVEN the visitor is on the CLI tab
- WHEN they select the Agent tab
- THEN the generated output switches from the CLI command to the agent prompt
- AND the configurator remains visible with prior selections

#### Scenario: Switching back restores CLI output

- GIVEN the visitor is on the Agent tab
- WHEN they select the CLI tab
- THEN the generated output shows the CLI command derived from current flags

### Requirement: Interactive Flag Configurator

Below the tabs, the page MUST render a configurable form using shadcn primitives: boolean flags via `Checkbox`/`Switch` for `--unit`, `--e2e`, `--commitlint`, `--mcp`, `--yes`; choice flags via `Select` for `--pm` (npm|pnpm|bun) and `--icons` (lucide|phosphor|tabler); and a custom value via `Input` for `--shadcn-args`. The configurator MUST be collapsible via shadcn `Collapsible`. Default values MUST be unit=on, e2e=off, commitlint=off, mcp=off, yes=on, pm=npm, icons=lucide.

#### Scenario: Default flags render correctly

- GIVEN the install page loads for the first time
- WHEN the configurator renders
- THEN unit and yes are enabled and e2e, commitlint, mcp are disabled
- AND pm shows npm and icons shows lucide

#### Scenario: Toggling a boolean flag updates output

- GIVEN the CLI tab is active with defaults
- WHEN the visitor enables --e2e
- THEN the generated command includes `--e2e` and omits `--no-e2e`

#### Scenario: Selecting a choice flag updates output

- GIVEN the CLI tab is active with defaults
- WHEN the visitor selects pnpm for --pm
- THEN the generated command reflects the pnpm selection

#### Scenario: Custom preset value is appended

- GIVEN the CLI tab is active
- WHEN the visitor enters `--preset b3REw8vwo` in the shadcn-args input
- THEN the generated command includes the preset argument

#### Scenario: Configurator collapses and expands

- GIVEN the configurator is expanded
- WHEN the visitor toggles the Collapsible trigger
- THEN the configurator content hides without losing selections

### Requirement: Live Generated Output

Below the configurator, the page MUST render a live preview block that updates in real time as options change. The CLI tab MUST show `npx purrfold@latest <project-directory> [selected flags]`; the Agent tab MUST show a natural-language prompt describing the selected setup. The output MUST use `ScrollArea` + `CopyButton`.

#### Scenario: Output updates as options change

- GIVEN the CLI tab is active
- WHEN any flag toggles or select changes
- THEN the output block re-renders the command without a full page reload

#### Scenario: Copy button copies generated output

- GIVEN the output block is visible
- WHEN the visitor activates the CopyButton
- THEN `navigator.clipboard.writeText` receives the current generated text
- AND the button shows success feedback

#### Scenario: Clipboard fallback

- GIVEN `navigator.clipboard` is unavailable
- WHEN the visitor activates the CopyButton
- THEN the copy action fails gracefully without throwing

### Requirement: Flags Reference Table

The page MUST render a static reference table listing all available flags (`--unit`/`--no-unit`, `--e2e`/`--no-e2e`, `--commitlint`/`--no-commitlint`, `--shadcn-args`, `--pm`, `--mcp`/`--no-mcp`, `--icons`, `--yes`, `--dry-run`) with localized descriptions.

#### Scenario: Reference table renders all flags

- GIVEN the install page renders
- WHEN the flags reference section is inspected
- THEN every documented flag appears with a localized description

### Requirement: Preset Example

The page MUST render a code block showing `npx purrfold@latest my-app --shadcn-args --preset b3REw8vwo --yes` with a localized explanation of preset usage.

#### Scenario: Preset example renders

- GIVEN the install page renders
- WHEN the preset section is inspected
- THEN the code block shows the documented command
- AND a localized explanation follows

### Requirement: Bilingual Content

All install page copy MUST flow through `messages/en.json` and `messages/es.json`. Spanish copy MUST be neutral/professional with no country-specific idioms. No hardcoded user-facing strings are permitted.

#### Scenario: EN rendering

- GIVEN the visitor is on `/en/install`
- WHEN the page renders
- THEN all headings, labels, flag descriptions, and explanations use EN messages

#### Scenario: ES rendering

- GIVEN the visitor is on `/es/install`
- WHEN the page renders
- THEN all headings, labels, flag descriptions, and explanations use ES messages
- AND the Spanish copy is neutral/professional

#### Scenario: No hardcoded strings

- GIVEN the install page source is inspected
- WHEN user-facing text is searched
- THEN every string resolves through `getMessages(locale).Pages.install.*`

### Requirement: External Link Safety

Any external links on the install page (e.g. canonical flags source) MUST open in a new tab with safe `rel` attributes.

#### Scenario: External link is safe

- GIVEN an external link is rendered on the install page
- WHEN its attributes are inspected
- THEN it has `target="_blank"` and `rel` containing `noreferrer noopener`
