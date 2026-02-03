# Pulsing Border Card — Mini PRD

**Component:** `ActivityCard`

**One-liner:** A card component with a glowing dot/line that continuously traces the card's border, conveying an "in-progress" or "thinking" state.

---

## Core Behavior

- A rounded rectangle card with content centered inside.
- A small luminous segment (like a comet trail) orbits the card's perimeter in a smooth, continuous loop.
- The trail has a gradient fade — bright at the head, transparent at the tail — giving it a pulse/glow feel.
- Animation runs indefinitely while the card is visible (or toggleable via an `active` prop).

## Props (MVP)

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Card content |
| `active` | `boolean` | `true` | Whether the border animation plays |
| `color` | `string` | `#3b82f6` | Accent color of the tracing line |

## Visual Spec

- **Card:** ~300×180px default, rounded corners (`border-radius: 12px`), subtle dark/light background.
- **Trail:** ~25% of perimeter length, completes one full loop in ~3s.
- **Glow:** Softly bleeds inward/outward a few pixels (box-shadow or filter blur on the trail).

## Tech Approach

- Single `.jsx` file, no dependencies beyond React.
- Use a `conic-gradient` mask animated via CSS `@keyframes` on a pseudo-element, **or** an SVG `<rect>` with `stroke-dasharray` + `stroke-dashoffset` animation.
- No canvas, no JS animation frames — pure CSS animation for performance.

## Out of Scope (MVP)

- Theming system
- Size variants
- Click handlers
- Accessibility motion preferences (`prefers-reduced-motion` is a nice fast-follow)
