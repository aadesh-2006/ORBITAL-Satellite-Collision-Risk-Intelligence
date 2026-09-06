import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EnterMissionButtonProps {
  onEnter: () => void;
  disabled?: boolean;
}

export const EnterMissionButton: React.FC<EnterMissionButtonProps> = ({
  onEnter,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onEnter}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      style={{
        background: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: disabled ? 'default' : 'pointer',
        padding: '12px 28px',
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-mono)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Corner crosshairs for aerospace targeting aesthetic */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderTop: `1px solid ${isHovered ? 'var(--text-primary)' : 'var(--border-strong)'}`,
          borderLeft: `1px solid ${isHovered ? 'var(--text-primary)' : 'var(--border-strong)'}`,
          transition: 'border-color 0.3s ease',
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '6px',
          height: '6px',
          borderTop: `1px solid ${isHovered ? 'var(--text-primary)' : 'var(--border-strong)'}`,
          borderRight: `1px solid ${isHovered ? 'var(--text-primary)' : 'var(--border-strong)'}`,
          transition: 'border-color 0.3s ease',
        }}
      />
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderBottom: `1px solid ${isHovered ? 'var(--text-primary)' : 'var(--border-strong)'}`,
          borderLeft: `1px solid ${isHovered ? 'var(--text-primary)' : 'var(--border-strong)'}`,
          transition: 'border-color 0.3s ease',
        }}
      />
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '6px',
          height: '6px',
          borderBottom: `1px solid ${isHovered ? 'var(--text-primary)' : 'var(--border-strong)'}`,
          borderRight: `1px solid ${isHovered ? 'var(--text-primary)' : 'var(--border-strong)'}`,
          transition: 'border-color 0.3s ease',
        }}
      />

      {/* Main button label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.8rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontWeight: 500,
          color: isHovered ? '#ffffff' : 'var(--text-primary)',
        }}
      >
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-emerald)',
            boxShadow: isHovered
              ? '0 0 10px var(--accent-emerald)'
              : '0 0 4px var(--accent-emerald)',
            transition: 'box-shadow 0.3s ease',
          }}
        />
        <span>ENTER MISSION</span>
        <span
          style={{
            display: 'inline-block',
            transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            color: 'var(--text-secondary)',
          }}
        >
          →
        </span>
      </div>

      {/* Subtle keyboard shortcut indicator */}
      <div
        style={{
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
        }}
      >
        [ PRESS SPACE OR ENTER ]
      </div>
    </motion.button>
  );
};
