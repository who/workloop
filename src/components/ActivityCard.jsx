'use client'

import React, { useState, useEffect, useMemo } from 'react';

const keyframesStyle = `
@property --border-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes borderTrace {
  from {
    --border-angle: 0deg;
  }
  to {
    --border-angle: 360deg;
  }
}

@keyframes sparklerBurst {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) scale(0);
    opacity: 0;
  }
}

@keyframes followBorder {
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
  }
}

@keyframes cometTrail {
  0% {
    transform: translateX(0) scaleX(1);
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translateX(var(--trail-distance)) scaleX(0.3);
    opacity: 0;
  }
}

@keyframes stardustFloat {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--drift-x), var(--drift-y)) rotate(360deg);
    opacity: 0;
  }
}

@keyframes stardustTwinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes emberRise {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(var(--rise-distance)) scale(0.5);
    opacity: 0;
  }
}

@keyframes emberGlow {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.5);
  }
}

@keyframes electricCrackle {
  0% {
    transform: scaleX(0) scaleY(1);
    opacity: 1;
  }
  30% {
    transform: scaleX(1) scaleY(1);
    opacity: 1;
  }
  60% {
    transform: scaleX(1) scaleY(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scaleX(1) scaleY(0);
    opacity: 0;
  }
}

@keyframes bubbleFloat {
  0% {
    transform: translateY(0) scale(0.5);
    opacity: 0;
  }
  20% {
    opacity: 0.8;
    transform: translateY(-10px) scale(1);
  }
  80% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(var(--float-distance)) scale(1.2);
    opacity: 0;
  }
}

@keyframes bubbleWobble {
  0%, 100% {
    transform: translateX(-2px);
  }
  50% {
    transform: translateX(2px);
  }
}
`;

const SHAPE_STYLES = {
  rectangle: {
    wrapper: {
      position: 'relative',
      width: '300px',
      height: '180px',
      borderRadius: '12px',
    },
    borderRadius: '12px',
  },
  circle: {
    wrapper: {
      position: 'relative',
      width: '180px',
      height: '180px',
      borderRadius: '50%',
      aspectRatio: '1',
    },
    borderRadius: '50%',
  },
};

const baseBorderStyles = {
  position: 'absolute',
  inset: 0,
  padding: '2px',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor',
  maskComposite: 'exclude',
  pointerEvents: 'none',
};

// Default color for initial server render
const DEFAULT_RGB = [59, 130, 246];

function parseColor(color) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Canvas not supported (jsdom, some browsers)
  if (!ctx) {
    return parseHexColor(color);
  }

  ctx.fillStyle = color;
  const computed = ctx.fillStyle;
  if (computed.startsWith('#')) {
    const hex = computed.slice(1);
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }
  // Handle rgb/rgba format
  const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
  }
  return DEFAULT_RGB;
}

function parseHexColor(color) {
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const fullHex = hex.length === 3
      ? hex.split('').map(c => c + c).join('')
      : hex;
    const num = parseInt(fullHex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }
  // Default fallback
  return DEFAULT_RGB;
}

function createBorderGradient(rgb) {
  const [r, g, b] = rgb;
  return `conic-gradient(
    from var(--border-angle, 0deg),
    transparent 0deg,
    transparent 270deg,
    rgba(${r}, ${g}, ${b}, 0.1) 280deg,
    rgba(${r}, ${g}, ${b}, 0.5) 320deg,
    rgba(${r}, ${g}, ${b}, 1) 360deg
  )`;
}

const baseContentStyles = {
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(128, 128, 128, 0.1)',
  border: '1px solid rgba(128, 128, 128, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const SPEED_PRESETS = {
  slow: 5,
  normal: 3,
  fast: 1.5,
};

function getAnimationDuration(speed) {
  if (typeof speed === 'number') {
    return speed;
  }
  return SPEED_PRESETS[speed] ?? SPEED_PRESETS.normal;
}

