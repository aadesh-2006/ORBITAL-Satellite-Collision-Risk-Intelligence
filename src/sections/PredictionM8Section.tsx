import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoryState } from '../hooks/useStoryState';
import { useParallax } from '../hooks/useParallax';
import { FadeIn } from '../components/animation/FadeIn';
import { CrosshairFrame } from '../components/ui/CrosshairFrame';
import { StatusBadge } from '../components/ui/StatusBadge';
import { PredictionSimulationVisualizer } from '../components/space/PredictionSimulationVisualizer';

interface M8PhaseContent {
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

const M8_PHASES: M8PhaseContent[] = [
  {
    phase: 1,
    badge: 'STAGE 07 // STEP 01: SIMULATED INPUT',
    badgeVariant: 'cyan',
    title: 'Representative Encounter Setup',
    subtitle: 'Simulating a Close-Approach Event in Low Earth Orbit',
    description:
      'To demonstrate how the proposed intelligence system operates, we simulate a representative orbital encounter between an active satellite and space debris. Over a 70-hour window, ground tracking stations generate a sequence of 5 Conjunction Data Messages (CDMs) as the encounter approaches Time of Closest Approach (TCA).',
    details: [
      'OBJECT A: Sentinel-class primary satellite (NORAD #49281) [SIMULATED]',
      'OBJECT B: High-velocity fragment debris (FRAG-882) [SIMULATED]',
      'RELATIVE VELOCITY: 14.24 km/s at 642.8 km altitude [LEO]',
      'HISTORICAL SEQUENCE: 5 CDMs spanning T-72h down to T-2h before TCA',
    ],
    tag: '[ SIMULATED CONJUNCTION ]',
  },
  {
    phase: 2,
    badge: 'STAGE 07 // STEP 02: TEMPORAL ARRIVAL',
    badgeVariant: 'cyan',
    title: 'Loading the CDM Observation Stream',
    subtitle: 'Streaming Chronological Conjunction Data Messages',
    description:
      'Unlike legacy screening that evaluates only the single newest CDM in isolation, our pipeline ingests the entire temporal sequence. Each CDM carries evolving state estimates, orbital covarinace tensors, and encounter geometry refined with each ground tracking pass.',
    details: [
      'CDM 01 (T-72h): Early warning radar pass, high covariance volume (d_miss = 1,420m)',
      'CDM 02 (T-48h): Optical track refinement, covariance ellipsoid begins contracting',
      'CDM 03 (T-24h): Radar update confirms trajectory convergence (d_miss = 510m)',
      'CDM 04 (T-12h): Close approach confirmed within 340m boundary',
      'CDM 05 (T-2h): Final critical pre-maneuver tracking window (d_miss = 284m)',
    ],
    formula: 'X = [x_1, x_2, x_3, x_4, x_5]^\top \in \mathbb{R}^{5 \times 103}',
    tag: '[ SIMULATED SEQUENCE ]',
  },
  {
    phase: 3,
    badge: 'STAGE 07 // STEP 03: FEATURE PREPARATION',
    badgeVariant: 'emerald',
    title: 'Standardization & Latent Embedding',
    subtitle: 'Transforming Physical Telemetry into Model Representations',
    description:
      'Raw features (relative positions, velocities, covariance diagonals, and astrodynamic angles) are scaled and projected through a learnable linear transformation W_p into a dense d_model-dimensional latent space.',
    details: [
      'STANDARDIZATION: Zero-mean, unit-variance scaling on 103 astrodynamic features',
      'LINEAR PROJECTION: W_p maps 103 physical dimensions to d_model = 64/128',
      'BIAS INJECTION: e_t = x_t W_p + b_p produces normalized token representations',
      'OUTPUT MATRIX: E ∈ ℝ^(5 × d_model) ready for temporal attention',
    ],
    formula: 'e_t = x_t W_p + b_p \quad (\text{for } t = 1, \dots, 5)',
    tag: '[ SIMULATED INFERENCE PIPELINE ]',
  },
  {
    phase: 4,
    badge: 'STAGE 07 // STEP 04: ENCODER ENTRY',
    badgeVariant: 'emerald',
    title: 'Injecting Time-to-TCA Information',
    subtitle: 'Encoding Relative Orbital Time into Latent Tokens',
    description:
      'Since self-attention has no inherent concept of temporal order, we add continuous time-to-TCA embeddings P_t. This informs the model that CDM 05 occurs just 2 hours prior to close approach, whereas CDM 01 occurred 70 hours earlier.',
    details: [
      'RELATIVE TIME VECTOR: Δt_tca = t_TCA - t_CDM ∈ [72h, 48h, 24h, 12h, 2h]',
      'TEMPORAL INJECTION: z_t^(0) = e_t + P_t encodes both physics and urgency',
      'ORDER-AWARE REPRESENTATION: Maintains awareness of tracking interval irregularity',
      'INFERENCE FLOW: Injected vectors enter the stacked Transformer Encoder layers',
    ],
    formula: 'z_t^{(0)} = e_t + P_t(\Delta t_tca) \in \mathbb{R}^{d_{\text{model}}}',
    tag: '[ SIMULATED ENCODER FLOW ]',
  },
  {
    phase: 5,
    badge: 'STAGE 07 // STEP 05: ATTENTION ACTIVATION',
    badgeVariant: 'emerald',
    title: 'Qualitative Cross-Observation Reasoning',
    subtitle: 'Connecting Early Trajectory Context to Late Covariance Contraction',
    description:
      'Inside the self-attention layer, queries and keys compute relational affinities across all observation pairs. The model dynamically correlates early baseline trajectory data with late critical covariance updates without recurrent sequence bottlenecks.',
    details: [
      'DIRECT CROSS-TIME LINKS: Any observation can attend directly to any earlier or later CDM',
      'CONTEXT REINFORCEMENT: Late CDMs contextualize covariance contraction against early passes',
      'NO FAKE METRICS: Visualization depicts structural connectivity, not fabricated trained weights',
      'PARALLEL COMPUTATION: All 5 observation tokens interact simultaneously',
    ],
    formula: '\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{Q K^\top}{\sqrt{d_k}}\right) V',
    tag: '[ CONCEPTUAL ATTENTION VISUALIZATION ]',
  },
  {
    phase: 6,
    badge: 'STAGE 07 // STEP 06: TEMPORAL AGGREGATION',
    badgeVariant: 'amber',
    title: 'Condensing Multi-Step Context into Event State',
    subtitle: 'Collapsing Observation Tokens into a Unified Latent Vector',
    description:
      'After passing through the stacked Transformer blocks, the 5 contextualized representations [z_1^(L), ..., z_5^(L)] are aggregated into a single compact event representation h_event, synthesizing the entire encounter history into an actionable vector.',
    details: [
      'ENCODER OUTPUTS: 5 deeply enriched vectors containing full temporal cross-context',
      'TEMPORAL POOLING: Aggregation via attention-weighted sum or late-token slicing',
      'UNIFIED EVENT VECTOR: h_event ∈ ℝ^(d_model) captures total encounter trajectory history',
      'FEED-FORWARD READY: Prepares compact state for dual classification/regression heads',
    ],
    formula: 'h_{\text{event}} = \sum_{t=1}^{5} \alpha_t z_t^{(L)} \in \mathbb{R}^{d_{\text{model}}}',
    tag: '[ LATENT EVENT VECTOR ]',
  },
  {
    phase: 7,
    badge: 'STAGE 07 // STEP 07: SIMULATED PREDICTION',
    badgeVariant: 'ruby',
    title: 'Simulated Risk Score & Severity Class',
    subtitle: 'Illustrative Inference Output from Proposed Prediction Head',
    description:
      'The prediction head maps the event vector h_event to estimated collision probability and risk severity. In this illustrative demonstration, the simulated risk score exceeds the standard operational threshold (10^-4), triggering an elevated risk classification.',
    details: [
      'SIMULATED RISK SCORE: P_c = 0.00042 (4.2 × 10^-4) [DEMO VALUE]',
      'RISK SEVERITY CLASS: ELEVATED [ILLUSTRATIVE CLASSIFICATION]',
      'OPERATIONAL THRESHOLD: Standard 1.0 × 10^-4 safety boundary breached',
      'SCIENTIFIC HONESTY: Model is not yet trained — output is demonstrative prototype UI',
    ],
    formula: '\hat{y} = \sigma(W_c h_{\text{event}} + b_c), \quad \hat{r} = W_r h_{\text{event}} + b_r',
    tag: '[ SIMULATED DEMO — MODEL NOT TRAINED ]',
  },
  {
    phase: 8,
    badge: 'STAGE 07 // STEP 08: RISK EVOLUTION',
    badgeVariant: 'amber',
    title: 'Multi-Observation Evidence Tracking',
    subtitle: 'Visualizing Dynamic Risk Updates as Observations Accumulate',
    description:
      'As new CDMs arrive chronologically, the system updates its risk estimate. Early observations carry higher uncertainty; as radar tracks refine orbital covariance closer to TCA, the estimated risk dynamically reflects the emerging evidence.',
    details: [
      'NON-MONOTONIC UPDATES: Risk can increase or decrease as new sensor data arrives',
      'UNCERTAINTY CONTRACTION: Covariance ellipses shrink from T-72h to T-2h',
      'EARLY WARNING CAPABILITY: Operators gain progressive clarity before maneuver decision deadlines',
      'ILLUSTRATIVE TREND: Demonstrates intended multi-CDM time-series evaluation workflow',
    ],
    tag: '[ ILLUSTRATIVE RISK EVOLUTION ]',
  },
  {
    phase: 9,
    badge: 'STAGE 07 // STEP 09: DECISION SUPPORT',
    badgeVariant: 'ruby',
    title: 'Actionable Intelligence for Flight Dynamics',
    subtitle: 'Human-in-the-Loop Operational Decision Advisory',
    description:
      'The proposed system is designed as a Decision Support tool for satellite flight dynamics teams, not an autonomous firing mechanism. It synthesizes complex encounter geometry, probability trends, and delta-V estimates into an actionable operator brief.',
    details: [
      'OPERATIONAL ADVISORY: Recommends human operator review due to elevated risk (P_c > 10^-4)',
      'MANEUVER ESTIMATION: Suggests radial-transverse maneuver geometry (ΔV ≈ 0.12 m/s [SIM])',
      'FLIGHT SAFETY PROTOCOL: Preserves operator authority while slashing screening workload',
      'FLEET SCALABILITY: Enables flight teams to manage thousands of conjunctions simultaneously',
    ],
    tag: '[ DECISION SUPPORT — NOT AUTONOMOUS ]',
  },
  {
    phase: 10,
    badge: 'STAGE 07 // STEP 10: INFERENCE COMPLETE',
    badgeVariant: 'emerald',
    title: 'End-to-End Inference Journey Complete',
    subtitle: 'From Orbital Conjunction to Calibrated Operational Risk Support',
    description:
      'We have traced the full proposed inference pipeline: raw CDM ingestion → feature projection → temporal positional addition → multi-head self-attention → event vector aggregation → calibrated risk scoring → decision support.',
    details: [
      'FULL PIPELINE PROVEN: Unified pipeline from multi-CDM time series to decision support',
      'SCIENTIFIC SAFEGUARDS: Demonstrative UI clearly distinguished from experimental benchmarks',
      'NEXT HORIZON: Translating this architecture into a production-grade operational system',
      'STAGE 08 ADVANCEMENT: Explore the complete Orbital Collision Risk Intelligence platform',
    ],
    tag: '[ SIMULATED INFERENCE COMPLETE ]',
  },
];

export const PredictionM8Section: React.FC = () => {
  const { currentStageId, goToStage } = useStoryState();
  const { x, y } = useParallax(0.04);
  const [phase, setPhase] = useState<number>(1);

  const currentContent = M8_PHASES[phase - 1];

  const handleNextPhase = useCallback(() => {
    if (phase < 10) {
      setPhase((prev) => prev + 1);
    } else {
      goToStage('FINAL_SYSTEM');
    }
  }, [phase, goToStage]);

  const handlePrevPhase = useCallback(() => {
    if (phase > 1) {
      setPhase((prev) => prev - 1);
    } else {
      goToStage('MODEL');
    }
  }, [phase, goToStage]);

  const handleReplay = useCallback(() => {
    setPhase(1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentStageId !== 'PREDICTION') return;

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
        setPhase(10);
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
      <PredictionSimulationVisualizer
        phase={phase}
        parallaxX={x}
        parallaxY={y}
      />

      {/* Top Header / Stage HUD */}
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
                PHASE {phase.toString().padStart(2, '0')} / 10
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

        {/* Top Right: Replay and Simulated Tag */}
        <FadeIn direction="down" distance={12} duration={0.8} delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 12px',
                background: 'rgba(248, 113, 113, 0.08)',
                border: '1px solid rgba(248, 113, 113, 0.3)',
                borderRadius: '3px',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#f87171',
                }}
              />
              <span
                className="telemetry-mono"
                style={{
                  color: '#f87171',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                }}
              >
                {currentContent.tag}
              </span>
            </div>

            <button
              onClick={handleReplay}
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
              ↺ REPLAY SIMULATED INFERENCE
            </button>
          </div>
        </FadeIn>
      </div>

      {/* Main Narrative Card Overlay */}
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

              {currentContent.formula && (
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '3px',
                    padding: '8px 14px',
                    marginBottom: '14px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: '#34d399',
                    letterSpacing: '0.04em',
                  }}
                >
                  {currentContent.formula}
                </div>
              )}

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
                    <span style={{ color: 'var(--accent-cyan)' }}>▹</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </CrosshairFrame>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Timeline Controls */}
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
        {/* Navigation Buttons */}
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
            ← {phase === 1 ? 'STAGE 06 // MODEL' : 'PREV STEP'}
          </button>

          <button
            onClick={handleNextPhase}
            style={{
              background: phase === 10 ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255, 255, 255, 0.06)',
              border: phase === 10 ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
              color: phase === 10 ? '#34d399' : '#ffffff',
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
              e.currentTarget.style.borderColor = phase === 10 ? '#34d399' : '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = phase === 10 ? 'var(--accent-emerald)' : 'var(--border-subtle)';
            }}
          >
            {phase === 10 ? 'ADVANCE TO STAGE 08 // FINAL SYSTEM →' : 'NEXT STEP →'}
          </button>
        </div>

        {/* Step Indicator Bubbles */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {M8_PHASES.map((p) => (
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
              title={`Step ${p.phase}: ${p.title}`}
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
