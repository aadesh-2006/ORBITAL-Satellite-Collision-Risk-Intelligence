import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoryState } from '../hooks/useStoryState';
import { ParallaxLayer } from '../components/animation/ParallaxLayer';
import { FadeIn } from '../components/animation/FadeIn';
import { CrosshairFrame } from '../components/ui/CrosshairFrame';
import { StatusBadge } from '../components/ui/StatusBadge';
import { EnterMissionButton } from '../components/ui/EnterMissionButton';

interface LandingM1SectionProps {
  onPhaseChange?: (phase: number) => void;
  isTransitioning?: boolean;
  onEnterMission?: () => void;
}

export const LandingM1Section: React.FC<LandingM1SectionProps> = ({
  onPhaseChange,
  isTransitioning = false,
  onEnterMission,
}) => {
  const { nextStage } = useStoryState();
  const [sequencePhase, setSequencePhase] = useState<number>(1);

  // Choreographed sequence timing
  useEffect(() => {
    // Phase 1 (0s): Deep space pristine silence
    // Phase 2 (1.2s): Earth emerges
    const t2 = setTimeout(() => {
      setSequencePhase(2);
      onPhaseChange?.(2);
    }, 1200);

    // Phase 3 (2.6s): Orbital environment & satellite trajectories emerge
    const t3 = setTimeout(() => {
      setSequencePhase(3);
      onPhaseChange?.(3);
    }, 2600);

    // Phase 4 (4.0s): Project title & identity revealed
    const t4 = setTimeout(() => {
      setSequencePhase(4);
      onPhaseChange?.(4);
    }, 4000);

    // Phase 5 (5.2s): Mission status telemetry
    const t5 = setTimeout(() => {
      setSequencePhase(5);
      onPhaseChange?.(5);
    }, 5200);

    // Phase 6 (6.2s): Enter Mission interaction
    const t6 = setTimeout(() => {
      setSequencePhase(6);
      onPhaseChange?.(6);
    }, 6200);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onPhaseChange]);

  const handleEnterMission = useCallback(() => {
    if (onEnterMission) {
      onEnterMission();
    } else {
      nextStage();
    }
  }, [onEnterMission, nextStage]);

  // Keyboard trigger for Enter / Space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleEnterMission();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEnterMission]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="landing-m1-content"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isTransitioning ? 0 : 1,
          scale: isTransitioning ? 1.08 : 1,
          filter: isTransitioning ? 'blur(8px)' : 'blur(0px)',
        }}
        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          zIndex: 10,
        }}
      >
        <ParallaxLayer depth={18} rotateDepth={1.2}>
          <CrosshairFrame
            size={12}
            color="rgba(255, 255, 255, 0.2)"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '820px',
              padding: '36px 48px',
            }}
          >
            {/* Phase 5: Mission Status Indicator */}
            <div
              style={{
                minHeight: '28px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {sequencePhase >= 5 && (
                <FadeIn direction="down" distance={10} duration={0.8}>
                  <StatusBadge
                    label="MISSION STATUS // READY"
                    variant="emerald"
                  />
                </FadeIn>
              )}
            </div>

            {/* Phase 4: Main Project Title */}
            <div
              style={{
                minHeight: '80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {sequencePhase >= 4 && (
                <FadeIn direction="up" distance={22} duration={1.2}>
                  <h1
                    style={{
                      fontSize: 'clamp(3.4rem, 7.5vw, 6.2rem)',
                      fontWeight: 600,
                      letterSpacing: '-0.035em',
                      lineHeight: 1.02,
                      color: '#ffffff',
                      margin: 0,
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-display)',
                      textShadow: '0 0 40px rgba(255, 255, 255, 0.18)',
                    }}
                  >
                    ORBITAL
                  </h1>
                </FadeIn>
              )}
            </div>

            {/* Phase 4: Secondary Title */}
            <div
              style={{
                minHeight: '36px',
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {sequencePhase >= 4 && (
                <FadeIn direction="up" distance={16} duration={1.0} delay={0.15}>
                  <div
                    style={{
                      fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)',
                      fontWeight: 300,
                      letterSpacing: '0.03em',
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    Satellite Collision Risk Intelligence
                  </div>
                </FadeIn>
              )}
            </div>

            {/* Phase 4: Descriptor */}
            <div
              style={{
                minHeight: '26px',
                marginTop: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {sequencePhase >= 4 && (
                <FadeIn direction="up" distance={12} duration={0.9} delay={0.3}>
                  <div
                    className="telemetry-mono"
                    style={{
                      fontSize: '0.74rem',
                      letterSpacing: '0.12em',
                      color: 'var(--text-tertiary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Deep Learning for Satellite Conjunction Risk Prediction
                  </div>
                </FadeIn>
              )}
            </div>

            {/* Phase 6: Enter Mission Interaction */}
            <div
              style={{
                minHeight: '64px',
                marginTop: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {sequencePhase >= 6 && (
                <FadeIn direction="up" distance={14} duration={0.8}>
                  <EnterMissionButton
                    onEnter={handleEnterMission}
                    disabled={isTransitioning}
                  />
                </FadeIn>
              )}
            </div>
          </CrosshairFrame>
        </ParallaxLayer>
      </motion.div>
    </AnimatePresence>
  );
};