// Calculate intensity multiplier based on speed (faster = more intense)
// Uses an easing function for smooth transitions
function getIntensityFromSpeed(duration) {
  // Map duration to intensity: 0.5s -> 1.5x, 3s -> 1x, 8s -> 0.6x
  // Using inverse relationship with easing
  const minDuration = 0.5;
  const maxDuration = 8;
  const normalDuration = 3;

  // Clamp duration to valid range
  const clampedDuration = Math.max(minDuration, Math.min(maxDuration, duration));

  if (clampedDuration <= normalDuration) {
    // Faster than normal: intensity increases (1.0 to 1.5)
    const t = 1 - (clampedDuration - minDuration) / (normalDuration - minDuration);
    // Ease-out cubic for smooth transition
    const eased = 1 - Math.pow(1 - t, 3);
    return 1 + eased * 0.5;
  } else {
    // Slower than normal: intensity decreases (1.0 to 0.6)
    const t = (clampedDuration - normalDuration) / (maxDuration - normalDuration);
    // Ease-in cubic for gradual reduction
    const eased = Math.pow(t, 2);
    return 1 - eased * 0.4;
  }
}

// Get intensity parameters for effects
function getEffectIntensity(duration) {
  const intensity = getIntensityFromSpeed(duration);

  return {
    intensity,
    // Glow parameters
    glowBlur: Math.round(4 * intensity),
    glowBlur2: Math.round(8 * intensity),
    glowOpacity: Math.min(0.9, 0.6 * intensity),
    // Particle parameters
    particleCount: Math.round(12 * intensity),
    particleSizeMultiplier: 0.7 + intensity * 0.3,
    particleOpacityMultiplier: 0.7 + intensity * 0.3,
    particleBlurMultiplier: intensity,
  };
}

