import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoryState } from '../hooks/useStoryState';
import { useParallax } from '../hooks/useParallax';
import { FadeIn } from '../components/animation/FadeIn';
import { CrosshairFrame } from '../components/ui/CrosshairFrame';
import { StatusBadge } from '../components/ui/StatusBadge';
import { MissionClosingVisualizer } from '../components/space/MissionClosingVisualizer';

interface M10PhaseContent {
  phase: number;
  badge: string;
  badgeVariant: 'cyan' | 'emerald' | 'amber' | 'ruby' | 'monochrome';
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  formula?: string;
  tag: string;
}

const M10_PHASES: M10PhaseContent[] = [
  {
    phase: 1,
    badge: 'STAGE 09 // STEP 01: SYSTEM COMPLETE',
    badgeVariant: 'emerald',
    title: 'The Complete Research Architecture',
    subtitle: 'From Historical Conjunction Tracking to Operational Risk Intelligence',
    description:
      'We have traced the full scientific pipeline: ingesting multi-pass Conjunction Data Messages, standardizing 103 orbital features, applying temporal positional embeddings, evaluating baseline vs proposed self-attention architectures, and synthesizing actionable risk dossiers.',
    details: [
      'FOUNDATION PROVEN: Multi-stage pipeline unifies astrodynamic physics and sequence modeling',
      'CONTINUOUS TIME SERIES: Replaces static single-point screening with temporal intelligence',
      'DUAL-TRACK BENCHMARKING: Rigorous experimental comparison protocol defined',
      'DECISION SUPPORT: Designed for flight dynamics teams protecting congested orbital orbits',
    ],
    tag: '[ PIPELINE COMPLETE ]',
  },
  {
    phase: 2,
    badge: 'STAGE 09 // STEP 02: WHAT WE ARE BUILDING',
    badgeVariant: 'cyan',
    title: 'ORBITAL — Satellite Collision Risk Intelligence',
    subtitle: 'Learning How Conjunction Risk Evolves Over Time',
    description:
      'The central thesis of ORBITAL is that satellite close-approach events cannot be fully understood from isolated snapshots. By learning from the temporal trajectory of consecutive tracking updates, we aim to deliver earlier, clearer, and more calibrated collision risk assessments.',
    details: [
      'CORE HYPOTHESIS: Multi-CDM time series contain predictive signals beyond single static CDMs',
      'TEMPORAL ATTENTION: Models dynamic covariance contraction and trajectory refinement',
      'OPERATIONAL VALUE: Reduces false alarm burden and supports human-in-the-loop flight decisions',
      'OPEN RESEARCH: Built on standardized, open scientific dataset architectures',
    ],
    tag: '[ PROJECT THESIS ]',
  },
  {
    phase: 3,
    badge: 'STAGE 09 // STEP 03: RESEARCH QUESTION',
    badgeVariant: 'cyan',
    title: 'The Central Empirical Question',
    subtitle: 'Can Temporal Learning Improve Conjunction Risk Prediction?',
    description:
      'Rather than claiming unverified breakthroughs, we frame our work as a rigorous scientific investigation: Does a Transformer Encoder with temporal attention outperform recurrent baselines (LSTM/GRU) and conventional screening methods when evaluated on real conjunction datasets?',
    details: [
      'SCIENTIFIC HUMILITY: The answer will be determined strictly through experimental testing',
      'BASELINE PROTOCOL: Evaluated against optimized LSTM, GRU, and static XGBoost models',
      'KEY METRICS: F1-score, Precision-Recall AUC, False Alarm Ratio, and Probability Calibration',
      'NO PREMATURE VICTORY: True performance emerges from empirical validation',
    ],
    tag: '[ RESEARCH HYPOTHESIS ]',
  },
  {
    phase: 4,
    badge: 'STAGE 09 // STEP 04: CURRENT PROJECT STATE',
    badgeVariant: 'amber',
    title: 'Transparent Project Status & Audit',
    subtitle: 'Clear Demarcation Between What Is Implemented vs. Pending Evaluation',
    description:
      'We maintain strict scientific transparency regarding current project readiness. The data pipeline and neural architectures are fully implemented in code; empirical training and comparative benchmark testing represent the next immediate phase.',
    details: [
      'DATASET: ESA Collision Avoidance Challenge (162,634 rows, 13,154 events, 103 features)',
      'MODELS IMPLEMENTED: Recurrent Baselines (LSTM/GRU) + Proposed Temporal Transformer',
      'STATUS: Code complete prototype & research pipeline ready for training execution',
      'EVALUATION: Empirical benchmark results pending model execution on hardware',
    ],
    tag: '[ PROTOTYPE / RESEARCH STATE ]',
  },
  {
    phase: 5,
    badge: 'STAGE 09 // STEP 05: FUTURE EXTENSIONS',
    badgeVariant: 'cyan',
    title: 'Post-Baseline Roadmap & Data Horizons',
    subtitle: 'Planned Integration of Global Aerospace Tracking Archives',
    description:
      'Following baseline validation, future milestones will extend the data pipeline to incorporate additional global tracking archives, real-time TLE propagation, and satellite catalog physical metadata.',
    details: [
      'NASA CARA ARCHIVE: Ingesting diverse conjunction assessment records across LEO and GEO',
      'SPACE-TRACK / CELESTRAK: Continuous orbital ephemeris and perturbation parameters',
      'ESA DISCOS DATABASE: Satellite cross-sectional areas, mass properties, and operational status',
      'PLANNED EXTENSIONS: Transparently identified as future roadmap objectives',
    ],
    tag: '[ PLANNED EXTENSIONS ]',
  },
  {
    phase: 6,
    badge: 'STAGE 09 // STEP 06: MISSION HORIZON',
    badgeVariant: 'emerald',
    title: 'From Conjunction Data to Intelligent Risk Prediction',
    subtitle: 'Historical Observations → Temporal Learning → Collision-Risk Intelligence',
    description:
      'As Low Earth Orbit grows exponentially more congested, safeguarding satellite infrastructure demands next-generation predictive intelligence. ORBITAL establishes the scientific foundation for learning from the temporal evolution of orbital close approaches.',
    details: [
      'RESEARCH COMPLETE: M1 through M10 presentation experience successfully concluded',
      'FULL CIRCLE: Return to the orbital cosmos that began the journey in Stage 00',
      'EXPLORATION CONTROLS: Replay the complete mission narrative or jump to any stage',
      'RESEARCH ARTIFACT: ORBITAL — Satellite Collision Risk Intelligence prototype',
    ],
    tag: '[ PRESENTATION COMPLETE ]',
  },
];

