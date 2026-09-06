import React, { useEffect, useState } from 'react';
import { useStoryState } from '../../hooks/useStoryState';

export const TelemetryHUD: React.FC = () => {
  const { currentStage } = useStoryState();
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 32px',
      }}
    >
      {/* Top Telemetry Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        {/* Left: Project & Mission Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div
            className="telemetry-mono"
            style={{
              color: 'var(--text-primary)',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: 'var(--text-secondary)' }}>MISSION //</span>
            <span>ORBITAL RESEARCH</span>
            <span style={{ color: 'var(--border-strong)' }}>|</span>
            <span style={{ color: 'var(--accent-emerald)' }}>M0 FOUNDATION</span>
          </div>

          <div
            className="telemetry-mono"
            style={{
              color: 'var(--text-tertiary)',
              fontSize: '0.62rem',
              letterSpacing: '0.08em',
            }}
          >
            SATELLITE COLLISION RISK INTELLIGENCE PLATFORM
          </div>
        </div>

        {/* Right: Astrodynamic Ephemeris Readout */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '4px',
          }}
        >
          <div
            className="telemetry-mono"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
            }}
          >
            {timeString || '2026-09-06 15:58:00 UTC'}
          </div>
          <div
            className="telemetry-mono"
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.62rem',
              letterSpacing: '0.08em',
              display: 'flex',
              gap: '12px',
            }}
          >
            <span>ALT: {currentStage.orbitalAltitudeKm.toFixed(1)} KM</span>
            <span>INC: {currentStage.inclinationDeg.toFixed(1)}°</span>
            <span>ENV: {currentStage.atmosphere.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '100%',
        }}
      >
        {/* Left: System Status Telemetry */}
        <div
          className="telemetry-mono"
          style={{
            color: 'var(--text-tertiary)',
            fontSize: '0.62rem',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-emerald)',
              }}
            />
            <span>SYSTEM: NOMINAL</span>
          </div>
          <span>ASTRODYNAMICS: INITIALIZED</span>
          <span>GPU: ACCELERATED</span>
        </div>

        {/* Right: Technical Versioning & Coordinates */}
        <div
          className="telemetry-mono"
          style={{
            color: 'var(--text-tertiary)',
            fontSize: '0.62rem',
            letterSpacing: '0.12em',
          }}
        >
          <span>ORBITAL-SCI // V0.1.0-M0</span>
        </div>
      </div>
    </header>
  );
};
