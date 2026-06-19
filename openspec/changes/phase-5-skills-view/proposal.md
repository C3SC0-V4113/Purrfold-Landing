# Proposal: Phase 5 Skills View

## Proposal question round

- Confirm which skills should be treated as local project-authored skills versus installed third-party skills.
- Confirm whether every skill card should include a short utility/example line.
- Confirm whether third-party links should point to skills.sh skill pages or source repos when both exist.

Assumption: render all skills with equal weight, add a short utility/example line to each card, and prefer skills.sh pages for third-party skills.

## Intent

Replace the placeholder `/[locale]/skills` page with a bilingual skills overview that gives every skill equal weight, explains what each one is useful for, and links third-party skills to their correct source pages.

## Scope

### In Scope

- Build a detailed `/[locale]/skills` page inside `PageShell` with overview and skills-list sections.
- Add localized EN/ES copy in `messages/en.json` and `messages/es.json` only; no hardcoded user text.
- Render skill entries as shadcn `Card`s, add a utility/example line to each card, and keep motion CSS-only with reduced-motion respect.
- Add unit coverage for skill names/examples/links and E2E coverage for safe external-link attributes.

### Out of Scope

- New routing, shell-navigation, or install-page behavior.
- Full tutorials, interactive demos, or Framer Motion.

## Capabilities

### New Capabilities

- `skills-view-content`: Localized overview, equal-weight skill cards, per-skill utility examples, and safe outbound references for `/[locale]/skills`.

### Modified Capabilities

None

## Approach

Keep the page server-first and compose it from focused skills-view sections. Source copy from messages, map skills-lock-derived metadata to cards, and route third-party skills to skills.sh while leaving local skills unlinked.

## Affected Areas

| Area                           | Impact   | Description                                    |
| ------------------------------ | -------- | ---------------------------------------------- |
| `app/[locale]/skills/page.tsx` | Modified | Replace placeholder with full skills view      |
| `components/skills/`           | New      | Overview, skill card, and skills list sections |
| `messages/en.json`             | Modified | Add EN skills-page copy                        |
| `messages/es.json`             | Modified | Add neutral ES skills-page copy                |
| `messages/en.d.json.ts`        | Modified | Update message typing                          |
| `tests/unit/`                  | New      | Skills page render assertions                  |
| `tests/e2e/`                   | New      | Safe external-link coverage                    |

## Risks

| Risk                                   | Likelihood | Mitigation                                                                |
| -------------------------------------- | ---------- | ------------------------------------------------------------------------- |
| Skill metadata drifts from source docs | Med        | Derive entries from installed skills + public docs at implementation time |
| Link-safety checks miss one card       | Low        | Centralize card link props and cover with E2E                             |

## Rollback Plan

Revert `app/[locale]/skills/page.tsx` to the current placeholder, remove new `components/skills/*`, revert message keys/types, and delete related tests.

## Dependencies

- Existing `PageShell`, `Card`, and message-driven skills copy
- Skill source docs under `.agents/skills/` and configured external references

## Success Criteria

- [ ] `/en/skills` and `/es/skills` explain the equal-weight skills philosophy and skills list.
- [ ] Every skill card includes a short utility/example line.
- [ ] Every third-party skill uses a source-appropriate skills.sh link and safe external-link attributes.
- [ ] Unit tests verify each skill name, example, and source badge; E2E verifies link safety and the vitest skills.sh URL.
