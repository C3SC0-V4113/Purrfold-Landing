# Design: Phase 6 Quality Tooling View

## Technical Approach

Replace the `/[locale]/quality` placeholder with a server-first content view inside the existing `PageShell`. The route keeps the current Next.js 16 async `params`/`generateMetadata` pattern, reads `getMessages(locale).Pages.quality`, and composes quality-specific server components. Localized copy lives in `messages/en.json` and `messages/es.json`; non-localized tool metadata, section order, official URLs, status, and optional flags live in a typed catalog so EN/ES stay aligned and links remain controlled.

## Architecture Decisions

| Decision                              | Alternatives considered                | Rationale                                                                                                                                                                          |
| ------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Server-only quality components        | Client view or interactive filters     | The spec is static explanatory content. No client island is needed, keeping bundle surface low and matching `SkillsPage` server composition.                                       |
| Catalog-driven section order          | Derive order from message object keys  | Required order is contractual: quality gates, commit hygiene, CI confidence, runtime insight. A typed ordered catalog prevents translation/key-order drift.                        |
| Split status from section             | Treat “quality gate” only as a section | React Doctor and React Scan must be labeled default quality-gate tools even if React Scan also supports runtime insight. Separate `status`/`role` from `section` avoids ambiguity. |
| Central official links                | Put hrefs in translations              | URLs are not locale copy. Centralizing them makes “official links only” testable and avoids accidental localized URL drift.                                                        |
| Reuse PageShell and shadcn primitives | New page shell or custom card system   | Existing install/skills pages use `PageShell`, `Card`, `Badge`, and safe external anchors. Following that pattern is lower risk than inventing layout primitives.                  |

## Data Flow

```text
/[locale]/quality page
  ├─ resolveLocale(params)
  ├─ buildPageMetadata(locale, '/quality')
  └─ getMessages(locale).Pages.quality
      └─ QualityView(messages)
          ├─ overview copy
          └─ QUALITY_SECTIONS (fixed order)
              └─ QUALITY_TOOLS + messages.tools[id]
                  └─ QualityToolCard(status, flag?, officialLink)
```

## File Changes

| File                                       | Action | Description                                                                                             |
| ------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------- |
| `app/[locale]/quality/page.tsx`            | Modify | Replace placeholder card with `QualityView`, preserving async locale resolution and metadata.           |
| `components/quality/quality-view.tsx`      | Create | Server component rendering overview and ordered signal sections.                                        |
| `components/quality/quality-tool-card.tsx` | Create | Reusable card/list item with status badge, optional flag, utility copy, and safe external link.         |
| `components/quality/quality-catalog.ts`    | Create | Typed section/tool catalog, status mapping, flags, and official URLs.                                   |
| `messages/en.json`                         | Modify | Add quality overview, labels, section headings, and tool copy.                                          |
| `messages/es.json`                         | Modify | Add equivalent neutral/professional Spanish copy; preserve tool names and flags.                        |
| `messages/en.d.json.ts`                    | Modify | Regenerate/update message typing after message shape changes.                                           |
| `tests/unit/quality-view.test.tsx`         | Create | EN/ES rendering, section order, status labels, flags, and link attributes.                              |
| `tests/e2e/quality-view.spec.ts`           | Create | Browser coverage for `/en/quality` and `/es/quality`, official link hosts, and safe new-tab attributes. |
| `tests/unit/localized-pages.test.tsx`      | Modify | Update placeholder assertions to the new quality page shape.                                            |

## Interfaces / Contracts

```ts
type QualitySectionId = 'quality-gates' | 'commit-hygiene' | 'ci-confidence' | 'runtime-insight';
type QualityStatus = 'default' | 'optional';
type QualityRole = 'quality-gate' | 'commit-signal' | 'ci-signal' | 'runtime-signal';

type QualityTool = {
  id: keyof QualityMessages['tools'];
  section: QualitySectionId;
  status: QualityStatus;
  role: QualityRole;
  flag?: '--unit' | '--commitlint' | '--e2e';
  href: `https://${string}`;
};
```

`Vitest`, `commitlint`, and `Playwright` MUST be `optional` and expose the exact flags above. `React Doctor` and `React Scan` MUST be `default` with `role: 'quality-gate'` and no flag. Initial URLs should come from official package homepages/docs: ESLint, Prettier, TypeScript, React Doctor GitHub, React Scan, Vitest, commitlint, GitHub Actions, and Playwright. External anchors MUST use `target="_blank"` and `rel="noreferrer noopener"`.

## Testing Strategy

| Layer | What to Test                     | Approach                                                                                                                  |
| ----- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Unit  | Page rendering and localization  | Render `QualityPage` with async EN/ES props under `ThemeProvider`.                                                        |
| Unit  | Required order and mappings      | Assert section heading order, optional flags, React Doctor/React Scan default quality-gate labels, and no extra sections. |
| Unit  | Safe official links              | Assert hrefs match catalog URLs and anchors use `_blank` + `noreferrer noopener`.                                         |
| E2E   | Localized routes and link safety | Playwright visits `/en/quality` and `/es/quality`, checks headings/copy, official link count/hosts, and safe attributes.  |

## Migration / Rollout

No migration required. Rollout is a static replacement of the existing localized quality placeholder. Rollback restores the placeholder page, removes `components/quality/*`, reverts message/type changes, and deletes related tests.

## Open Questions

None.
