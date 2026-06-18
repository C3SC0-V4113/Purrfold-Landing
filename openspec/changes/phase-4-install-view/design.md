# Design: Phase 4 — Install View

## Technical Approach

Expand the placeholder `/[locale]/install` page into a composed layout inside the existing `PageShell`. A single `'use client'` orchestrator (`InstallView`) owns tab selection and flag state, rendering the interactive configurator and live output. Static sections (`FlagsReference`, `PresetExample`) remain server components rendered as children of the client boundary. All copy flows through `getMessages(locale).Pages.install.*`, extending the existing namespace. No new routes, no shell changes, no JS animation libraries.

## Architecture Decisions

| Decision          | Choice                                                                       | Alternatives                             | Rationale                                                                                                                                                                                |
| ----------------- | ---------------------------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page wrapper      | Keep `PageShell`                                                             | Drop it like the home hub                | Install is a deep page, not a hub. `PageShell` provides `BaseNavigation`, back-link, and card header. Children slot accepts arbitrary nodes.                                             |
| Client boundary   | Single `InstallView` orchestrator                                            | Separate state per sub-component         | Tabs, configurator, and output share tightly coupled state. One boundary avoids prop-drilling and redundant re-renders.                                                                  |
| Flag state model  | `useState<FlagState>` in `InstallView`                                       | `useReducer`, Zustand, URL search params | Five booleans + two selects + one text input. `useState` with a single object is sufficient. No cross-component sharing needed. URL params add complexity without value for a docs page. |
| Select primitive  | base-ui `Select` (existing)                                                  | Native HTML `<select>`                   | Project already uses base-ui select with shadcn styling. Consistent look and accessible keyboard nav.                                                                                    |
| Input for preset  | Add shadcn `input` component                                                 | Plain `<input>` with manual styling      | shadcn input provides consistent `data-slot`, focus ring, and token usage. One `npx shadcn@latest add input` call.                                                                       |
| Output generation | Pure function `buildCliCommand(flags)` / `buildAgentPrompt(flags, messages)` | Inline template literals in JSX          | Testable in isolation. Keeps render functions clean.                                                                                                                                     |
| Message namespace | Extend `Pages.install` with nested keys                                      | New top-level `InstallPage` namespace    | Preserves existing `t.title`, `t.description`, `t.routeLabel` used by `PageShell` and metadata. Avoids restructuring.                                                                    |

## Data Flow

```text
app/[locale]/install/page.tsx (server)
  └─ getMessages(locale).Pages.install
       ├─ PageShell ─── title, description, routeLabel (existing)
       └─ InstallView (client) ─── locale, messages
            ├─ useState<activeTab> ── 'cli' | 'agent'
            ├─ useState<FlagState> ── { unit, e2e, commitlint, mcp, yes, pm, icons, presetId }
            │
            ├─ Tabs ──────────── controlled by activeTab
            ├─ FlagConfigurator ── reads/writes FlagState via onChange
            ├─ GeneratedOutput ── receives buildCliCommand() or buildAgentPrompt()
            ├─ FlagsReference (server child) ── static table from messages
            └─ PresetExample (server child) ── static code block from messages
```

State flows down; events flow up. No context providers, no global state.

## File Changes

| File                                    | Action | Description                                                                       |
| --------------------------------------- | ------ | --------------------------------------------------------------------------------- |
| `components/ui/input.tsx`               | Create | `npx shadcn@latest add input` — needed for preset text field                      |
| `components/install-view.tsx`           | Create | `'use client'` orchestrator — owns tab + flag state, composes children            |
| `components/flag-configurator.tsx`      | Create | `'use client'` — Collapsible form with Checkbox, Select, Input controls           |
| `components/generated-output.tsx`       | Create | `'use client'` — live preview block with ScrollArea + CopyButton                  |
| `components/flags-reference.tsx`        | Create | Server component — static flag table from messages                                |
| `components/preset-example.tsx`         | Create | Server component — preset code block with ScrollArea + CopyButton                 |
| `lib/build-command.ts`                  | Create | Pure functions: `buildCliCommand(flags)`, `buildAgentPrompt(flags, messages)`     |
| `app/[locale]/install/page.tsx`         | Modify | Replace placeholder Card with `InstallView` + server children                     |
| `messages/en.json`                      | Modify | Add nested keys under `Pages.install` (tabs, configurator, output, flags, preset) |
| `messages/es.json`                      | Modify | Spanish equivalents — neutral/professional                                        |
| `messages/en.d.json.ts`                 | Auto   | Regenerated by next-intl on build                                                 |
| `tests/unit/build-command.test.ts`      | Create | Pure function tests for command generation                                        |
| `tests/unit/install-view.test.tsx`      | Create | Tab switching, default flags, output updates                                      |
| `tests/unit/flag-configurator.test.tsx` | Create | Toggle/select/input interactions                                                  |
| `tests/unit/generated-output.test.tsx`  | Create | Render output, CopyButton presence                                                |
| `tests/unit/flags-reference.test.tsx`   | Create | All flags rendered, EN/ES                                                         |
| `tests/unit/preset-example.test.tsx`    | Create | Code block content, CopyButton                                                    |
| `tests/unit/install-page.test.tsx`      | Create | Full page composition smoke test                                                  |
| `tests/e2e/install-view.spec.ts`        | Create | Interactive flow, clipboard, bilingual                                            |

