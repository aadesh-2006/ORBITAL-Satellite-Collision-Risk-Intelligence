import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoryState } from '../hooks/useStoryState';
import { useParallax } from '../hooks/useParallax';
import { FadeIn } from '../components/animation/FadeIn';
import { CrosshairFrame } from '../components/ui/CrosshairFrame';
import { StatusBadge } from '../components/ui/StatusBadge';
import { IntelligenceWorkstationVisualizer } from '../components/space/IntelligenceWorkstationVisualizer';

interface M9PhaseContent {
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

const M9_PHASES: M9PhaseContent[] = [
  {
    phase: 1,
    badge: 'STAGE 08 // STEP 01: SYSTEM CONVERGENCE',
    badgeVariant: 'cyan',
    title: 'Workstation System Convergence',
    subtitle: 'Unifying Conjunction Sequences, Neural Models, and Decision Support',
    description:
      'All previous research layers—raw CDM historical records, astrodynamic feature matrices, temporal attention networks, and probability estimation—converge into a unified aerospace mission analysis workstation.',
    details: [
      'PIPELINE FUSION: Direct integration from tracking messages to operator risk brief',
      'CONTINUOUS TIME-SERIES: Replaces single-pass screening with multi-CDM temporal intelligence',
      'RESEARCH PROTOTYPE: Demonstrates the target operational environment for flight dynamics teams',
      'AEROSPACE STANDARD: Designed for satellite operators managing dense orbital constellations',
    ],
    tag: '[ PROTOTYPE WORKSTATION ]',
  },
  {
    phase: 2,
    badge: 'STAGE 08 // STEP 02: CONJUNCTION ANALYSIS',
    badgeVariant: 'cyan',
    title: 'Live Encounter Telemetry Analysis',
    subtitle: 'Real-Time Astrodynamic Dossier for Tracked Orbital Pairs',
    description:
      'The workstation displays two tracked orbital bodies approaching Time of Closest Approach (TCA). Event metadata synthesizes relative velocity, miss distance, and covariance dimensions into a structured mission dossier.',
    details: [
      'PRIMARY ASSET: Protected satellite in Low Earth Orbit (642.8 km altitude) [SIMULATED]',
      'CHASER OBJECT: High-velocity orbital fragment (v_rel = 14.24 km/s) [SIMULATED]',
      'MISS DISTANCE: 284 m nominal separation with ±32m covariance uncertainty',
      'SCIENTIFIC HONESTY: Representative simulated event — not live telemetry feed',
    ],
    tag: '[ PROTOTYPE — SIMULATED DATA ]',
  },
  {
    phase: 3,
    badge: 'STAGE 08 // STEP 03: RISK EVOLUTION',
    badgeVariant: 'amber',
    title: 'Temporal Evidence Trajectory',
    subtitle: 'Multi-Observation Risk Updating as Sensor Evidence Accumulates',
    description:
      'Rather than relying on an isolated static snapshot, the workstation traces the evolving risk trajectory across all received CDMs from T-72h down to T-2h. Risk estimates dynamically adapt as radar passes contract covariance ellipsoids.',
    details: [
      'NON-MONOTONIC EVOLUTION: Demonstrates risk updating as new sensor tracks arrive',
      'PROGRESSIVE REFINEMENT: Shrinking positional uncertainty enables timely maneuver planning',
      'ILLUSTRATIVE TREND: Depicts dynamic updating workflow without claiming trained results',
      'OPERATIONAL CLARITY: Alerts flight dynamics teams before maneuver commitment deadlines',
    ],
    tag: '[ ILLUSTRATIVE RISK EVOLUTION ]',
  },
  {
    phase: 4,
    badge: 'STAGE 08 // STEP 04: MODEL STATUS',
    badgeVariant: 'emerald',
    title: 'Neural Architecture State',
    subtitle: 'Transparent Inspection of the Proposed Transformer Pipeline',
    description:
      'Inside the workstation, operators can inspect the neural processing graph: 103 CDM input features → linear projection → continuous time-to-TCA embeddings → stacked self-attention encoder → latent event vector → risk prediction head.',
    details: [
      'MODEL STATUS: Proposed Transformer Architecture designed for temporal conjunctions',
      'TRAINING STATUS: NOT YET TRAINED — model checkpoint under research development',
      'METRIC HONESTY: Zero fabricated accuracy, F1, or AUC scores are displayed',
      'ATTENTION REASONING: Depicts qualitative structural connectivity across observation steps',
    ],
    formula: '\text{Input } X \in \mathbb{R}^{5 \times 103} \longrightarrow \text{Encoder}(X) \longrightarrow h_{\text{event}} \longrightarrow \hat{y}',
    tag: '[ PROPOSED ARCHITECTURE — NOT YET TRAINED ]',
  },
  {
    phase: 5,
    badge: 'STAGE 08 // STEP 05: PREDICTION OUTPUT',
    badgeVariant: 'ruby',
    title: 'Simulated Collision Probability Output',
    subtitle: 'Demonstrative Risk Score and Severity Classification',
    description:
      'The prediction console outputs an illustrative collision probability estimate. In this simulated demonstration, the risk score is classified as ELEVATED, signaling the need for operator review.',
    details: [
      'COLLISION PROBABILITY (P_c): 0.00042 [SIMULATED DEMO VALUE]',
      'RISK SEVERITY: ELEVATED [ILLUSTRATIVE CLASSIFICATION]',
      'SCIENTIFIC HONESTY: Strictly illustrative output to demonstrate UI layout',
      'NO AUTONOMOUS CLAIMS: No automatic maneuver execution or delta-V commands',
    ],
    tag: '[ SIMULATED OUTPUT — MODEL NOT YET TRAINED ]',
  },
  {
    phase: 6,
    badge: 'STAGE 08 // STEP 06: INTELLIGENCE SUMMARY',
    badgeVariant: 'emerald',
    title: 'Integrated Mission Analysis Brief',
    subtitle: 'Consolidated High-Density Dossier for Flight Operators',
    description:
      'All encounter telemetry, temporal risk trajectories, and neural model outputs are aggregated into a single high-density mission brief, eliminating fragmented tools and manual spreadsheet screening.',
    details: [
      'UNIFIED INTERFACE: Conjunction state, TCA countdown, miss distance, and model output in one HUD',
      'SCALABLE SCREENING: Accelerates operator triage during major orbital debris storms',
      'DECISION-READY CONTEXT: Presents full trajectory history alongside point estimates',
      'PROTOTYPE BENCHMARK: Demonstrates next-generation aerospace intelligence workflow',
    ],
    tag: '[ INTEGRATED INTELLIGENCE SUMMARY ]',
  },
  {
    phase: 7,
    badge: 'STAGE 08 // STEP 07: RESEARCH BOUNDARY',
    badgeVariant: 'amber',
    title: 'Research vs. Operational Boundary',
    subtitle: 'Clear Scope: Decision Support, Not Autonomous Thruster Firing',
    description:
      'We explicitly define the operational boundary of this project: ORBITAL is a Decision Support Intelligence System for satellite conjunction risk prediction, NOT an autonomous collision avoidance or maneuver execution system.',
    details: [
      'IN SCOPE: Automated multi-CDM ingestion, sequence modeling, and calibrated risk scoring',
      'OUT OF SCOPE: Autonomous thruster burns, propulsion commands, and avoidance maneuvers',
      'FLIGHT SAFETY: Preserves human-in-the-loop authority for all spacecraft commands',
      'AEROSPACE REALISM: Aligns directly with international space agency operational standards',
    ],
    tag: '[ DECISION SUPPORT — NOT AUTONOMOUS ]',
  },
  {
    phase: 8,
    badge: 'STAGE 08 // STEP 08: COMPLETE PIPELINE',
    badgeVariant: 'cyan',
    title: 'Complete Research & Evaluation Protocol',
    subtitle: 'Side-by-Side Benchmarking of Baselines vs. Proposed Transformer',
    description:
      'The overarching research pipeline spans raw ESA tracking data ingestion, temporal matrix preprocessing, and rigorous side-by-side benchmarking between Recurrent Baselines (LSTM/GRU) and the Proposed Temporal Transformer.',
    details: [
      'CONTROLLED EXPERIMENT: Baseline and Proposed models evaluated on identical test splits',
      'NO UNPROVEN CLAIMS: Transformer is not claimed to outperform baselines prior to testing',
      'SCIENTIFIC INTEGRITY: Relative performance will be determined strictly via empirical metrics',
      'REPRODUCIBLE PROTOCOL: Standardized training, validation, and test protocols on 162K+ records',
    ],
    tag: '[ BASELINE VS PROPOSED BENCHMARK ]',
  },
  {
    phase: 9,
    badge: 'STAGE 08 // STEP 09: MISSION HORIZON',
    badgeVariant: 'emerald',
    title: 'From Data to Intelligent Risk Prediction',
    subtitle: 'Historical Observations → Temporal Learning → Collision-Risk Intelligence',
    description:
      'We have completed the architectural journey from orbital physics and conjunction uncertainty to sequence-based deep learning and operational decision support.',
    details: [
      'JOURNEY COMPLETE: M1 through M9 fully establishes the complete research narrative',
      'FOUNDATION READY: Prepared for empirical model training and dataset benchmarking',
      'CLOSING PERSPECTIVE: Next, discover the broader mission horizon and project conclusions',
      'ADVANCEMENT: Proceed to Stage 09 / M10 for final research conclusions and project summary',
    ],
    tag: '[ WORKSTATION DEMO COMPLETE ]',
  },
];

export const FinalSystemM9Section: React.FC = () => {
  const { currentStageId, goToStage } = useStoryState();
  const { x, y } = useParallax(0.04);
  const [phase, setPhase] = useState<number>(1);

  const currentContent = M9_PHASES[phase - 1];

  const handleNextPhase = useCallback(() => {
    if (phase < 9) {
      setPhase((prev) => prev + 1);
    } else {
      goToStage('FINAL_SYSTEM'); // Stay or advance to closing
    }
  }, [phase, goToStage]);

  const handlePrevPhase = useCallback(() => {
    if (phase > 1) {
      setPhase((prev) => prev - 1);
    } else {
      goToStage('PREDICTION');
    }
  }, [phase, goToStage]);

  const handleReset = useCallback(() => {
    setPhase(1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentStageId !== 'FINAL_SYSTEM') return;

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
        setPhase(9);
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
      {/* Background Workstation Visualizer */}
      <IntelligenceWorkstationVisualizer
        phase={phase}
        parallaxX={x}
        parallaxY={y}
      />

      {/* Top Header / Workstation HUD */}
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
                PHASE {phase.toString().padStart(2, '0')} / 09
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

        {/* Top Right: Tag & Replay */}
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
              onClick={handleReset}
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
              ↺ RESET WORKSTATION
            </button>
          </div>
        </FadeIn>
      </div>

      {/* Main Narrative Overlay Card */}
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
                    fontSize: '0.76rem',
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
                    <span style={{ color: 'var(--accent-emerald)' }}>▹</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </CrosshairFrame>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation & Timeline Controls */}
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
            ← {phase === 1 ? 'STAGE 07 // PREDICTION' : 'PREV STEP'}
          </button>

          <button
            onClick={handleNextPhase}
            style={{
              background: phase === 9 ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255, 255, 255, 0.06)',
              border: phase === 9 ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
              color: phase === 9 ? '#34d399' : '#ffffff',
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
              e.currentTarget.style.borderColor = phase === 9 ? '#34d399' : '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = phase === 9 ? 'var(--accent-emerald)' : 'var(--border-subtle)';
            }}
          >
            {phase === 9 ? 'STAGE 08 COMPLETE (PROCEED TO M10) →' : 'NEXT STEP →'}
          </button>
        </div>

        {/* Phase Indicator Bubbles */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {M9_PHASES.map((p) => (
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
