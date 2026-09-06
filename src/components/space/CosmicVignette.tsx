import React from 'react';

export const CosmicVignette: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0, 0, 0, 0.75) 100%)',
        zIndex: 3,
      }}
    />
  );
};
