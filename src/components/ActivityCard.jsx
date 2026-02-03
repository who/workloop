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

const wrapperStyles = {
  position: 'relative',
  width: '300px',
  height: '180px',
  borderRadius: '12px',
};

const baseBorderStyles = {
  position: 'absolute',
  inset: 0,
  borderRadius: '12px',
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

const contentStyles = {
  width: '100%',
  height: '100%',
  borderRadius: '12px',
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

const PARTICLE_EFFECTS = ['sparkler', 'comet', 'stardust', 'ember', 'electric', 'bubble', 'none'];

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateParticles(effect, rgb, particleCount = 12) {
  if (effect === 'none' || !PARTICLE_EFFECTS.includes(effect)) {
    return [];
  }

  const [r, g, b] = rgb;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const seed = i * 137.5;
    const random1 = seededRandom(seed);
    const random2 = seededRandom(seed + 1);
    const random3 = seededRandom(seed + 2);
    const random4 = seededRandom(seed + 3);

    const angle = (i / particleCount) * 360;
    const delay = (i / particleCount) * 2;

    let particle = {
      id: i,
      style: {},
    };

    switch (effect) {
      case 'sparkler': {
        const distance = 20 + random1 * 30;
        const tx = Math.cos((angle * Math.PI) / 180) * distance;
        const ty = Math.sin((angle * Math.PI) / 180) * distance;
        particle.style = {
          position: 'absolute',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: `rgba(${r}, ${g}, ${b}, 0.9)`,
          boxShadow: `0 0 4px rgba(${r}, ${g}, ${b}, 0.8), 0 0 8px rgba(${r}, ${g}, ${b}, 0.5)`,
          left: `${50 + random2 * 10 - 5}%`,
          top: `${50 + random3 * 10 - 5}%`,
          '--tx': `${tx}px`,
          '--ty': `${ty}px`,
          animation: `sparklerBurst ${0.6 + random4 * 0.4}s ease-out infinite`,
          animationDelay: `${delay}s`,
        };
        break;
      }
      case 'comet': {
        const positionOnBorder = i / particleCount;
        let left, top;
        if (positionOnBorder < 0.25) {
          left = `${positionOnBorder * 400}%`;
          top = '0%';
        } else if (positionOnBorder < 0.5) {
          left = '100%';
          top = `${(positionOnBorder - 0.25) * 400}%`;
        } else if (positionOnBorder < 0.75) {
          left = `${100 - (positionOnBorder - 0.5) * 400}%`;
          top = '100%';
        } else {
          left = '0%';
          top = `${100 - (positionOnBorder - 0.75) * 400}%`;
        }
        particle.style = {
          position: 'absolute',
          width: `${8 + random1 * 8}px`,
          height: '2px',
          borderRadius: '2px',
          background: `linear-gradient(90deg, rgba(${r}, ${g}, ${b}, 0.9), rgba(${r}, ${g}, ${b}, 0))`,
          left,
          top,
          '--trail-distance': `${-15 - random2 * 15}px`,
          animation: `cometTrail ${0.8 + random3 * 0.4}s ease-out infinite`,
          animationDelay: `${delay}s`,
          transformOrigin: 'right center',
        };
        break;
      }
      case 'stardust': {
        particle.style = {
          position: 'absolute',
          width: `${3 + random1 * 3}px`,
          height: `${3 + random1 * 3}px`,
          borderRadius: '50%',
          backgroundColor: `rgba(${r}, ${g}, ${b}, 0.7)`,
          boxShadow: `0 0 3px rgba(${r}, ${g}, ${b}, 0.6)`,
          left: `${random2 * 100}%`,
          top: `${random3 * 100}%`,
          '--drift-x': `${(random4 - 0.5) * 40}px`,
          '--drift-y': `${(random1 - 0.5) * 40}px`,
          animation: `stardustFloat ${3 + random2 * 2}s ease-in-out infinite, stardustTwinkle ${1 + random3}s ease-in-out infinite`,
          animationDelay: `${delay}s, ${random4}s`,
        };
        break;
      }
      case 'ember': {
        const startX = 10 + random2 * 80;
        particle.style = {
          position: 'absolute',
          width: `${4 + random1 * 4}px`,
          height: `${4 + random1 * 4}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${Math.min(255, r + 50)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 50)}, 0.9), rgba(${r}, ${g}, ${b}, 0.6))`,
          boxShadow: `0 0 6px rgba(${r}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 50)}, 0.8)`,
          left: `${startX}%`,
          bottom: `${10 + random3 * 20}%`,
          '--rise-distance': `${-40 - random4 * 40}px`,
          animation: `emberRise ${2 + random1 * 1.5}s ease-out infinite, emberGlow ${0.5 + random2 * 0.5}s ease-in-out infinite`,
          animationDelay: `${delay}s, ${random3}s`,
        };
        break;
      }
      case 'electric': {
        const startY = 10 + random2 * 80;
        const isLeft = i % 2 === 0;
        particle.style = {
          position: 'absolute',
          width: `${10 + random1 * 15}px`,
          height: '2px',
          background: `linear-gradient(${isLeft ? '90deg' : '270deg'}, rgba(${r}, ${g}, ${b}, 0.9), rgba(${Math.min(255, r + 100)}, ${Math.min(255, g + 100)}, ${Math.min(255, b + 100)}, 0.3))`,
          boxShadow: `0 0 4px rgba(${r}, ${g}, ${b}, 0.8), 0 0 8px rgba(${r}, ${g}, ${b}, 0.4)`,
          left: isLeft ? '0%' : 'auto',
          right: isLeft ? 'auto' : '0%',
          top: `${startY}%`,
          animation: `electricCrackle ${0.15 + random3 * 0.1}s linear infinite`,
          animationDelay: `${delay + random4}s`,
          transformOrigin: isLeft ? 'left center' : 'right center',
        };
        break;
      }
      case 'bubble': {
        particle.style = {
          position: 'absolute',
          width: `${6 + random1 * 8}px`,
          height: `${6 + random1 * 8}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, rgba(${Math.min(255, r + 80)}, ${Math.min(255, g + 80)}, ${Math.min(255, b + 80)}, 0.4), rgba(${r}, ${g}, ${b}, 0.2))`,
          border: `1px solid rgba(${r}, ${g}, ${b}, 0.4)`,
          left: `${10 + random2 * 80}%`,
          bottom: '5%',
          '--float-distance': `${-60 - random3 * 60}px`,
          animation: `bubbleFloat ${2.5 + random1 * 1.5}s ease-out infinite, bubbleWobble ${0.8 + random4 * 0.4}s ease-in-out infinite`,
          animationDelay: `${delay}s, ${random2}s`,
        };
        break;
      }
      default:
        break;
    }

    particles.push(particle);
  }

  return particles;
}

function ActivityCard({ children, active = true, color = '#3b82f6', speed = 'normal', particleEffect = 'none' }) {
  const [rgb, setRgb] = useState(DEFAULT_RGB);

  useEffect(() => {
    setRgb(parseColor(color));
  }, [color]);

  const [r, g, b] = rgb;
  const glowColor = `rgba(${r}, ${g}, ${b}, 0.6)`;

  const duration = getAnimationDuration(speed);

  const particles = useMemo(() => {
    return generateParticles(particleEffect, rgb);
  }, [particleEffect, rgb]);

  const borderStyles = {
    ...baseBorderStyles,
    background: createBorderGradient(rgb),
    animation: `borderTrace ${duration}s linear infinite`,
    animationPlayState: active ? 'running' : 'paused',
    filter: `drop-shadow(0 0 4px ${glowColor}) drop-shadow(0 0 8px ${glowColor})`,
  };

  const particleContainerStyles = {
    position: 'absolute',
    inset: 0,
    borderRadius: '12px',
    overflow: 'hidden',
    pointerEvents: 'none',
  };

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={wrapperStyles}>
        <div style={borderStyles} />
        {active && particleEffect !== 'none' && (
          <div style={particleContainerStyles}>
            {particles.map((particle) => (
              <div
                key={particle.id}
                style={{
                  ...particle.style,
                  animationPlayState: active ? 'running' : 'paused',
                }}
              />
            ))}
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
