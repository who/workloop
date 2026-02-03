import React from 'react';

const cardStyles = {
  width: '300px',
  height: '180px',
  borderRadius: '12px',
  backgroundColor: 'rgba(128, 128, 128, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function ActivityCard({ children, active, color }) {
  return (
    <div style={cardStyles}>
      {children}
    </div>
  );
}

export default ActivityCard;
