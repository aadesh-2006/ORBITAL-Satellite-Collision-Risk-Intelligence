import React from 'react';

interface CrosshairFrameProps {
  children: React.ReactNode;
  size?: number; // Size of corner ticks in px
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const CrosshairFrame: React.FC<CrosshairFrameProps> = ({
  children,
  size = 8,
  color = 'rgba(255, 255, 255, 0.3)',
  className = '',
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        padding: '24px 32px',
        ...style,
      }}
    >
      {/* Top-Left Corner */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: size,
          height: size,
          borderTop: `1px solid ${color}`,
          borderLeft: `1px solid ${color}`,
          pointerEvents: 'none',
        }}
      />
      {/* Top-Right Corner */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: size,
          height: size,
          borderTop: `1px solid ${color}`,
          borderRight: `1px solid ${color}`,
          pointerEvents: 'none',
        }}
      />
      {/* Bottom-Left Corner */}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: size,
          height: size,
          borderBottom: `1px solid ${color}`,
          borderLeft: `1px solid ${color}`,
          pointerEvents: 'none',
        }}
      />
      {/* Bottom-Right Corner */}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: size,
          height: size,
          borderBottom: `1px solid ${color}`,
          borderRight: `1px solid ${color}`,
          pointerEvents: 'none',
        }}
      />

      {children}
    </div>
  );
};
