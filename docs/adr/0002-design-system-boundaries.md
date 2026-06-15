# ADR 0002: Design system boundaries for shell navigation

## Status

Accepted

## Context

Phase 2 finishes the shell/navigation work started in Phase 1. The landing now uses shadcn components on top of the base-rhea preset, localized App Router routes, and a small set of shared shell controls. Before this change, the repository did not have a durable decision record explaining which UI layer owns navigation primitives, how Base UI composition should integrate with Next.js `Link`, which icon and motion constraints apply, or why shadcn MCP matters for future maintenance.

## Decision

We will keep the landing inside a shadcn-first design-system boundary with these rules:

1. Use shadcn/base-rhea primitives before custom navigation markup.
2. Compose Base UI-backed shadcn primitives with Next.js navigation through Base UI `render` rather than ad hoc wrappers.
3. Keep `lucide-react` as the default icon library for shell affordances and external-link cues.
4. Limit shell motion to minimal CSS tokens in `app/globals.css` with reduced-motion protection; no animation library or layout animation layer is introduced.
5. Treat repo-level `opencode.json` as the source of truth for shadcn MCP enablement because it keeps component docs, registry operations, and project-aware CLI workflows available to maintainers and agents.

## Rationale

- shadcn/base-rhea keeps the component surface consistent with the rest of the repository.
- Base UI `render` preserves semantic Next.js `Link` usage without forking generated component internals.
- `lucide-react` already matches the repo stack and avoids introducing a second icon system for the shell.
- Minimal CSS-only motion satisfies the design goal for subtle feedback while respecting `prefers-reduced-motion`.
- shadcn MCP is operationally important because it reduces guesswork when maintainers need component docs, registry metadata, or project-specific shadcn commands.

## Consequences

### Positive

- Navigation decisions stay aligned with the generated shadcn/base-rhea API.
- Future shell work has an explicit rule for Base UI `render` composition.
- Icon, motion, and MCP expectations are documented in one durable record.

### Negative

- Contributors must respect generated component boundaries instead of improvising custom wrappers.
- MCP guidance now becomes part of the repository contract and should stay in sync with tooling changes.

## Implementation Notes

- Desktop navigation uses shadcn `NavigationMenu`.
- Mobile navigation remains on `Sheet`; this ADR does not expand `NavigationMenu` into mobile disclosure behavior.
- Shell motion tokens currently expose `--animate-shell-fade-in` and `--animate-shell-enter-up` only.
- Repo-level `opencode.json` keeps shadcn MCP enabled for this project.

## Related Decisions

- ADR 0001: i18n and routing for Phase 1 localized landing
