import React from 'react';
import { FadeIn } from '../components/animation/FadeIn';
import { StaggerContainer } from '../components/animation/StaggerContainer';
import { ParallaxLayer } from '../components/animation/ParallaxLayer';
import { TelemetryText } from '../components/animation/TelemetryText';
import { CrosshairFrame } from '../components/ui/CrosshairFrame';
import { StatusBadge } from '../components/ui/StatusBadge';

export const FoundationM0Section: React.FC = () => {
  return (
    <ParallaxLayer depth={16} rotateDepth={1.5}>
      <CrosshairFrame
        size={10}
        color="rgba(255, 255, 255, 0.22)"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '780px',
        }}
      >
        <StaggerContainer
          staggerChildren={0.16}
          delayChildren={0.2}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Status Indicator */}
          <FadeIn direction="down" distance={12} duration={0.8}>
            <StatusBadge
              label="SYS.INIT // FOUNDATION INITIALIZED"
              variant="emerald"
            />
          </FadeIn>

          {/* Primary Cinematic Title */}
          <FadeIn direction="up" distance={20} duration={1.1}>
            <h1
              style={{
                fontSize: 'clamp(3.2rem, 7vw, 5.8rem)',
                fontWeight: 600,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: '#ffffff',
                margin: 0,
                textTransform: 'uppercase',
                fontFamily: 'var(--font-display)',
                textShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
              }}
            >
              ORBITAL
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn direction="up" distance={16} duration={1.0}>
            <div
              style={{
                fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
                fontWeight: 300,
                letterSpacing: '0.04em',
                color: 'var(--text-secondary)',
                maxWidth: '560px',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Satellite Collision Risk Intelligence
            </div>
          </FadeIn>

          {/* Aerospace Telemetry Sub-panel */}
          <FadeIn direction="up" distance={14} duration={0.9}>
            <div
              style={{
                marginTop: '16px',
                padding: '12px 20px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-hairline)',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              <div
                className="telemetry-mono"
                style={{
                  color: 'var(--text-tertiary)',
                  fontSize: '0.7rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>STAGE:</span>
                <span style={{ color: 'var(--text-primary)' }}>
                  <TelemetryText text="M0 / FOUNDATION" delay={400} />
                </span>
              </div>

              <div
                style={{
                  width: '1px',
                  height: '14px',
                  backgroundColor: 'var(--border-subtle)',
                }}
              />

              <div
                className="telemetry-mono"
                style={{
                  color: 'var(--text-tertiary)',
                  fontSize: '0.7rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>ENVIRONMENT:</span>
                <span style={{ color: 'var(--accent-cyan)' }}>DEEP-SPACE</span>
              </div>
            </div>
          </FadeIn>
        </StaggerContainer>
      </CrosshairFrame>
    </ParallaxLayer>
  );
};
