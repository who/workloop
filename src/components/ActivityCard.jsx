'use client'

import React, { useState, useEffect } from 'react';

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

function ActivityCard({ children, active = true, color = '#3b82f6' }) {
  const [rgb, setRgb] = useState(DEFAULT_RGB);

  useEffect(() => {
    setRgb(parseColor(color));
  }, [color]);

  const [r, g, b] = rgb;
  const glowColor = `rgba(${r}, ${g}, ${b}, 0.6)`;

  const borderStyles = {
    ...baseBorderStyles,
    background: createBorderGradient(rgb),
    animation: active ? 'borderTrace 3s linear infinite' : 'none',
    filter: `drop-shadow(0 0 4px ${glowColor}) drop-shadow(0 0 8px ${glowColor})`,
  };

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={wrapperStyles}>
        <div style={borderStyles} />
        <div style={contentStyles}>
          {children}
        </div>
      </div>
    </>
  );
}

export default ActivityCard;