export const ClosingM10Section: React.FC = () => {
  const { currentStageId, goToStage } = useStoryState();
  const { x, y } = useParallax(0.04);
  const [phase, setPhase] = useState<number>(1);

  const currentContent = M10_PHASES[phase - 1];

  const handleNextPhase = useCallback(() => {
    if (phase < 6) {
      setPhase((prev) => prev + 1);
    } else {
      goToStage('LANDING'); // Replay from start
    }
  }, [phase, goToStage]);

  const handlePrevPhase = useCallback(() => {
    if (phase > 1) {
      setPhase((prev) => prev - 1);
    } else {
      goToStage('FINAL_SYSTEM');
    }
  }, [phase, goToStage]);

  const handleReplayMission = useCallback(() => {
    goToStage('LANDING');
  }, [goToStage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentStageId !== 'CLOSING') return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        handleNextPhase();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevPhase();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setPhase(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setPhase(6);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStageId, handleNextPhase, handlePrevPhase]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px 48px 40px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        zIndex: 5,
      }}
    >
      {/* Background Visualizer Component */}
      <MissionClosingVisualizer
        phase={phase}
        parallaxX={x}
        parallaxY={y}
      />

      {/* Top Header HUD */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          zIndex: 10,
          pointerEvents: 'auto',
        }}
      >
        <FadeIn direction="down" distance={12} duration={0.8}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <StatusBadge
                label={currentContent.badge}
                variant={currentContent.badgeVariant}
              />
              <span
                className="telemetry-mono"
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--text-tertiary)',
                  letterSpacing: '0.12em',
                }}
              >
                PHASE {phase.toString().padStart(2, '0')} / 06
              </span>
            </div>
            <h1
              style={{
                fontSize: 'clamp(1.4rem, 2.6vw, 2.1rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                margin: '4px 0 0',
                fontFamily: 'var(--font-display)',
              }}
            >
              {currentContent.title}
            </h1>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                margin: 0,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.04em',
              }}
            >
              {currentContent.subtitle}
            </p>
          </div>
        </FadeIn>

        {/* Top Right: Tag & Replay Button */}
        <FadeIn direction="down" distance={12} duration={0.8} delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 12px',
                background: 'rgba(52, 211, 153, 0.08)',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                borderRadius: '3px',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#34d399',
                }}
              />
              <span
                className="telemetry-mono"
                style={{
                  color: '#34d399',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                }}
              >
                {currentContent.tag}
              </span>
            </div>

            <button
              onClick={handleReplayMission}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
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
            >
              ↺ REPLAY MISSION STORY (STAGE 00)
            </button>
          </div>
        </FadeIn>
      </div>

      {/* Narrative Card Overlay */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          zIndex: 10,
          pointerEvents: 'none',
          marginBottom: '20px',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              maxWidth: '620px',
              pointerEvents: 'auto',
            }}
          >
            <CrosshairFrame
              size={10}
              color="rgba(255, 255, 255, 0.18)"
              style={{
                background: 'rgba(6, 10, 16, 0.88)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-subtle)',
                padding: '24px 28px',
                borderRadius: '4px',
              }}
            >
              <p
                style={{
                  fontSize: '0.86rem',
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                  margin: '0 0 16px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 400,
                }}
              >
                {currentContent.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '14px',
                }}
              >
                {currentContent.details.map((detail, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      fontSize: '0.73rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.45,
                    }}
                  >
                    <span style={{ color: 'var(--accent-emerald)' }}>▹</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </CrosshairFrame>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation & Timeline */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
          pointerEvents: 'auto',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '16px',
        }}
      >
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={handlePrevPhase}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              padding: '6px 14px',
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
            ← {phase === 1 ? 'STAGE 08 // FINAL SYSTEM' : 'PREV STEP'}
          </button>

          <button
            onClick={handleNextPhase}
            style={{
              background: phase === 6 ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255, 255, 255, 0.06)',
              border: phase === 6 ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
              color: phase === 6 ? '#34d399' : '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              padding: '6px 16px',
              cursor: 'pointer',
              borderRadius: '2px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = phase === 6 ? '#34d399' : '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = phase === 6 ? 'var(--accent-emerald)' : 'var(--border-subtle)';
            }}
          >
            {phase === 6 ? '↺ REPLAY MISSION FROM STAGE 00' : 'NEXT STEP →'}
          </button>
        </div>

        {/* Phase Indicator Dots */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {M10_PHASES.map((p) => (
            <button
              key={p.phase}
              onClick={() => setPhase(p.phase)}
              style={{
                width: phase === p.phase ? '20px' : '6px',
                height: '5px',
                borderRadius: '3px',
                backgroundColor:
                  phase === p.phase
                    ? 'var(--accent-emerald)'
                    : phase > p.phase
                    ? 'var(--text-tertiary)'
                    : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
              title={`Phase ${p.phase}: ${p.title}`}
            />
          ))}
        </div>

        {/* Keyboard hints HUD */}
        <div
          className="telemetry-mono"
          style={{
            fontSize: '0.65rem',
            color: 'var(--text-tertiary)',
            letterSpacing: '0.08em',
          }}
        >
          KEYS: [← / →] STEP // [SPACE] ADVANCE
        </div>
      </div>
    </div>
  );
};
