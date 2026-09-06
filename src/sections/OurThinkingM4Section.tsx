import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoryState } from '../hooks/useStoryState';
import { ParallaxLayer } from '../components/animation/ParallaxLayer';
import { CrosshairFrame } from '../components/ui/CrosshairFrame';
import { StatusBadge } from '../components/ui/StatusBadge';
import { AttentionSequenceVisualizer } from '../components/space/AttentionSequenceVisualizer';
import { useParallax } from '../hooks/useParallax';

export const OurThinkingM4Section: React.FC = () => {
  const { nextStage, goToStage } = useStoryState();
  const [phase, setPhase] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const { x: parallaxX, y: parallaxY } = useParallax(0.04);

  // Phased narrative timing sequence
  useEffect(() => {
    // Phase 1 (0s): Continuation from M3 sequence
    // Phase 2 (2.2s): Snapshot vs Sequence
    const t2 = setTimeout(() => setPhase(2), 2200);
    // Phase 3 (5.0s): Sequence Modeling Transformation
    const t3 = setTimeout(() => setPhase(3), 5000);
    // Phase 4 (7.8s): LSTM / GRU Baseline
    const t4 = setTimeout(() => setPhase(4), 7800);
    // Phase 5 (10.6s): Variable Importance Question
    const t5 = setTimeout(() => setPhase(5), 10600);
    // Phase 6 (13.6s): Attention Concept
    const t6 = setTimeout(() => setPhase(6), 13600);
    // Phase 7 (16.8s): Transformer Reveal
    const t7 = setTimeout(() => setPhase(7), 16800);
    // Phase 8 (20.0s): Our Research Question & Hypothesis
    const t8 = setTimeout(() => setPhase(8), 20000);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
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
        if (phase < 8) {
          setPhase((p) => Math.min(p + 1, 8));
        } else {
          handleNextStage();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (phase > 1) {
          setPhase((p) => Math.max(p - 1, 1));
        } else {
          goToStage('CONJUNCTION');
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
      {/* Dynamic Attention & Sequence Model Visualizer */}
      <AttentionSequenceVisualizer
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
            <div style={{ marginBottom: '16px' }}>
              <StatusBadge
                label={
                  phase <= 4
                    ? 'STAGE 03 // SEQUENCE MODELING'
                    : phase <= 6
                    ? 'STAGE 03 // ATTENTION MECHANISM'
                    : 'STAGE 03 // RESEARCH HYPOTHESIS'
                }
                variant={phase >= 6 ? 'emerald' : 'cyan'}
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
                {/* Phase 1: Continuation from M3 */}
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
                      gap: '10px',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 'clamp(1.8rem, 3.8vw, 2.7rem)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      What if we could learn from that sequence?
                    </h2>
                  </motion.div>
                )}

                {/* Phase 2: Snapshot vs Sequence */}
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
                      gap: '12px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)',
                        fontWeight: 300,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      A conjunction is not just a snapshot.
                    </p>
                    <p
                      style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.45rem)',
                        fontWeight: 300,
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.02em',
                        margin: 0,
                      }}
                    >
                      It evolves over time.
                    </p>
                  </motion.div>
                )}

                {/* Phase 3: Sequence Modeling */}
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
                      gap: '10px',
                    }}
                  >
                    <div
                      className="telemetry-mono"
                      style={{
                        color: 'var(--accent-cyan)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.16em',
                      }}
                    >
                      SEQUENCE MODELING
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
                      Could a model learn that evolution?
                    </h2>
                  </motion.div>
                )}

                {/* Phase 4: LSTM / GRU Baseline */}
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
                      gap: '10px',
                    }}
                  >
                    <div
                      className="telemetry-mono"
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.14em',
                      }}
                    >
                      SEQUENCE MODELING // BASELINE
                    </div>

                    <h2
                      style={{
                        fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      LSTM &nbsp;/&nbsp; GRU
                    </h2>
                  </motion.div>
                )}

                {/* Phase 5: The Question (Variable Importance) */}
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
                      gap: '10px',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 'clamp(1.8rem, 3.8vw, 2.7rem)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      But are all observations equally important?
                    </h2>

                    <div
                      className="telemetry-mono"
                      style={{
                        fontSize: '0.68rem',
                        color: 'var(--text-tertiary)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      [ ILLUSTRATIVE ATTENTION CONCEPT ]
                    </div>
                  </motion.div>
                )}

                {/* Phase 6: Attention */}
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
                    <h2
                      style={{
                        fontSize: 'clamp(2.2rem, 4.8vw, 3.4rem)',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        color: 'var(--accent-emerald)',
                        margin: 0,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      ATTENTION
                    </h2>
                    <div
                      className="telemetry-mono"
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.1em',
                        maxWidth: '520px',
                      }}
                    >
                      LEARNING INFORMATIVE TEMPORAL RELATIONSHIPS
                    </div>
                  </motion.div>
                )}

                {/* Phase 7: Transformer Reveal */}
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
                      gap: '8px',
                    }}
                  >
                    <div
                      className="telemetry-mono"
                      style={{
                        color: 'var(--text-tertiary)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.14em',
                      }}
                    >
                      ARCHITECTURE BLUEPRINT
                    </div>

                    <h2
                      style={{
                        fontSize: 'clamp(2.2rem, 4.8vw, 3.4rem)',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: 'var(--font-mono)',
                        textShadow: '0 0 35px rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      TRANSFORMER
                    </h2>
                  </motion.div>
                )}

                {/* Phase 8: Our Research Question & Hypothesis */}
                {phase === 8 && (
                  <motion.div
                    key="phase8"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '18px',
                      maxWidth: '820px',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 'clamp(1.8rem, 3.8vw, 2.8rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.025em',
                        color: '#ffffff',
                        lineHeight: 1.2,
                        fontFamily: 'var(--font-display)',
                        textShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
                        margin: 0,
                      }}
                    >
                      Can temporal attention improve conjunction risk prediction?
                    </h2>

                    {/* Comparison Sub-card */}
                    <CrosshairFrame
                      size={8}
                      color="rgba(255, 255, 255, 0.2)"
                      style={{
                        padding: '16px 28px',
                        background: 'rgba(8, 12, 16, 0.85)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '24px',
                      }}
                    >
                      <span
                        className="telemetry-mono"
                        style={{
                          color: 'var(--text-secondary)',
                          fontSize: '0.76rem',
                          letterSpacing: '0.12em',
                        }}
                      >
                        LSTM / GRU
                      </span>
                      <span
                        className="telemetry-mono"
                        style={{
                          color: 'var(--border-strong)',
                          fontSize: '0.76rem',
                        }}
                      >
                        VS
                      </span>
                      <span
                        className="telemetry-mono"
                        style={{
                          color: 'var(--accent-emerald)',
                          fontSize: '0.76rem',
                          letterSpacing: '0.12em',
                          fontWeight: 500,
                        }}
                      >
                        TRANSFORMER / ATTENTION
                      </span>
                    </CrosshairFrame>

                    {/* Action trigger to proceed into M5 */}
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
                        <span>VIEW OUR PLAN</span>
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
              goToStage('CONJUNCTION');
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
          {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
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
            if (phase < 8) {
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
          {phase < 8 ? 'NEXT' : 'CONTINUE'}
        </button>
      </div>
    </div>
  );
};
