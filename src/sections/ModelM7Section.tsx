import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoryState } from '../hooks/useStoryState';
import { ParallaxLayer } from '../components/animation/ParallaxLayer';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ModelArchitectureVisualizer } from '../components/space/ModelArchitectureVisualizer';
import { useParallax } from '../hooks/useParallax';

export const ModelM7Section: React.FC = () => {
  const { currentStageId, nextStage, goToStage } = useStoryState();
  const [phase, setPhase] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const { x: parallaxX, y: parallaxY } = useParallax(0.04);

  // Phased narrative timing sequence
  useEffect(() => {
    // Phase 1 (0s): Enter the Model
    // Phase 2 (2.2s): Feature Projection
    const t2 = setTimeout(() => setPhase(2), 2200);
    // Phase 3 (4.8s): Temporal / Positional Information
    const t3 = setTimeout(() => setPhase(3), 4800);
    // Phase 4 (7.6s): Self-Attention Mechanism
    const t4 = setTimeout(() => setPhase(4), 7600);
    // Phase 5 (10.6s): Transformer Encoder Internal Structure
    const t5 = setTimeout(() => setPhase(5), 10600);
    // Phase 6 (13.6s): Multi-Layer Reasoning (Encoder x N)
    const t6 = setTimeout(() => setPhase(6), 13600);
    // Phase 7 (16.6s): Temporal Aggregation
    const t7 = setTimeout(() => setPhase(7), 16600);
    // Phase 8 (19.4s): Prediction Head
    const t8 = setTimeout(() => setPhase(8), 19400);
    // Phase 9 (22.2s): Baseline vs Proposed Architecture
    const t9 = setTimeout(() => setPhase(9), 22200);
    // Phase 10 (25.2s): Complete Architecture Blueprint & Hypothesis
    const t10 = setTimeout(() => setPhase(10), 25200);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
      clearTimeout(t9);
      clearTimeout(t10);
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
      if (currentStageId !== 'MODEL') return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (phase < 10) {
          setPhase((p) => Math.min(p + 1, 10));
        } else {
          handleNextStage();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (phase > 1) {
          setPhase((p) => Math.max(p - 1, 1));
        } else {
          goToStage('OUR_APPROACH');
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        setPhase(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setPhase(10);
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
      {/* Dynamic Model Architecture Visualizer */}
      <ModelArchitectureVisualizer
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
                    ? 'STAGE 06 // EMBEDDING & TEMPORAL ENCODING'
                    : phase <= 6
                    ? 'STAGE 06 // SELF-ATTENTION & ENCODER'
                    : phase <= 8
                    ? 'STAGE 06 // AGGREGATION & PREDICTION HEAD'
                    : 'STAGE 06 // PROPOSED AI ARCHITECTURE'
                }
                variant={phase >= 8 ? 'emerald' : 'cyan'}
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
                {/* Phase 1: Enter the Model */}
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
                      PROPOSED AI ARCHITECTURE
                    </h2>
                    <p
                      style={{
                        fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
                        fontWeight: 300,
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.02em',
                        margin: 0,
                      }}
                    >
                      How does the model learn from this sequence?
                    </p>
                  </motion.div>
                )}

                {/* Phase 2: Feature Projection */}
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
                      INPUT FEATURES &nbsp;→&nbsp; EMBEDDINGS
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
                      FEATURE PROJECTION
                    </h2>
                  </motion.div>
                )}

                {/* Phase 3: Temporal / Positional Information */}
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
                        color: 'var(--accent-amber)',
                        fontSize: '0.74rem',
                        letterSpacing: '0.14em',
                      }}
                    >
                      ORDERING MATTERS
                    </div>
                    <h2
                      style={{
                        fontSize: 'clamp(1.7rem, 3.6vw, 2.5rem)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      TEMPORAL / POSITIONAL INFORMATION
                    </h2>
                  </motion.div>
                )}

                {/* Phase 4: Self-Attention */}
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
                      maxWidth: '780px',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 'clamp(2.0rem, 4.4vw, 3.0rem)',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        color: 'var(--accent-emerald)',
                        margin: 0,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      SELF-ATTENTION
                    </h2>
                    <p
                      style={{
                        fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)',
                        fontWeight: 300,
                        color: 'var(--text-secondary)',
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      Each observation can relate to other observations across the conjunction history.
                    </p>
                  </motion.div>
                )}

                {/* Phase 5: Transformer Encoder */}
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
                        color: 'var(--text-secondary)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.14em',
                      }}
                    >
                      INTERNAL COMPUTATION
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
                      TRANSFORMER ENCODER
                    </h2>
                  </motion.div>
                )}

                {/* Phase 6: Multi-Layer Reasoning */}
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
                        color: 'var(--accent-cyan)',
                        fontSize: '0.74rem',
                        letterSpacing: '0.14em',
                      }}
                    >
                      DEEP TEMPORAL REASONING
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
                      ENCODER × N
                    </h2>
                  </motion.div>
                )}

                {/* Phase 7: Temporal Aggregation */}
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
                        color: 'var(--text-secondary)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.14em',
                      }}
                    >
                      SEQUENCE-TO-VECTOR
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
                      TEMPORAL AGGREGATION
                    </h2>
                  </motion.div>
                )}

                {/* Phase 8: Prediction Head */}
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
                        color: 'var(--accent-ruby)',
                        fontSize: '0.74rem',
                        letterSpacing: '0.14em',
                      }}
                    >
                      MODEL OUTPUT
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
                      PREDICTION HEAD &nbsp;→&nbsp; RISK PREDICTION
                    </h2>
                  </motion.div>
                )}

                {/* Phase 9: Baseline vs Proposed Architecture */}
                {phase === 9 && (
                  <motion.div
                    key="phase9"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      maxWidth: '820px',
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
                      CONTROLLED EXPERIMENTAL BENCHMARK
                    </div>
                    <h2
                      style={{
                        fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.025em',
                        color: '#ffffff',
                        lineHeight: 1.25,
                        fontFamily: 'var(--font-display)',
                        margin: 0,
                      }}
                    >
                      Does temporal attention improve conjunction-risk prediction?
                    </h2>
                  </motion.div>
                )}

                {/* Phase 10: Complete Proposed Architecture */}
                {phase === 10 && (
                  <motion.div
                    key="phase10"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '14px',
                      maxWidth: '880px',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 'clamp(1.7rem, 3.6vw, 2.5rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.025em',
                        color: '#ffffff',
                        lineHeight: 1.2,
                        fontFamily: 'var(--font-display)',
                        textShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
                        margin: 0,
                      }}
                    >
                      PROPOSED ARCHITECTURE // END-TO-END BLUEPRINT
                    </h2>

                    <div
                      className="telemetry-mono"
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      CDM SEQUENCE → PROJECTION → ATTENTION → TRANSFORMER → PREDICTION
                    </div>

                    {/* Action trigger to proceed into M8 */}
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
                        <span>VIEW SIMULATED PREDICTION</span>
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
              goToStage('OUR_APPROACH');
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((p) => (
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
            if (phase < 10) {
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
          {phase < 10 ? 'NEXT' : 'CONTINUE'}
        </button>
      </div>
    </div>
  );
};
