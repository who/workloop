# ActivityCard

A React component library for animated card borders with glowing pulse effects, particle systems, and customizable line styles.

## Features

- **Animated border pulse** - A glowing trail that traces the card border, conveying an in-progress or active state
- **Particle effects** - 6 built-in effects: sparkler, comet, stardust, ember, electric, bubble
- **Line styles** - 6 stroke styles: solid, scribble, double, wavy, glow, tapered
- **Head shapes** - 4 pulse head shapes: round, flat, pointed, soft
- **Shape support** - Rectangle and circle shapes with customizable border radius
- **Speed-based intensity** - Faster animations automatically produce more intense effects
- **Hover effects** - Built-in hover states with scale and glow enhancement
- **Theme support** - Works with light/dark themes

## Demo

[Live Demo](https://workloop-production.up.railway.app/)

## Installation

```bash
npm install
```

## Quick Start

```jsx
import ActivityCard from './src/components/ActivityCard'

function App() {
  return (
    <ActivityCard>
      <span>Processing...</span>
    </ActivityCard>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | boolean | `true` | Whether the animation is running |
| `color` | string | `'#3b82f6'` | Border color (hex, rgb, or named color) |
| `speed` | number \| 'slow' \| 'normal' \| 'fast' | `'normal'` | Animation duration in seconds or preset |
| `particleEffect` | string | `'none'` | Particle effect type |
| `shape` | 'rectangle' \| 'circle' | `'rectangle'` | Card shape |
| `lineStyle` | string | `'solid'` | Border stroke style |
| `headShape` | string | `'round'` | Pulse head shape |
| `headSize` | number | `1` | Size multiplier for the pulse head |
| `particleFollowDistance` | number | `0` | How far particles trail behind the pulse |

### Speed Presets

- `'slow'` - 5 seconds
- `'normal'` - 3 seconds
- `'fast'` - 1.5 seconds

Or pass a number for custom duration (0.5 - 8 seconds).

### Particle Effects

- `'sparkler'` - Bursting sparkles that explode outward
- `'comet'` - Trailing streaks that follow the pulse
- `'stardust'` - Twinkling floating particles
- `'ember'` - Rising glowing embers
- `'electric'` - Crackling electric bolts
- `'bubble'` - Floating bubbles that rise and wobble

### Line Styles

- `'solid'` - Standard solid stroke
- `'scribble'` - Hand-drawn wobble effect
- `'double'` - Two parallel lines
- `'wavy'` - Sinusoidal wave pattern
- `'glow'` - Extra bright multi-layer glow
- `'tapered'` - Stroke that tapers from thick to thin

### Head Shapes

- `'round'` - Rounded stroke cap (default)
- `'flat'` - Sharp flat edge with bright termination
- `'pointed'` - Arrow-like tapered point
- `'soft'` - Diffuse dreamy glow

## Examples

### Basic usage

```jsx
<ActivityCard>
  <span>Default card</span>
</ActivityCard>
```

### Custom color and speed

```jsx
<ActivityCard color="#22c55e" speed="fast">
  <span>Fast green card</span>
</ActivityCard>
```

### With particle effects

```jsx
<ActivityCard color="#f59e0b" particleEffect="sparkler">
  <span>Sparkler effect</span>
</ActivityCard>
```

### Circle shape with custom line style

```jsx
<ActivityCard shape="circle" lineStyle="wavy" color="#8b5cf6">
  <span>Wavy circle</span>
</ActivityCard>
```

### Combined effects

```jsx
<ActivityCard
  color="#3b82f6"
  particleEffect="comet"
  lineStyle="glow"
  headShape="pointed"
  speed={2}
>
  <span>Comet + Glow</span>
</ActivityCard>
```

### Inactive state

```jsx
<ActivityCard active={false}>
  <span>Paused</span>
</ActivityCard>
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

## License

MIT
