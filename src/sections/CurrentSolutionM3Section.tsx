import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoryState } from '../hooks/useStoryState';
import { ParallaxLayer } from '../components/animation/ParallaxLayer';
import { CrosshairFrame } from '../components/ui/CrosshairFrame';
import { StatusBadge } from '../components/ui/StatusBadge';
import { CDMSequenceVisualizer } from '../components/space/CDMSequenceVisualizer';
import { useParallax } from '../hooks/useParallax';

export const CurrentSolutionM3Section: React.FC = () => {
  const { nextStage, goToStage } = useStoryState();
  const [phase, setPhase] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const { x: parallaxX, y: parallaxY } = useParallax(0.04);

  // Phased narrative timing sequence
  useEffect(() => {
    // Phase 1 (0s): Conjunction Identified & Isolated
    // Phase 2 (2.4s): Information Arrives — CDM
    const t2 = setTimeout(() => setPhase(2), 2400);
    // Phase 3 (5.6s): Representative Parameters
    const t3 = setTimeout(() => setPhase(3), 5600);
    // Phase 4 (9.0s): Risk Assessment & Collision Probability
    const t4 = setTimeout(() => setPhase(4), 9000);
    // Phase 5 (12.4s): Conjunction as a Sequence & Motivation Question
    const t5 = setTimeout(() => setPhase(5), 12400);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const handleNextStage = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      nextStage();
    }, 1000);
  }, [nextStage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (phase < 5) {
          setPhase((p) => Math.min(p + 1, 5));
        } else {
          handleNextStage();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (phase > 1) {
          setPhase((p) => Math.max(p - 1, 1));
        } else {
          goToStage('PROBLEM');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, goToStage, handleNextStage]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Dynamic CDM & Sequence Visualizer */}
      <CDMSequenceVisualizer
        phase={phase}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
      />

      {/* Main Narrative Content Container */}
      <motion.div
        animate={{
          opacity: isTransitioning ? 0 : 1,
          scale: isTransitioning ? 1.08 : 1,
          filter: isTransitioning ? 'blur(6px)' : 'blur(0px)',
        }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '920px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <ParallaxLayer depth={14} rotateDepth={1.0}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              width: '100%',
            }}
          >
            {/* Header Stage Badge */}
            <div style={{ marginBottom: '16px' }}>
              <StatusBadge
                label={
                  phase <= 3
                    ? 'STAGE 02 // CONVENTIONAL ASSESSMENT'
                    : 'STAGE 02 // TEMPORAL OBSERVATIONS'
                }
                variant={phase === 5 ? 'cyan' : 'emerald'}
              />
            </div>

            {/* Narrative Statements by Phase */}
            <div
              style={{
                minHeight: '140px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AnimatePresence mode="wait">
                {/* Phase 1: From Conjunction to Question */}
                {phase === 1 && (
                  <motion.div
                    key="phase1"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div
                      className="telemetry-mono"
                      style={{
                        color: 'var(--accent-ruby)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.14em',
                      }}
                    >
                      CONJUNCTION DETECTED
                    </div>
                    <h2
                      style={{
                        fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      But how risky is it?
                    </h2>
                  </motion.div>
                )}

                {/* Phase 2: Conjunction Data Message (CDM) */}
                {phase === 2 && (
                  <motion.div
                    key="phase2"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      CONJUNCTION DATA MESSAGE
                    </h2>
                    <div
                      className="telemetry-mono"
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--accent-cyan)',
                        letterSpacing: '0.18em',
                        fontWeight: 600,
                      }}
                    >
                      CDM
                    </div>
                  </motion.div>
                )}

                {/* Phase 3: What Information Matters? */}
                {phase === 3 && (
                  <motion.div
                    key="phase3"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                        fontWeight: 400,
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      CONJUNCTION DATA MESSAGE
                    </h2>
                    <div
                      className="telemetry-mono"
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-tertiary)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      [ REPRESENTATIVE ENCOUNTER PARAMETERS ]
                    </div>
                  </motion.div>
                )}

                {/* Phase 4: Risk Assessment & Collision Probability */}
                {phase === 4 && (
                  <motion.div
                    key="phase4"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <CrosshairFrame
                      size={10}
                      color="rgba(255, 255, 255, 0.25)"
                      style={{
                        padding: '24px 36px',
                        background: 'rgba(10, 12, 14, 0.8)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '2px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        maxWidth: '560px',
                      }}
                    >
                      <div
                        className="telemetry-mono"
                        style={{
                          color: 'var(--text-secondary)',
                          fontSize: '0.72rem',
                          letterSpacing: '0.14em',
                        }}
                      >
                        RISK ASSESSMENT
                      </div>

                      <h2
                        style={{
                          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                          fontWeight: 500,
                          color: '#ffffff',
                          letterSpacing: '-0.02em',
                          margin: 0,
                          fontFamily: 'var(--font-display)',
                        }}
                      >
                        COLLISION PROBABILITY
                      </h2>

                      <div
                        className="telemetry-mono"
                        style={{
                          fontSize: '0.65rem',
                          color: 'var(--text-tertiary)',
                          letterSpacing: '0.1em',
                          marginTop: '4px',
                        }}
                      >
                        [ ILLUSTRATIVE / DEMO CALCULATION ]
                      </div>
                    </CrosshairFrame>
                  </motion.div>
                )}

                {/* Phase 5: Sequential Observations & The Core Research Question */}
                {phase === 5 && (
                  <motion.div
                    key="phase5"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '16px',
                      maxWidth: '780px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
                        fontWeight: 300,
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.01em',
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      Each conjunction evolves over time.
                    </p>

                    <h2
                      style={{
                        fontSize: 'clamp(2.0rem, 4.4vw, 3.2rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.03em',
                        color: '#ffffff',
                        lineHeight: 1.15,
                        fontFamily: 'var(--font-display)',
                        textShadow: '0 0 35px rgba(255, 255, 255, 0.18)',
                        margin: 0,
                      }}
                    >
                      What if we could learn from that sequence?
                    </h2>

                    {/* Action trigger to proceed into M4 */}
                    <div
                      style={{
                        marginTop: '20px',
                        pointerEvents: 'auto',
                      }}
                    >
                      <button
                        onClick={handleNextStage}
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.74rem',
                          letterSpacing: '0.16em',
                          padding: '10px 24px',
                          cursor: 'pointer',
                          borderRadius: '2px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.25s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.borderColor = 'var(--border-strong)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                          e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        }}
                      >
                        <span>EXPLORE OUR THINKING</span>
                        <span>→</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ParallaxLayer>
      </motion.div>

      {/* Interactive Phase Stepper at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          zIndex: 25,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(5, 7, 9, 0.75)',
          padding: '6px 16px',
          borderRadius: '20px',
          border: '1px solid var(--border-hairline)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <button
          onClick={() => {
            if (phase > 1) {
              setPhase((p) => p - 1);
            } else {
              goToStage('PROBLEM');
            }
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-tertiary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            cursor: 'pointer',
            padding: '2px 6px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
        >
          PREV
        </button>

        {/* Phase Indicator Dots */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {[1, 2, 3, 4, 5].map((p) => (
            <button
              key={p}
              onClick={() => setPhase(p)}
              style={{
                width: phase === p ? '18px' : '6px',
                height: '5px',
                borderRadius: '3px',
                backgroundColor:
                  phase === p
                    ? 'var(--accent-cyan)'
                    : phase > p
                    ? 'var(--text-tertiary)'
                    : 'var(--border-strong)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
              title={`Phase ${p}`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            if (phase < 5) {
              setPhase((p) => p + 1);
            } else {
              handleNextStage();
            }
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-tertiary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            cursor: 'pointer',
            padding: '2px 6px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
        >
          {phase < 5 ? 'NEXT' : 'CONTINUE'}
        </button>
      </div>
    </div>
  );
};
