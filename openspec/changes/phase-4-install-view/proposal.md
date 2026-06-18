# Proposal: Phase 4 — Install View

## Intent

Replace the placeholder `/[locale]/install` page with a detailed installation guide. The current page is a thin `PageShell` with a single card — it does not explain CLI usage, agent-driven scaffolding, available flags, or preset workflows. Visitors need actionable install documentation in both EN and ES.

## Scope

### In Scope

- **Unified CLI/Agent tabs**: `Tabs` component switching between CLI and Agent views. Switching tabs updates all content below.
- **Interactive flag configurator (playground)**: shadcn `Checkbox`/`Switch` for boolean flags (`--unit`, `--e2e`, `--commitlint`, `--mcp`, `--yes`), shadcn `Select` for choice flags (`--pm`, `--icons`), and shadcn `Input` for custom values (`--shadcn-args <preset>`). Wrapped in shadcn `Card` or `Collapsible`.
- **Live generated output**: below the configurator, a real-time preview of the CLI command or agent prompt built from the selected options, with `ScrollArea` + `CopyButton`.
- **Flags reference**: structured table or list covering `--unit`/`--no-unit`, `--e2e`/`--no-e2e`, `--commitlint`/`--no-commitlint`, `--shadcn-args <args...>`, `--pm`, `--mcp`/`--no-mcp`, `--icons`, `--yes`, `--dry-run`.
- **Preset example**: code block showing `npx purrfold@latest my-app --shadcn-args --preset b3REw8vwo --yes` with brief explanation.
- **Bilingual copy**: all new strings in `messages/en.json` and `messages/es.json` (neutral/professional Spanish).

### Out of Scope

- Video or animated terminal recordings.
- Modifications to the navigation shell or other routes.
- New shadcn component installs (all required components already available).
- Framer Motion or JS animation libraries.

## Capabilities

### New Capabilities

- `install-view-content`: CLI install section, agent install section, flags reference table, preset example, and associated bilingual copy for the `/[locale]/install` route.

### Modified Capabilities

None

## Approach

Expand `app/[locale]/install/page.tsx` from a single-card placeholder into a composed layout inside the existing `PageShell`. Each section is a focused component or inline block:

- **CLI section**: reuses the `ScrollArea` + `CopyButton` pattern from `QuickInstall`.
- **Agent section**: same pattern with a longer prompt block.
- **Flags reference**: semantic HTML table or definition list, styled with Tailwind tokens.
- **Preset example**: code block with `ScrollArea` + `CopyButton`.

All user-facing strings flow through `getMessages(locale).Pages.install.*`. The page remains a server component; only `CopyButton` is a client island. CSS-only transitions respect `prefers-reduced-motion`.

## Affected Areas

| Area                            | Impact   | Description                                          |
| ------------------------------- | -------- | ---------------------------------------------------- |
| `app/[locale]/install/page.tsx` | Modified | Replace placeholder with sectioned install guide     |
| `messages/en.json`              | Modified | Add install section keys (CLI, agent, flags, preset) |
| `messages/es.json`              | Modified | Spanish translations for install section keys        |
| `messages/en.d.json.ts`         | Modified | Type declarations for new keys                       |
| `tests/unit/`                   | New      | Install page component tests (TDD)                   |
| `tests/e2e/`                    | New      | Install page render + clipboard E2E                  |

## Risks

| Risk                                     | Likelihood | Mitigation                                                                        |
| ---------------------------------------- | ---------- | --------------------------------------------------------------------------------- |
| Flags table becomes stale if CLI changes | Low        | Keep flags aligned with purrfold npm README; add note linking to canonical source |
| Page exceeds 400-line review budget      | Low        | Sections are small; flags table is the largest block                              |

## Rollback Plan

Revert `app/[locale]/install/page.tsx` to the current single-card placeholder. Remove new message keys from `messages/*.json`. Remove associated tests.

## Dependencies

- Existing components: `PageShell`, `CopyButton`, `ScrollArea`, `Card`, `Badge`, `Separator`.
- `getMessages` from `@/i18n/messages` for localized copy.
- `navigator.clipboard` API (graceful fallback in `CopyButton`).

## Success Criteria

- [ ] Install page renders CLI section, agent section, flags reference, and preset example.
- [ ] All code blocks display correct content with working copy-to-clipboard.
- [ ] EN and ES content renders correctly with no hardcoded strings.
- [ ] `prefers-reduced-motion` disables CSS transitions.
- [ ] Unit tests cover each section (TDD: red → green).
- [ ] E2E covers page render and clipboard interaction.
- [ ] `npm run lint`, `typecheck`, `format:check`, `test`, `doctor`, and `check` pass.
