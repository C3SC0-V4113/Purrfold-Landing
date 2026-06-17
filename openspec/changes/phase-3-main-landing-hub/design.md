# Design: Phase 3 Main Landing Hub

## Technical Approach

Replace the current `PageShell`-wrapped home page with a composed hub layout. The home page drops `PageShell` (designed for deep-page card layout) and renders `BaseNavigation` directly, followed by five distinct content sections. All copy flows through `getMessages(locale).HomePage`. The only client island is `CopyButton`; everything else is server-rendered. shadcn `Tabs` (radix-ui) provides the CLI/Agent install selector. CSS-only animations reuse existing `shell-fade-in` and `shell-enter-up` tokens with `prefers-reduced-motion` guards already in `globals.css`.

## Architecture Decisions

| Decision             | Choice                                                                      | Alternatives                                                          | Rationale                                                                                                                                                                                               |
| -------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home layout wrapper  | Drop `PageShell`; render `BaseNavigation` + custom `<main>` directly        | Keep `PageShell` with extended props; Create new `HubShell` component | `PageShell`'s internal Card+Separator+CardContent structure is designed for deep pages. The hub needs full-width section composition. A new wrapper adds indirection for one consumer.                  |
| Message namespace    | Extend existing `HomePage` keys in `messages/*.json`                        | Create separate `Hub` top-level namespace                             | Keeps `getMessages(locale).HomePage` access pattern. Avoids breaking `Metadata` namespace used by `buildPageMetadata`. Old keys (`primaryCta`, `secondaryCta`) are removed since the hub replaces them. |
| Client island scope  | `CopyButton` only (`'use client'`)                                          | Make `QuickInstall` the client boundary                               | Tabs from shadcn are already `'use client'` (radix-ui). `CopyButton` is the only component needing `navigator.clipboard`. Keeping it isolated follows the project's server-first rule.                  |
| Code block rendering | `<pre><code>` with `font-mono` and `bg-muted`                               | Install a syntax highlighting library                                 | No dependency addition. The install command and agent prompt are plain text, not multi-language code. Monospace + muted background matches DESIGN.md's calm aesthetic.                                  |
| Hub entry animation  | Reuse `animate-shell-enter-up` with staggered `animation-delay` per section | Add new keyframes per section                                         | Two tokens already exist with reduced-motion guards. Stagger via CSS custom property `--delay` keeps it DRY.                                                                                            |

## Data Flow

```text
messages/{en,es}.json
  └─ getMessages(locale).HomePage
       ├─ HeroSection ──────── Badge, h1, p, Button → /{locale}/install
       ├─ QuickInstall ─────── Tabs (CLI | Agent) ── CopyButton (client)
       ├─ SummaryCards ─────── 4× Card → /{locale}/{install,skills,quality,ecosystem}
       ├─ RoadmapSection ───── List + Badge (shipped/future)
       └─ FoundationsSection ─ 2× Card → externalLinks.{shadcn,nextjs}

BaseNavigation ──── (unchanged, receives locale prop)
```

No API routes, no server state, no client state beyond Tabs selection and CopyButton feedback.

## File Changes

| File                                      | Action | Description                                                                                      |
| ----------------------------------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `components/ui/tabs.tsx`                  | Create | shadcn tabs via `npx shadcn@latest add tabs` (radix-ui, base-rhea style)                         |
| `components/copy-button.tsx`              | Create | `'use client'` island — clipboard copy with Check icon feedback                                  |
| `components/hero-section.tsx`             | Create | Server component — Badge eyebrow, h1, description, CTA Button                                    |
| `components/quick-install.tsx`            | Create | Server component — shadcn Tabs with CLI and Agent content + CopyButton                           |
| `components/summary-cards.tsx`            | Create | Server component — responsive grid of 4 Card links to deep routes                                |
| `components/roadmap-section.tsx`          | Create | Server component — framework list with shipped/future Badge                                      |
| `components/foundations-section.tsx`      | Create | Server component — 2 Card external links (shadcn, Next.js)                                       |
| `app/[locale]/page.tsx`                   | Modify | Replace PageShell composition with BaseNavigation + 5 hub sections                               |
| `messages/en.json`                        | Modify | Replace old HomePage keys with hub keys (hero, quickInstall, summaryCards, roadmap, foundations) |
| `messages/es.json`                        | Modify | Spanish equivalents — neutral/professional, no country-specific idioms                           |
| `tests/unit/copy-button.test.tsx`         | Create | Clipboard mock, success/fallback states                                                          |
| `tests/unit/hero-section.test.tsx`        | Create | EN/ES heading, CTA href, Badge rendering                                                         |
| `tests/unit/quick-install.test.tsx`       | Create | Tab switching, content visibility, CopyButton presence                                           |
| `tests/unit/summary-cards.test.tsx`       | Create | 4 cards, localized hrefs, CardTitle/CardDescription                                              |
| `tests/unit/roadmap-section.test.tsx`     | Create | Shipped/future Badge variants, framework names                                                   |
| `tests/unit/foundations-section.test.tsx` | Create | External hrefs, `target="_blank"`, `rel="noreferrer noopener"`                                   |
| `tests/unit/hub-page.test.tsx`            | Create | Full composition smoke test (replaces current home assertions in localized-pages)                |
| `tests/unit/localized-pages.test.tsx`     | Modify | Update home page assertions to match new hub structure                                           |
| `tests/e2e/hub-landing.spec.ts`           | Create | Tab switching, clipboard E2E, card navigation, bilingual content                                 |