const PARTICLE_EFFECTS = ['sparkler', 'comet', 'stardust', 'ember', 'electric', 'bubble', 'none'];

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate SVG path for the border based on shape
// Path must start at top center to match conic-gradient origin (0deg = top)
function getBorderPath(shape, width, height, borderRadius) {
  if (shape === 'circle') {
    // For circle, use a circular path starting from top center, going clockwise
    const cx = width / 2;
    const cy = height / 2;
    const r = Math.min(width, height) / 2;
    return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.001} ${cy - r}`;
  }
  // For rectangle with border radius
  // Start from top center and go clockwise to match conic-gradient
  const r = Math.min(parseFloat(borderRadius) || 12, Math.min(width, height) / 2);
  const midX = width / 2;
  return `M ${midX} 0
          L ${width - r} 0
          Q ${width} 0 ${width} ${r}
          L ${width} ${height - r}
          Q ${width} ${height} ${width - r} ${height}
          L ${r} ${height}
          Q 0 ${height} 0 ${height - r}
          L 0 ${r}
          Q 0 0 ${r} 0
          L ${midX} 0`;
}

function generateBorderParticles(effect, rgb, effectIntensity, duration, shape) {
  if (effect === 'none' || !PARTICLE_EFFECTS.includes(effect)) {
    return [];
  }

  const [r, g, b] = rgb;
  const particles = [];

  const {
    particleCount,
    particleSizeMultiplier: sizeMult,
    particleOpacityMultiplier: opacityMult,
    particleBlurMultiplier: blurMult,
  } = effectIntensity;

  // Particles follow the pulse head with slight offsets
  for (let i = 0; i < particleCount; i++) {
    const seed = i * 137.5;
    const random1 = seededRandom(seed);
    const random2 = seededRandom(seed + 1);
    const random3 = seededRandom(seed + 2);
    const random4 = seededRandom(seed + 3);

    // Each particle trails behind the pulse head by a different amount
    // Negative offset means trailing behind
    const trailOffset = -(i / particleCount) * 0.15; // Trail within 15% of the path behind head

    let particle = {
      id: i,
      trailOffset,
      style: {},
      burstStyle: null,
    };

    switch (effect) {
      case 'sparkler': {
        const size = Math.round((3 + random1 * 3) * sizeMult);
        const blur1 = Math.round(4 * blurMult);
        const blur2 = Math.round(8 * blurMult);
        // Sparkler bursts outward from the path
        const burstAngle = (random2 - 0.5) * 180; // Random angle perpendicular-ish
        const burstDistance = (15 + random3 * 25) * sizeMult;
        const tx = Math.cos((burstAngle * Math.PI) / 180) * burstDistance;
        const ty = Math.sin((burstAngle * Math.PI) / 180) * burstDistance;
        particle.style = {
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          backgroundColor: `rgba(${r}, ${g}, ${b}, ${0.9 * opacityMult})`,
          boxShadow: `0 0 ${blur1}px rgba(${r}, ${g}, ${b}, ${0.8 * opacityMult}), 0 0 ${blur2}px rgba(${r}, ${g}, ${b}, ${0.5 * opacityMult})`,
          '--tx': `${tx}px`,
          '--ty': `${ty}px`,
        };
        particle.burstAnimation = `sparklerBurst ${0.4 + random4 * 0.3}s ease-out infinite`;
        particle.burstDelay = `${random1 * 0.5}s`;
        break;
      }
      case 'comet': {
        const trailWidth = Math.round((6 + random1 * 6) * sizeMult);
        particle.style = {
          width: `${trailWidth}px`,
          height: `${Math.max(2, Math.round(2 * sizeMult))}px`,
          borderRadius: '2px',
          background: `linear-gradient(90deg, rgba(${r}, ${g}, ${b}, ${0.9 * opacityMult}), rgba(${r}, ${g}, ${b}, 0))`,
          transformOrigin: 'right center',
        };
        // Comet trails just follow along the path
        particle.trailOffset = -(i / particleCount) * 0.25; // Longer trail for comet
        break;
      }
      case 'stardust': {
        const starSize = Math.round((2 + random1 * 3) * sizeMult);
        const blur = Math.round(3 * blurMult);
        const driftX = Math.round((random4 - 0.5) * 20 * sizeMult);
        const driftY = Math.round((random1 - 0.5) * 20 * sizeMult);
        particle.style = {
          width: `${starSize}px`,
          height: `${starSize}px`,
          borderRadius: '50%',
          backgroundColor: `rgba(${r}, ${g}, ${b}, ${0.7 * opacityMult})`,
          boxShadow: `0 0 ${blur}px rgba(${r}, ${g}, ${b}, ${0.6 * opacityMult})`,
          '--drift-x': `${driftX}px`,
          '--drift-y': `${driftY}px`,
        };
        particle.burstAnimation = `stardustFloat ${1.5 + random2 * 1}s ease-in-out infinite, stardustTwinkle ${0.8 + random3 * 0.5}s ease-in-out infinite`;
        particle.burstDelay = `${random4 * 0.3}s, ${random1 * 0.2}s`;
        break;
      }
      case 'ember': {
        const emberSize = Math.round((3 + random1 * 3) * sizeMult);
        const blur = Math.round(6 * blurMult);
        const riseDistance = Math.round((-25 - random4 * 25) * sizeMult);
        particle.style = {
          width: `${emberSize}px`,
          height: `${emberSize}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${Math.min(255, r + 50)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 50)}, ${0.9 * opacityMult}), rgba(${r}, ${g}, ${b}, ${0.6 * opacityMult}))`,
          boxShadow: `0 0 ${blur}px rgba(${r}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 50)}, ${0.8 * opacityMult})`,
          '--rise-distance': `${riseDistance}px`,
        };
        particle.burstAnimation = `emberRise ${1.2 + random1 * 0.8}s ease-out infinite, emberGlow ${0.4 + random2 * 0.3}s ease-in-out infinite`;
        particle.burstDelay = `${random3 * 0.3}s, ${random4 * 0.2}s`;
        break;
      }
      case 'electric': {
        const boltWidth = Math.round((8 + random1 * 10) * sizeMult);
        const blur1 = Math.round(4 * blurMult);
        const blur2 = Math.round(8 * blurMult);
        const isOutward = i % 2 === 0;
        particle.style = {
          width: `${boltWidth}px`,
          height: `${Math.max(2, Math.round(2 * sizeMult))}px`,
          background: `linear-gradient(${isOutward ? '0deg' : '180deg'}, rgba(${r}, ${g}, ${b}, ${0.9 * opacityMult}), rgba(${Math.min(255, r + 100)}, ${Math.min(255, g + 100)}, ${Math.min(255, b + 100)}, ${0.3 * opacityMult}))`,
          boxShadow: `0 0 ${blur1}px rgba(${r}, ${g}, ${b}, ${0.8 * opacityMult}), 0 0 ${blur2}px rgba(${r}, ${g}, ${b}, ${0.4 * opacityMult})`,
          transformOrigin: 'center bottom',
        };
        particle.burstAnimation = `electricCrackle ${0.12 + random3 * 0.08}s linear infinite`;
        particle.burstDelay = `${random4 * 0.5}s`;
        break;
      }
      case 'bubble': {
        const bubbleSize = Math.round((5 + random1 * 6) * sizeMult);
        const floatDistance = Math.round((-35 - random3 * 35) * sizeMult);
        particle.style = {
          width: `${bubbleSize}px`,
          height: `${bubbleSize}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, rgba(${Math.min(255, r + 80)}, ${Math.min(255, g + 80)}, ${Math.min(255, b + 80)}, ${0.4 * opacityMult}), rgba(${r}, ${g}, ${b}, ${0.2 * opacityMult}))`,
          border: `1px solid rgba(${r}, ${g}, ${b}, ${0.4 * opacityMult})`,
          '--float-distance': `${floatDistance}px`,
        };
        particle.burstAnimation = `bubbleFloat ${1.8 + random1 * 1}s ease-out infinite, bubbleWobble ${0.6 + random4 * 0.3}s ease-in-out infinite`;
        particle.burstDelay = `${random2 * 0.3}s, ${random3 * 0.2}s`;
        break;
      }
      default:
        break;
    }

    particles.push(particle);
  }

  return particles;
}

function ActivityCard({ children, active = true, color = '#3b82f6', speed = 'normal', particleEffect = 'none', shape = 'rectangle' }) {
  const [rgb, setRgb] = useState(DEFAULT_RGB);

  useEffect(() => {
    setRgb(parseColor(color));
  }, [color]);

  const [r, g, b] = rgb;
  const duration = getAnimationDuration(speed);
  const effectIntensity = getEffectIntensity(duration);

  const { glowBlur, glowBlur2, glowOpacity } = effectIntensity;
  const glowColor = `rgba(${r}, ${g}, ${b}, ${glowOpacity})`;

  const shapeStyles = SHAPE_STYLES[shape] || SHAPE_STYLES.rectangle;
  const { borderRadius } = shapeStyles;

  // Get dimensions for path calculation
  const width = parseFloat(shapeStyles.wrapper.width) || 300;
  const height = parseFloat(shapeStyles.wrapper.height) || 180;
  const borderPath = getBorderPath(shape, width, height, borderRadius);

  const particles = useMemo(() => {
    return generateBorderParticles(particleEffect, rgb, effectIntensity, duration, shape);
  }, [particleEffect, rgb, effectIntensity, duration, shape]);

  const borderStyles = {
    ...baseBorderStyles,
    borderRadius,
    background: createBorderGradient(rgb),
    animation: `borderTrace ${duration}s linear infinite`,
    animationPlayState: active ? 'running' : 'paused',
    filter: `drop-shadow(0 0 ${glowBlur}px ${glowColor}) drop-shadow(0 0 ${glowBlur2}px ${glowColor})`,
  };

  const contentStyles = {
    ...baseContentStyles,
    borderRadius,
  };

  const particleContainerStyles = {
    position: 'absolute',
    inset: 0,
    borderRadius,
    overflow: 'visible', // Allow particles to burst outward
    pointerEvents: 'none',
  };

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={shapeStyles.wrapper}>
        <div style={borderStyles} />
        {active && particleEffect !== 'none' && (
          <div style={particleContainerStyles}>
            {particles.map((particle) => {
              // Calculate the offset-distance delay to trail behind pulse head
              // Pulse head is at offset-distance: 100% at end of animation
              // We use negative animation-delay to make particles start behind the head
              const trailDelay = particle.trailOffset * duration;

              const pathFollowStyle = {
                position: 'absolute',
                offsetPath: `path('${borderPath}')`,
                offsetRotate: '0deg',
                animation: `followBorder ${duration}s linear infinite`,
                animationDelay: `${trailDelay}s`,
                animationPlayState: active ? 'running' : 'paused',
              };

              return (
                <div
                  key={particle.id}
                  style={pathFollowStyle}
                >
                  <div
                    style={{
                      ...particle.style,
                      animation: particle.burstAnimation || 'none',
                      animationDelay: particle.burstDelay || '0s',
                      animationPlayState: active ? 'running' : 'paused',
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div style={contentStyles}>
          {children}
        </div>
      </div>
    </>
  );
}

export default ActivityCard;
