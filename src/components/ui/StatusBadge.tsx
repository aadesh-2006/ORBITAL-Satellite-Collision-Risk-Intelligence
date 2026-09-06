import React from 'react';

interface StatusBadgeProps {
  label: string;
  variant?: 'emerald' | 'amber' | 'cyan' | 'ruby' | 'monochrome';
  dot?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'emerald',
  dot = true,
  className = '',
}) => {
  const getDotColor = () => {
    switch (variant) {
      case 'amber':
        return 'var(--accent-amber)';
      case 'cyan':
        return 'var(--accent-cyan)';
      case 'ruby':
        return 'var(--accent-ruby)';
      case 'monochrome':
        return 'var(--text-secondary)';
      case 'emerald':
      default:
        return 'var(--accent-emerald)';
    }
  };

  return (
    <div
      className={`telemetry-mono ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '2px',
        fontSize: '0.68rem',
        letterSpacing: '0.12em',
        color: 'var(--text-secondary)',
      }}
    >
      {dot && (
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: getDotColor(),
            boxShadow: `0 0 8px ${getDotColor()}`,
          }}
        />
      )}
      <span>{label}</span>
    </div>
  );
};
