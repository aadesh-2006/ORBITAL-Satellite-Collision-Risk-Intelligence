import React from 'react';
import { motion } from 'framer-motion';
import { useStoryState } from '../hooks/useStoryState';
import { ParallaxLayer } from '../components/animation/ParallaxLayer';
import { FadeIn } from '../components/animation/FadeIn';
import { CrosshairFrame } from '../components/ui/CrosshairFrame';
import { StatusBadge } from '../components/ui/StatusBadge';

export const FinalSystemM9Placeholder: React.FC = () => {
  const { goToStage } = useStoryState();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}
    >
      <ParallaxLayer depth={12}>
        <CrosshairFrame
          size={10}
          color="rgba(255, 255, 255, 0.2)"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '680px',
            padding: '32px 40px',
          }}
        >
          <FadeIn direction="down" distance={10} duration={0.8}>
            <StatusBadge
              label="STAGE 08 // FINAL SYSTEM & DASHBOARD"
              variant="emerald"
            />
          </FadeIn>

          <FadeIn direction="up" distance={16} duration={1.0} delay={0.1}>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                marginTop: '16px',
                fontFamily: 'var(--font-display)',
              }}
            >
              Operational System Interface
            </h2>
          </FadeIn>

          <FadeIn direction="up" distance={12} duration={0.8} delay={0.2}>
            <div
              className="telemetry-mono"
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.72rem',
                marginTop: '8px',
                letterSpacing: '0.1em',
              }}
            >
              [ M9 MODULE TARGET — STANDING BY ]
            </div>
          </FadeIn>

          <FadeIn direction="up" distance={10} duration={0.8} delay={0.3}>
            <button
              onClick={() => goToStage('PREDICTION')}
              style={{
                marginTop: '28px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                padding: '8px 18px',
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
            >
              ← RETURN TO SIMULATED PREDICTION (M8)
            </button>
          </FadeIn>
        </CrosshairFrame>
      </ParallaxLayer>
    </motion.div>
  );
};
