# ADR 0004: CSS-first controlled motion policy

## Status

Accepted — amended 2026-07-09 (see Amendment: scoped layout animation).

## Context

The landing needs a stronger premium visual system than static cards and basic CSS entrance tokens can provide. The previous CSS-only policy protected performance and accessibility, but it also blocked carefully scoped use of Motion and Magic UI for product-surface storytelling.

The visual direction is premium and clean: subtle life, depth, and feedback without turning animation into the protagonist.

## Decision

Purrfold will use CSS-first controlled motion with these constraints:

1. Keep CSS as the default for simple entrance, hover, button press, and background effects.
2. Allow `motion` and Magic UI only in small client islands where motion clarifies hierarchy, product surfaces, or real interaction.
3. Approved Magic UI treatments are `Dot Pattern`, `Magic Card`, `Shimmer Button`, `Shine Border`, and `Terminal`, each configured with subtle intensity.
4. Terminal-style command surfaces must remain functional and preserve an always-visible copy affordance.
5. Animate `transform` and `opacity` for movement; use color or background-position transitions only for subtle state or border effects.
6. Keep button feedback at 100-150ms, standard reveals at 220ms or less, and larger hero/product-surface entrances at 300ms or less.
7. Apply card lift only inside `(hover: hover) and (pointer: fine)` so touch input does not receive sticky hover behavior.
8. Use `scale(0.97)` or less for button press feedback.
9. Remove project-owned animation, transition, and transform effects under `prefers-reduced-motion: reduce`; Motion islands must also check reduced motion.
10. Preserve visible keyboard focus independently from hover and animation.
11. Do not use particles, canvas effects, or autoplay video for the current landing. Layout animation is allowed only in small client islands for local reflow (see Amendment).

## Rationale

CSS remains cheaper and more predictable for repeated UI motion. Motion and selected Magic UI components are allowed where they provide visual hierarchy or continuity that static CSS cannot express as cleanly. Small client islands avoid converting server-rendered pages into broad client bundles.

## Consequences

### Positive

- The landing gains premium visual depth without becoming an effects demo.
- Command previews can look richer while keeping copy behavior available.
- Motion usage has explicit performance and accessibility boundaries.
- Server-first page structure remains the default.

### Negative

- The project now carries a runtime animation dependency.
- Motion wrappers and Magic UI registry components require review for reduced-motion, bundle, and composition quality.
- Visual QA becomes more important because subtle effects can regress contrast or distract when overused.

## Amendment: scoped layout animation (2026-07-09)

The original policy (point 11) banned all layout animation. The install-view framework
configurator surfaces Astro-only fields (SSR, adapter) that appear and disappear based on
the selected framework, and an instant reflow of the surrounding controls read as abrupt.

Point 11 is relaxed to allow layout animation under these constraints:

1. Only in small client islands, for **local** reflow of a control group — never for
   page-level, hero, or navigation layout.
2. Implemented with Motion's `AnimatePresence` (`mode="popLayout"`) and the `layout` prop on
   the affected siblings; movement animates transform and opacity only.
3. Keep the reveal within the standard reveal budget (220ms or less) and use `ease-out`.
4. Must be disabled under `prefers-reduced-motion: reduce` (the `layout` prop and enter/exit
   transitions collapse to an instant swap).
5. Use `LazyMotion` with `m` components (not the full `motion` import) to bound bundle cost.

Particles, canvas effects, and autoplay video remain disallowed.

## Related Decisions

- ADR 0002: Design system boundaries for shell navigation
