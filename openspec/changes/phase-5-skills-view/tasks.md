# Tasks: Phase 5 Skills View

## Review Workload Forecast

| Field                   | Value                      |
| ----------------------- | -------------------------- |
| Estimated changed lines | ~380-520                   |
| 400-line budget risk    | Medium                     |
| Chained PRs recommended | No                         |
| Suggested split         | Single PR (size:exception) |
| Delivery strategy       | single-pr                  |
| Chain strategy          | size-exception             |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal                                | Likely PR | Notes                                                             |
| ---- | ----------------------------------- | --------- | ----------------------------------------------------------------- |
| 1    | Ship the full localized skills view | PR 1      | Base = main; include tests, message typing, and E2E safety checks |

## Phase 1: Foundation / Data Model

- [ ] 1.1 Add `Pages.skills` copy to `messages/en.json` and `messages/es.json` for overview, link label, categories, skills, and badges.
- [ ] 1.2 Update `messages/en.d.json.ts` (or regenerate type output) so the new skills keys compile.

## Phase 2: Core Implementation

- [ ] 2.1 Write `tests/unit/skills-view.test.tsx` first for overview, per-skill examples, badges, and all 15 skills.
- [ ] 2.2 Create `components/skills/skills-overview.tsx` as a server component reading localized overview copy.
- [ ] 2.3 Create `components/skills/skill-card.tsx` using shadcn `Card`/`Badge`, a per-skill example, and a visible Local vs `skills.sh` source label.
- [ ] 2.4 Create `components/skills/skills-list.tsx` with `SkillsList > SkillsCategory > SkillCard` and the lockfile-derived catalog.

## Phase 3: Integration / Wiring

- [ ] 3.1 Replace the placeholder in `app/[locale]/skills/page.tsx` with `PageShell` + `SkillsOverview` + `SkillsList`.
- [ ] 3.2 Add `tests/e2e/skills-view.spec.ts` to verify `/en/skills` and `/es/skills` render localized content and safe outbound links.

## Phase 4: Testing / Verification

- [ ] 4.1 Run `npm run check` and fix any type, lint, or formatting failures.
- [ ] 4.2 Verify all external skills links use `target="_blank"` and `rel="noreferrer noopener"` in unit/E2E coverage.

## Phase 5: Cleanup / Documentation

- [ ] 5.1 Remove any placeholder copy or dead imports left behind by the page replacement.
- [ ] 5.2 Confirm the skill catalog stays aligned with `skills-lock.json` and the project-authored local skills.
