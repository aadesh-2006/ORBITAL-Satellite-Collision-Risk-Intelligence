import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoryState } from '../hooks/useStoryState';
import { ParallaxLayer } from '../components/animation/ParallaxLayer';
import { CrosshairFrame } from '../components/ui/CrosshairFrame';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ConjunctionVisualizer } from '../components/space/ConjunctionVisualizer';
import { useParallax } from '../hooks/useParallax';

export const ProblemM2Section: React.FC = () => {
  const { currentStageId, nextStage, goToStage } = useStoryState();
  const [phase, setPhase] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const { x: parallaxX, y: parallaxY } = useParallax(0.04);

  // Phased narrative timing sequence
  useEffect(() => {
    // Phase 1 (0s): Initial orbital traffic established
    // Phase 2 (1.8s): First statements revealed
    const t2 = setTimeout(() => setPhase(2), 1800);
    // Phase 3 (4.8s): Focus narrows to two specific orbital objects
    const t3 = setTimeout(() => setPhase(3), 4800);
    // Phase 4 (7.4s): Trajectories converge toward closest approach (TCA)
    const t4 = setTimeout(() => setPhase(4), 7400);
    // Phase 5 (10.2s): Miss distance measurement visualized
    const t5 = setTimeout(() => setPhase(5), 10200);
    // Phase 6 (13.0s): Core research question emerges ("But how risky is it?")
    const t6 = setTimeout(() => setPhase(6), 13000);
    // Phase 7 (16.0s): Conjunction identification alert & parameter readouts
    const t7 = setTimeout(() => setPhase(7), 16000);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
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
      if (currentStageId !== 'PROBLEM') return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (phase < 7) {
          setPhase((p) => Math.min(p + 1, 7));
        } else {
          handleNextStage();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (phase > 1) {
          setPhase((p) => Math.max(p - 1, 1));
        } else {
          goToStage('LANDING');
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        setPhase(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setPhase(7);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, currentStageId, goToStage, handleNextStage]);

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
      {/* Dynamic Conjunction & Trajectory Visualizer */}
      <ConjunctionVisualizer
        phase={phase}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
      />

      {/* Main Narrative Overlays */}
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
            {/* Top Phase Header / Narrative Statement */}
            <div
              style={{
                minHeight: '120px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
              }}
            >
              <AnimatePresence mode="wait">
                {/* Phase 1 & 2: Thousands of objects / Most never come close */}
                {phase <= 2 && (
                  <motion.div
                    key="phase1-2"
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
                    <p
                      style={{
                        fontSize: 'clamp(1.35rem, 2.6vw, 1.85rem)',
                        fontWeight: 300,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                        maxWidth: '680px',
                        lineHeight: 1.4,
                      }}
                    >
                      Thousands of objects share Earth's orbit.
                    </p>
                    {phase >= 2 && (
                      <p
                        style={{
                          fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                          fontWeight: 300,
                          color: 'var(--text-secondary)',
                          letterSpacing: '0.02em',
                        }}
                      >
                        Most of them never come close.
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Phase 3 & 4: Trajectory Focus & TCA */}
                {(phase === 3 || phase === 4) && (
                  <motion.div
                    key="phase3-4"
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
                    <StatusBadge
                      label="TRAJECTORY INTERSECTION DETECTED"
                      variant="amber"
                    />
                    <div
                      className="telemetry-mono"
                      style={{
                        fontSize: '0.85rem',
                        letterSpacing: '0.14em',
                        color: 'var(--text-primary)',
                        marginTop: '8px',
                      }}
                    >
                      TCA // TIME OF CLOSEST APPROACH
                    </div>
                  </motion.div>
                )}

                {/* Phase 5: Miss Distance */}
                {phase === 5 && (
                  <motion.div
                    key="phase5"
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
                    <StatusBadge label="PROXIMITY METRICS" variant="ruby" />
                    <h2
                      style={{
                        fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      MISS DISTANCE
                    </h2>
                    <div
                      className="telemetry-mono"
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-tertiary)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      [ ILLUSTRATIVE / DEMO SIMULATION ]
                    </div>
                  </motion.div>
                )}

                {/* Phase 6: The Question */}
                {phase === 6 && (
                  <motion.div
                    key="phase6"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '14px',
                      maxWidth: '720px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
                        fontWeight: 300,
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.01em',
                        lineHeight: 1.4,
                      }}
                    >
                      A close approach does not necessarily mean a collision.
                    </p>
                    <h2
                      style={{
                        fontSize: 'clamp(2.2rem, 4.8vw, 3.4rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.03em',
                        color: '#ffffff',
                        lineHeight: 1.1,
                        fontFamily: 'var(--font-display)',
                        textShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      But how risky is it?
                    </h2>
                  </motion.div>
                )}

                {/* Phase 7: Conjunction Detected Alert & Parameters */}
                {phase === 7 && (
                  <motion.div
                    key="phase7"
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
                      color="rgba(248, 113, 113, 0.4)"
                      style={{
                        padding: '24px 36px',
                        background: 'rgba(10, 12, 14, 0.75)',
                        border: '1px solid rgba(248, 113, 113, 0.3)',
                        borderRadius: '2px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px',
                        maxWidth: '580px',
                      }}
                    >
                      {/* Conjunction Alert Header */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--accent-ruby)',
                            boxShadow: '0 0 10px var(--accent-ruby)',
                          }}
                        />
                        <span
                          className="telemetry-mono"
                          style={{
                            color: '#f87171',
                            fontSize: '0.85rem',
                            letterSpacing: '0.18em',
                            fontWeight: 600,
                          }}
                        >
                          CONJUNCTION DETECTED
                        </span>
                      </div>

                      {/* Primary Telemetry Parameters */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '24px',
                          width: '100%',
                          marginTop: '8px',
                          paddingTop: '16px',
                          borderTop: '1px solid var(--border-subtle)',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <span
                            className="telemetry-mono"
                            style={{
                              color: 'var(--text-muted)',
                              fontSize: '0.65rem',
                            }}
                          >
                            TCA
                          </span>
                          <span
                            className="telemetry-mono"
                            style={{
                              color: 'var(--text-primary)',
                              fontSize: '0.9rem',
                              fontWeight: 500,
                            }}
                          >
                            T-00:00:00
                          </span>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <span
                            className="telemetry-mono"
                            style={{
                              color: 'var(--text-muted)',
                              fontSize: '0.65rem',
                            }}
                          >
                            MISS DISTANCE
                          </span>
                          <span
                            className="telemetry-mono"
                            style={{
                              color: '#f87171',
                              fontSize: '0.9rem',
                              fontWeight: 500,
                            }}
                          >
                            742 m
                          </span>
                        </div>
                      </div>

                      {/* Sub-label note */}
                      <div
                        className="telemetry-mono"
                        style={{
                          fontSize: '0.6rem',
                          color: 'var(--text-muted)',
                          letterSpacing: '0.08em',
                          marginTop: '4px',
                        }}
                      >
                        [ ILLUSTRATIVE PARAMETERS ]
                      </div>
                    </CrosshairFrame>

                    {/* Next Action Trigger */}
                    <div
                      style={{
                        marginTop: '28px',
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
                        <span>ADVANCE ANALYSIS</span>
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

      {/* Interactive Phase Timeline Stepper at bottom */}
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
              goToStage('LANDING');
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
          {[1, 2, 3, 4, 5, 6, 7].map((p) => (
            <button
              key={p}
              onClick={() => setPhase(p)}
              style={{
                width: phase === p ? '18px' : '6px',
                height: '5px',
                borderRadius: '3px',
                backgroundColor:
                  phase === p
                    ? 'var(--accent-emerald)'
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
            if (phase < 7) {
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
          {phase < 7 ? 'NEXT' : 'CONTINUE'}
        </button>
      </div>
    </div>
  );
};