## Interfaces / Contracts

### CopyButton (client component)

```tsx
'use client';
type CopyButtonProps = { text: string; label?: string };
// Uses navigator.clipboard.writeText with try/catch
// Shows Check icon for 2s, then reverts to Copy icon
// Button variant="ghost" size="icon"
```

### Hub section components (server components)

```tsx
// All receive locale, read messages internally
type HubSectionProps = { locale: Locale };

function HeroSection({ locale }: HubSectionProps): ReactNode;
function QuickInstall({ locale }: HubSectionProps): ReactNode;
function SummaryCards({ locale }: HubSectionProps): ReactNode;
function RoadmapSection({ locale }: HubSectionProps): ReactNode;
function FoundationsSection({ locale }: HubSectionProps): ReactNode;
```

### Message shape (new `HomePage` keys)

```json
{
  "HomePage": {
    "hero": { "eyebrow": "", "title": "", "description": "", "cta": "" },
    "quickInstall": {
      "title": "",
      "cliTab": "",
      "agentTab": "",
      "cliCommand": "",
      "agentPrompt": "",
      "copyLabel": "",
      "copiedLabel": ""
    },
    "summaryCards": {
      "title": "",
      "install": { "title": "", "description": "" },
      "skills": { "title": "", "description": "" },
      "quality": { "title": "", "description": "" },
      "ecosystem": { "title": "", "description": "" }
    },
    "roadmap": {
      "title": "",
      "shipped": "",
      "future": "",
      "nextjs": "",
      "astro": "",
      "vite": "",
      "tanstack": ""
    },
    "foundations": {
      "title": "",
      "description": "",
      "shadcn": "",
      "nextjs": ""
    }
  }
}
```

### Home page composition

```tsx
export default async function LocalizedHomePage(props: LocalizedPageProps) {
  const locale = await resolveLocale(props.params);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BaseNavigation locale={locale} />
      <main className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex flex-col gap-12">
          <HeroSection locale={locale} />
          <QuickInstall locale={locale} />
          <SummaryCards locale={locale} />
          <RoadmapSection locale={locale} />
          <FoundationsSection locale={locale} />
        </div>
      </main>
    </div>
  );
}
```

## Testing Strategy

| Layer                   | What                                                                 | Approach                                                                |
| ----------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Unit (TDD: red → green) | Each new component renders EN/ES copy, correct hrefs, Badge variants | Vitest + Testing Library, mock `next/navigation` as in existing tests   |
| Unit                    | CopyButton clipboard success + fallback                              | Mock `navigator.clipboard.writeText`, assert Check icon transition      |
| Unit                    | Hub page composition                                                 | Assert all 5 sections render, BaseNavigation present, no PageShell Card |
| Integration             | Tab switching shows correct content                                  | Testing Library `click` on TabsTrigger, assert TabsContent visibility   |
| E2E                     | Tab switch, clipboard, card nav, bilingual                           | Playwright Chromium, `page.evaluate` for clipboard, locale toggle       |

Strict TDD is enabled in `openspec/config.yaml` — write failing tests before implementation.

## Migration / Rollout

No data migration. The home page is the only route affected. Deep pages (`/install`, `/skills`, `/quality`, `/ecosystem`) remain untouched. Rollback: revert `app/[locale]/page.tsx` to current PageShell layout, remove new components, revert message keys.

## Open Questions

- [ ] Verify generated `tabs.tsx` source after `npx shadcn@latest add tabs` — base-rhea may produce different markup than the new-york-v4 reference.
- [ ] Confirm whether `localized-pages.test.tsx` home assertions should be extracted into `hub-page.test.tsx` or updated in place.
