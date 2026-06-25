# ADR 0004: CSS-only animation policy

## Status

Accepted

## Context

The landing needs enough motion to clarify hierarchy and interaction without adding a runtime animation dependency, causing layout work, or making keyboard and reduced-motion experiences harder to use.

The existing shell already uses CSS keyframes for initial entrance and tab-content feedback. Phase 8 expands that foundation to repeated cards and button press feedback, so the project needs one durable policy for timing, performance, input modality, and accessibility.

## Decision

Purrfold will use CSS-only motion with these constraints:

1. Animate `transform` and `opacity` for movement; use color transitions only for state feedback.
2. Keep button feedback at 150ms and standard entrance or card movement at 220ms or less.
3. Use `ease-out` for entrance and press feedback, and `ease` for hover color changes.
4. Apply card lift only inside `(hover: hover) and (pointer: fine)` so touch input does not receive sticky hover behavior.
5. Use `scale(0.97)` for button press feedback.
6. Remove project-owned animation, transition, and transform effects under `prefers-reduced-motion: reduce`.
7. Preserve visible keyboard focus independently from hover and animation.
8. Do not add Motion, Framer Motion, or another animation runtime for the current landing.

## Rationale

CSS handles the landing's predetermined transitions without client state or frame-by-frame React updates. Restricting movement to compositor-friendly properties avoids layout animation, while explicit input and reduced-motion media queries keep the same interface usable across pointer, touch, and accessibility preferences.

## Consequences

### Positive

- No animation library or client-side runtime is added.
- Motion remains small, predictable, and inexpensive.
- Touch, keyboard, and reduced-motion users receive deliberate behavior.
- Shared classes keep repeated card and button feedback consistent.

### Negative

- CSS-only motion is less suitable for interruptible gestures or physics-driven interactions.
- New animations require an explicit reduced-motion rule and cannot be added ad hoc.

## Related Decisions

- ADR 0002: Design system boundaries for shell navigation