## Interfaces / Contracts

### FlagState type

```ts
type FlagState = {
  unit: boolean; // default: true
  e2e: boolean; // default: false
  commitlint: boolean; // default: false
  mcp: boolean; // default: false
  yes: boolean; // default: true
  pm: 'npm' | 'pnpm' | 'bun'; // default: 'npm'
  icons: 'lucide' | 'phosphor' | 'tabler'; // default: 'lucide'
  presetId: string; // default: ''
};
```

### buildCliCommand / buildAgentPrompt

```ts
function buildCliCommand(flags: FlagState): string;
// → "npx purrfold@latest my-app --unit --no-e2e --pm pnpm --icons lucide --yes"
// Appends "--shadcn-args --preset <id>" when presetId is non-empty

function buildAgentPrompt(flags: FlagState, messages: InstallMessages): string;
// → Localized natural-language prompt describing the selected setup
```

### InstallView (client)

```tsx
'use client';
type InstallViewProps = { locale: Locale; messages: InstallPageMessages; children?: ReactNode };
// Renders: Tabs → FlagConfigurator → GeneratedOutput → {children}
```

### FlagConfigurator (client)

```tsx
type FlagConfiguratorProps = {
  flags: FlagState;
  onChange: (flags: FlagState) => void;
  messages: ConfiguratorMessages;
};
// Collapsible wrapper around Checkbox group, Select controls, Input field
```

### GeneratedOutput (client)

```tsx
type GeneratedOutputProps = { output: string; label: string };
// ScrollArea + <pre><code> + absolute CopyButton, animate-tab-enter on change
```

### Message shape (new keys under `Pages.install`)

```json
{
  "tabs": { "cli": "", "agent": "" },
  "configurator": {
    "title": "", "show": "", "hide": "",
    "unit": "", "e2e": "", "commitlint": "", "mcp": "", "yes": "",
    "pm": "", "pmNpm": "", "pmPnpm": "", "pmBun": "",
    "icons": "", "iconsLucide": "", "iconsPhosphor": "", "iconsTabler": "",
    "presetLabel": "", "presetPlaceholder": ""
  },
  "output": { "cliLabel": "", "agentLabel": "", "agentPromptTemplate": "" },
  "flagsReference": { "title": "", "flags": { "--unit": "", "--e2e": "", ... } },
  "preset": { "title": "", "description": "", "command": "" }
}
```

## Testing Strategy

| Layer                   | What                                                  | Approach                                                                    |
| ----------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------- |
| Unit (TDD: red → green) | `buildCliCommand` / `buildAgentPrompt` pure functions | Vitest — all flag combinations, edge cases (empty preset, all flags on/off) |
| Unit                    | Each component renders EN/ES, correct defaults        | Vitest + Testing Library, mock clipboard                                    |
| Unit                    | Flag toggle updates output                            | `fireEvent.click` checkbox → assert output text changes                     |
| Unit                    | Tab switching preserves flag state                    | Toggle flag → switch tab → switch back → assert flag persists               |
| Integration             | Full InstallView composition                          | Render with locale + messages, assert all sections present                  |
| E2E                     | Interactive flow, clipboard, bilingual                | Playwright Chromium — toggle flags, copy output, switch locale              |

Strict TDD: write failing tests before each component implementation.

## Migration / Rollout

No data migration. The install page is the only route affected. Rollback: revert `app/[locale]/install/page.tsx` to current placeholder Card, remove new components and message keys.

## Open Questions

- [ ] Verify base-ui `Select.Root` controlled API (`value` + `onValueChange` vs `onChange`) before implementing FlagConfigurator selects.
- [ ] Confirm whether `PageShell` children slot `text-muted-foreground` styling needs explicit override on interactive elements (checkboxes, selects render their own colors, so likely no conflict).
- [ ] Decide if the agent prompt should be a static message template with interpolation or a fully dynamic string built in `buildAgentPrompt`.
