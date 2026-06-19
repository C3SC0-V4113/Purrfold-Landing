# Design: Phase 5 Skills View

## Technical Approach

Replace the `/[locale]/skills` placeholder with a server-first composition inside the existing `PageShell`. The page will keep async locale resolution, read `getMessages(locale).Pages.skills`, and compose `SkillsOverview` plus `SkillsList`. User-facing copy stays in `messages/en.json` and `messages/es.json`; source attribution is derived from `skills-lock.json` so third-party skills can link to the correct skills.sh pages while local skills remain unlinked.

## Architecture Decisions

| Decision                                  | Alternatives considered                                    | Rationale                                                                                                                                                                                      |
| ----------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Server-only sections                      | Client view component                                      | The page is static content; no interactivity requires a client island. This follows project architecture and keeps bundle surface low.                                                         |
| Children-based compound list              | Monolithic list with display flags; React context          | `SkillsList > SkillsCategory > SkillCard` gives explicit composition without boolean props. Context is unnecessary for static RSC content; the category is visible through the parent heading. |
| Message-driven copy + lockfile source map | Hardcode strings in components; duplicate copy in metadata | The spec requires localized EN/ES copy from messages. Metadata stays stable while skills-lock decides whether a skill is local or third-party.                                                 |
| Inline source links                       | Dedicated featured block or docs links                     | Every third-party skill should expose its own skills.sh link; no single highlighted skill should dominate the page.                                                                            |
| Keep PageShell unchanged                  | Modify shell to avoid nested card layout                   | Shell changes are out of scope. `SkillCard` uses shadcn `Card` as required; implementation should keep spacing calm and avoid extra nested cards.                                              |

## Data Flow

```text
/[locale]/skills page
  └─ resolveLocale(params)
  └─ getMessages(locale).Pages.skills
      ├─ SkillsOverview(locale) ── overview copy
      └─ SkillsList(locale)
          └─ SKILL_CATALOG + skills-lock.json + messages.skills[id]
              └─ SkillsCategory ── SkillCard(s) with example text and optional skills.sh link
```

## File Changes

| File                                    | Action | Description                                                                                  |
| --------------------------------------- | ------ | -------------------------------------------------------------------------------------------- |
| `components/skills/skills-overview.tsx` | Create | Server section reading overview title/description from messages.                             |
| `components/skills/skills-list.tsx`     | Create | Server category grouping, skills-lock source mapping, and per-skill example/link rendering.  |
| `components/skills/skill-card.tsx`      | Create | Server card using `Card`, `CardDescription`, `Badge`, example copy, and safe external links. |
| `app/[locale]/skills/page.tsx`          | Modify | Compose the overview and skills list inside `PageShell`.                                     |
| `messages/en.json`                      | Modify | Add `Pages.skills.overview`, `linkLabel`, `categories`, `skills`, and `badges`.              |
| `messages/es.json`                      | Modify | Add equivalent neutral/professional Spanish copy.                                            |
| `messages/en.d.json.ts`                 | Modify | Regenerate/update message typing through the project typegen flow.                           |
| `tests/unit/skills-view.test.tsx`       | Create | Component/page tests for EN/ES, examples, badges, and skills.sh link counts.                 |
| `tests/e2e/skills-view.spec.ts`         | Create | Browser-level safety check for external skills links and localized rendering.                |

## Interfaces / Contracts

```tsx
type SkillSource = 'local' | 'skills-sh';
type SkillCategory = 'architecture' | 'framework' | 'quality' | 'typescript';

type SkillDefinition = {
  id: keyof SkillsMessages;
  category: SkillCategory;
  source: SkillSource;
  href?: string;
};

type SkillCardProps = {
  name: string;
  purpose: string;
  whenHelp: string;
  example: string;
  source: SkillSource;
  href?: string;
  linkLabel: string;
};
```

`skills-lock.json` is the source of truth for third-party skills. Any catalog entry present in the lockfile MUST be rendered as `skills-sh`; `react-doctor` uses a dedicated `react-doctor` tag because it is installed through the React Doctor tool; project-authored skills such as `project-architecture` remain `local`.

## Testing Strategy

| Layer | What to Test                                | Approach                                                                                                                      |
| ----- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Unit  | `SkillsOverview`, `SkillsList`, `SkillCard` | Testing Library render assertions using EN/ES messages.                                                                       |
| Unit  | examples, source badges, safe links         | Assert every skill name and example appears, badge labels/variants map by source, links use `_blank` + `noreferrer noopener`. |
| E2E   | `/en/skills` and `/es/skills`               | Playwright checks localized headings and every external skills link safety attribute.                                         |

## Migration / Rollout

No migration required. Rollout is a static page replacement under the existing localized route.

## Open Questions

None.
