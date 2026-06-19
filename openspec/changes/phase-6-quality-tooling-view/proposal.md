# Proposal: Phase 6 Quality Tooling View

## Intent

Replace the `/[locale]/quality` placeholder with a bilingual view that explains Purrfold’s default quality stack, why it ships by default, and where optional tooling is enabled.

## Scope

### In Scope

- Build a detailed `/[locale]/quality` page organized as: quality gates → commit hygiene → CI confidence → runtime insight.
- Add EN/ES copy that explains the default stack and marks optional tools with their enabling decision: Vitest `--unit`, commitlint `--commitlint`, Playwright `--e2e`.
- Present React Doctor and React Scan as quality-gate/runtime-signal tools with brief utility copy and official links only.
- Add unit coverage for rendered sections/copy and E2E coverage for official external-link safety.

### Out of Scope

- Changing install flow, CLI defaults, or shell navigation.
- Turning the page into an exhaustive tooling catalog or adding interactive demos.

## Capabilities

### New Capabilities

- `quality-tooling-view-content`: Localized quality-stack overview, ordered signal sections, optional-tool flag mapping, and official external references for `/[locale]/quality`.

### Modified Capabilities

None

## Approach

Keep the route server-first inside `PageShell`. Compose focused sections from message-driven data so EN/ES stay aligned, surface default-vs-optional status explicitly, and centralize external-link metadata for safe rendering.

## Affected Areas

| Area                            | Impact   | Description                                  |
| ------------------------------- | -------- | -------------------------------------------- |
| `app/[locale]/quality/page.tsx` | Modified | Replace placeholder with full quality view   |
| `components/quality/`           | New      | Ordered quality sections and link primitives |
| `messages/en.json`              | Modified | Add EN quality-page copy                     |
| `messages/es.json`              | Modified | Add neutral ES quality-page copy             |
| `messages/en.d.json.ts`         | Modified | Update message typings                       |
| `tests/unit/`                   | New      | Section order and copy assertions            |
| `tests/e2e/`                    | New      | External-link safety coverage                |

## Risks

| Risk                                      | Likelihood | Mitigation                                                            |
| ----------------------------------------- | ---------- | --------------------------------------------------------------------- |
| Optional-vs-default status is misread     | Med        | Label each tool with install status and enabling flag                 |
| Tooling copy drifts from product defaults | Low        | Source wording from current CLI/quality scripts before implementation |

## Rollback Plan

Revert `app/[locale]/quality/page.tsx` to the placeholder card, remove `components/quality/*`, revert message keys/types, and delete related tests.

## Dependencies

- Existing `PageShell`, shadcn cards, and localized messages
- Current CLI flags and repo quality scripts as canonical sources

## Success Criteria

- [ ] `/en/quality` and `/es/quality` explain why Purrfold installs quality tooling by default.
- [ ] The page renders signal sections in the required order.
- [ ] Vitest, commitlint, and Playwright are clearly marked optional with `--unit`, `--commitlint`, and `--e2e` mappings.
- [ ] Official links render safely and tests cover section order plus link attributes.
