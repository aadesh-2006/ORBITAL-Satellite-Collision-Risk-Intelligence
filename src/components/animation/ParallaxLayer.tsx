import React from 'react';
import { useParallax } from '../../hooks/useParallax';

interface ParallaxLayerProps {
  children: React.ReactNode;
  depth?: number; // pixel offset at maximum mouse displacement (e.g. 15)
  rotateDepth?: number; // degree rotation at maximum displacement
  className?: string;
  style?: React.CSSProperties;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  depth = 12,
  rotateDepth = 1.2,
  className = '',
  style,
}) => {
  const { x, y } = useParallax(0.06);

  const transform = `translate3d(${x * depth}px, ${y * depth}px, 0) rotateX(${-y * rotateDepth}deg) rotateY(${x * rotateDepth}deg)`;

  return (
    <div
      className={className}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
