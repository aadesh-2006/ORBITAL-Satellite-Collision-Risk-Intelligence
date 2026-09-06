import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoryState } from '../hooks/useStoryState';
import { ParallaxLayer } from '../components/animation/ParallaxLayer';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ProjectPipelineVisualizer } from '../components/space/ProjectPipelineVisualizer';
import { useParallax } from '../hooks/useParallax';

export const OurPlanM5Section: React.FC = () => {
  const { nextStage, goToStage } = useStoryState();
  const [phase, setPhase] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const { x: parallaxX, y: parallaxY } = useParallax(0.04);

  // Phased narrative timing sequence
  useEffect(() => {
    // Phase 1 (0s): The Plan Overview
    // Phase 2 (2.2s): Primary Dataset (ESA Challenge)
    const t2 = setTimeout(() => setPhase(2), 2200);
    // Phase 3 (5.0s): Preprocessing Sequence Pipeline
    const t3 = setTimeout(() => setPhase(3), 5000);
    // Phase 4 (7.8s): Baseline Reproduction (LSTM / GRU)
    const t4 = setTimeout(() => setPhase(4), 7800);
    // Phase 5 (10.6s): Proposed Model (Transformer)
    const t5 = setTimeout(() => setPhase(5), 10600);
    // Phase 6 (13.6s): Fair Comparison Matrix
    const t6 = setTimeout(() => setPhase(6), 13600);
    // Phase 7 (16.8s): Extension Roadmap (NASA CARA, TLE, DISCOS)
    const t7 = setTimeout(() => setPhase(7), 16800);
    // Phase 8 (20.0s): Full Project Roadmap
    const t8 = setTimeout(() => setPhase(8), 20000);
    // Phase 9 (23.2s): Final Question & Synthesis
    const t9 = setTimeout(() => setPhase(9), 23200);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
      clearTimeout(t9);
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
        if (phase < 9) {
          setPhase((p) => Math.min(p + 1, 9));
        } else {
          handleNextStage();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (phase > 1) {
          setPhase((p) => Math.max(p - 1, 1));
        } else {
          goToStage('OUR_THINKING');
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
      {/* Dynamic Project Pipeline Visualizer */}
      <ProjectPipelineVisualizer
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
          maxWidth: '960px',
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
            <div style={{ marginBottom: '14px' }}>
              <StatusBadge
                label={
                  phase <= 3
                    ? 'STAGE 04 // DATA & PREPROCESSING'
                    : phase <= 6
                    ? 'STAGE 04 // EXPERIMENTAL BENCHMARK'
                    : 'STAGE 04 // RESEARCH BLUEPRINT'
                }
                variant={phase === 9 ? 'emerald' : 'cyan'}
              />
            </div>

            {/* Narrative Statements by Phase */}
            <div
              style={{
                minHeight: '130px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AnimatePresence mode="wait">
                {/* Phase 1: The Plan */}
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
                      gap: '8px',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 'clamp(2.2rem, 4.8vw, 3.4rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.03em',
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                        textShadow: '0 0 35px rgba(255, 255, 255, 0.18)',
                      }}
                    >
                      OUR PLAN
                    </h2>
                    <div
                      className="telemetry-mono"
                      style={{
                        fontSize: '0.74rem',
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.14em',
                      }}
                    >
                      FROM DATA TO PREDICTION
                    </div>
                  </motion.div>
                )}

                {/* Phase 2: Data (ESA Challenge) */}
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
                    <div
                      className="telemetry-mono"
                      style={{
                        color: 'var(--accent-cyan)',
                        fontSize: '0.74rem',
                        letterSpacing: '0.14em',
                      }}
                    >
                      DATA
                    </div>
                    <h2
                      style={{
                        fontSize: 'clamp(1.8rem, 3.8vw, 2.6rem)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      PRIMARY DATASET
                    </h2>
                  </motion.div>
                )}

                {/* Phase 3: Preprocessing */}
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
                      gap: '8px',
                    }}
                  >
                    <div
                      className="telemetry-mono"
                      style={{
                        color: 'var(--accent-cyan)',
                        fontSize: '0.74rem',
                        letterSpacing: '0.14em',
                      }}
                    >
                      PREPROCESSING
                    </div>
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
                      RAW CDMs &nbsp;→&nbsp; TEMPORAL SEQUENCES
                    </h2>
                  </motion.div>
                )}

                {/* Phase 4: Baseline Reproduction */}
                {phase === 4 && (
                  <motion.div
                    key="phase4"
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
                    <div
                      className="telemetry-mono"
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.14em',
                      }}
                    >
                      FIRST: REPRODUCE THE BASELINE
                    </div>
                    <h2
                      style={{
                        fontSize: 'clamp(1.8rem, 3.8vw, 2.6rem)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      BASELINE
                    </h2>
                  </motion.div>
                )}

                {/* Phase 5: Proposed Model */}
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
                    <div
                      className="telemetry-mono"
                      style={{
                        color: 'var(--accent-emerald)',
                        fontSize: '0.74rem',
                        letterSpacing: '0.14em',
                      }}
                    >
                      TRANSFORMER / ATTENTION
                    </div>
                    <h2
                      style={{
                        fontSize: 'clamp(1.8rem, 3.8vw, 2.6rem)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      PROPOSED MODEL
                    </h2>
                  </motion.div>
                )}

                {/* Phase 6: Fair Comparison */}
                {phase === 6 && (
                  <motion.div
                    key="phase6"
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
                    <div
                      className="telemetry-mono"
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.74rem',
                        letterSpacing: '0.14em',
                      }}
                    >
                      EVALUATION
                    </div>
                    <h2
                      style={{
                        fontSize: 'clamp(1.8rem, 3.8vw, 2.6rem)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      FAIR COMPARISON
                    </h2>
                  </motion.div>
                )}

                {/* Phase 7: Extension Roadmap */}
                {phase === 7 && (
                  <motion.div
                    key="phase7"
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
                    <div
                      className="telemetry-mono"
                      style={{
                        color: 'var(--accent-amber)',
                        fontSize: '0.74rem',
                        letterSpacing: '0.14em',
                      }}
                    >
                      EXTENSIONS
                    </div>
                    <h2
                      style={{
                        fontSize: 'clamp(1.8rem, 3.8vw, 2.6rem)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      CORE &nbsp;+&nbsp; EXTENSION ROADMAP
                    </h2>
                  </motion.div>
                )}

                {/* Phase 8: Project Roadmap */}
                {phase === 8 && (
                  <motion.div
                    key="phase8"
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
                    <div
                      className="telemetry-mono"
                      style={{
                        color: 'var(--accent-emerald)',
                        fontSize: '0.74rem',
                        letterSpacing: '0.14em',
                      }}
                    >
                      PROJECT ROADMAP
                    </div>
                    <h2
                      style={{
                        fontSize: 'clamp(1.8rem, 3.8vw, 2.6rem)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      FINAL PROTOTYPE
                    </h2>
                  </motion.div>
                )}

                {/* Phase 9: Final Question & Synthesis */}
                {phase === 9 && (
                  <motion.div
                    key="phase9"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '16px',
                      maxWidth: '820px',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 'clamp(1.7rem, 3.6vw, 2.6rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.025em',
                        color: '#ffffff',
                        lineHeight: 1.2,
                        fontFamily: 'var(--font-display)',
                        textShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
                        margin: 0,
                      }}
                    >
                      Can we learn collision risk from how a conjunction evolves over time?
                    </h2>

                    <div
                      className="telemetry-mono"
                      style={{
                        fontSize: '0.76rem',
                        color: 'var(--accent-cyan)',
                        letterSpacing: '0.14em',
                      }}
                    >
                      DATA → SEQUENCE → MODEL → RISK
                    </div>

                    {/* Action trigger to proceed into M6 */}
                    <div
                      style={{
                        marginTop: '16px',
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
                        <span>EXPLORE OUR APPROACH</span>
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
              goToStage('OUR_THINKING');
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((p) => (
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
            if (phase < 9) {
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
          {phase < 9 ? 'NEXT' : 'CONTINUE'}
        </button>
      </div>
    </div>
  );
};
