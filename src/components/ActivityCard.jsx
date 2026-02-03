import React from 'react';

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

const borderStyles = {
  position: 'absolute',
  inset: 0,
  borderRadius: '12px',
  padding: '2px',
  background: `conic-gradient(
    from var(--border-angle, 0deg),
    transparent 0deg,
    transparent 270deg,
    rgba(100, 180, 255, 0.1) 280deg,
    rgba(100, 180, 255, 0.5) 320deg,
    rgba(100, 180, 255, 1) 360deg
  )`,
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor',
  maskComposite: 'exclude',
  animation: 'borderTrace 3s linear infinite',
  pointerEvents: 'none',
};

const contentStyles = {
  width: '100%',
  height: '100%',
  borderRadius: '12px',
  backgroundColor: 'rgba(128, 128, 128, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function ActivityCard({ children, active, color }) {
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
