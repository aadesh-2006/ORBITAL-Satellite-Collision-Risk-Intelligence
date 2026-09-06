import React from 'react';
import { PRESENTATION_SCREENS } from './presentationData';

interface PresentationHUDProps {
  currentScreen: number;
  totalScreens: number;
  onGoToScreen: (screenId: number) => void;
  onToggleDetailedMode?: () => void;
}

export const PresentationHUD: React.FC<PresentationHUDProps> = ({
  currentScreen,
  totalScreens,
  onGoToScreen,
  onToggleDetailedMode,
}) => {
  const currentMeta = PRESENTATION_SCREENS[currentScreen - 1] || PRESENTATION_SCREENS[0];

  return (
    <header
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 36px',
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Left: Project Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 12px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '3px',
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-emerald)',
                boxShadow: '0 0 8px var(--accent-emerald)',
              }}
            />
            <span
              className="telemetry-mono"
              style={{
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
              }}
            >
              ORBITAL
            </span>
          </div>

          <span
            className="telemetry-mono"
            style={{
              color: 'var(--text-tertiary)',
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
            }}
          >
            PRESENTATION MODE // {currentScreen.toString().padStart(2, '0')} OF {totalScreens.toString().padStart(2, '0')}
          </span>
        </div>

        {/* Right: Target Screen Time & Optional Mode Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'auto' }}>
          <div
            className="telemetry-mono"
            style={{
              color: 'var(--text-tertiary)',
              fontSize: '0.65rem',
              letterSpacing: '0.08em',
              padding: '4px 8px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '2px',
            }}
          >
            ⏱ TARGET: {currentMeta.timeEstimate}
          </div>

          {onToggleDetailedMode && (
            <button
              onClick={onToggleDetailedMode}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                padding: '4px 10px',
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = 'var(--border-strong)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
              title="Switch to detailed M0–M10 research story"
            >
              📖 DETAILED STORY
            </button>
          )}
        </div>
      </div>

      {/* Bottom Footer Navigation Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Left: Keyboard Control Hint */}
        <div
          className="telemetry-mono"
          style={{
            color: 'var(--text-tertiary)',
            fontSize: '0.66rem',
            letterSpacing: '0.08em',
          }}
        >
          KEYS: [← / →] SCREEN // [SPACE / ENTER] ADVANCE // [HOME] RESET
        </div>

        {/* Center/Right: Screen Dots Navigator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            pointerEvents: 'auto',
            background: 'rgba(6, 10, 16, 0.8)',
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {PRESENTATION_SCREENS.map((s) => (
            <button
              key={s.id}
              onClick={() => onGoToScreen(s.id)}
              style={{
                width: currentScreen === s.id ? '24px' : '7px',
                height: '6px',
                borderRadius: '3px',
                backgroundColor:
                  currentScreen === s.id
                    ? 'var(--accent-emerald)'
                    : currentScreen > s.id
                    ? 'var(--text-secondary)'
                    : 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
              title={`Screen ${s.code}: ${s.title}`}
            />
          ))}
        </div>
      </div>
    </header>
  );
};
