import React from 'react';
import { motion } from 'framer-motion';
import { ConjunctionVisualizer } from '../components/space/ConjunctionVisualizer';
import { ModelArchitectureVisualizer } from '../components/space/ModelArchitectureVisualizer';
import { PredictionSimulationVisualizer } from '../components/space/PredictionSimulationVisualizer';

/* ========================================================================= */
/* SCREEN 1: TITLE / HOOK */
/* ========================================================================= */
export const Screen1Title: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '920px',
      }}
    >
      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          background: 'rgba(52, 211, 153, 0.08)',
          border: '1px solid rgba(52, 211, 153, 0.3)',
          borderRadius: '3px',
          marginBottom: '20px',
        }}
      >
        <span
          className="telemetry-mono"
          style={{
            color: 'var(--accent-emerald)',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
          }}
        >
          AEROSPACE RESEARCH PRESENTATION
        </span>
      </motion.div>

      {/* Hero Title */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontSize: 'clamp(3.2rem, 7.5vw, 6.2rem)',
          fontWeight: 600,
          letterSpacing: '-0.03em',
          color: '#ffffff',
          lineHeight: 1.05,
          margin: '0 0 16px',
          fontFamily: 'var(--font-display)',
        }}
      >
        ORBITAL
      </motion.h1>

      {/* Main Subtitle */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          fontSize: 'clamp(1.2rem, 2.8vw, 2.0rem)',
          fontWeight: 400,
          color: 'var(--accent-cyan)',
          margin: '0 0 12px',
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.01em',
        }}
      >
        Satellite Collision Risk Intelligence
      </motion.h2>

      {/* Focus line */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{
          fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)',
          color: 'var(--text-secondary)',
          margin: '0 0 36px',
          fontFamily: 'var(--font-sans)',
          maxWidth: '680px',
          lineHeight: 1.5,
        }}
      >
        Deep Learning for Satellite Conjunction Risk Prediction
      </motion.p>

      {/* Presenter cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="telemetry-mono"
        style={{
          color: 'var(--text-tertiary)',
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          padding: '8px 18px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '2px',
        }}
      >
        PRESS SPACE OR → TO ADVANCE
      </motion.div>
    </div>
  );
};

/* ========================================================================= */
/* SCREEN 2: THE PROBLEM */
/* ========================================================================= */
export const Screen2Problem: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center',
      }}
    >
      {/* Left: Clear Large Problem Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div
          className="telemetry-mono"
          style={{
            color: 'var(--accent-ruby)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
          }}
        >
          SECTION 01 // THE ORBITAL PROBLEM
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
            fontWeight: 600,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: 0,
            fontFamily: 'var(--font-display)',
          }}
        >
          Thousands of objects share Earth's orbital environment.
        </h2>

        <p
          style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            margin: 0,
            fontFamily: 'var(--font-sans)',
          }}
        >
          Close approaches create <strong style={{ color: '#ffffff' }}>conjunction events</strong> where collision risk must be rapidly and accurately assessed.
        </p>

        {/* Large Key Question */}
        <div
          style={{
            marginTop: '12px',
            padding: '18px 24px',
            background: 'rgba(248, 113, 113, 0.06)',
            borderLeft: '4px solid var(--accent-ruby)',
            borderRadius: '0 4px 4px 0',
          }}
        >
          <div
            style={{
              fontSize: 'clamp(1.3rem, 2.4vw, 1.8rem)',
              fontWeight: 500,
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.01em',
            }}
          >
            "How risky is the encounter?"
          </div>
        </div>
      </div>

      {/* Right: Visual Trajectory Collision Representation */}
      <div
        style={{
          position: 'relative',
          height: '420px',
          background: 'rgba(8, 12, 18, 0.7)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '6px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ConjunctionVisualizer phase={4} />
      </div>
    </div>
  );
};

/* ========================================================================= */
/* SCREEN 3: CURRENT APPROACH */
/* ========================================================================= */
export const Screen3CurrentApproach: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '1040px',
      }}
    >
      <div
        className="telemetry-mono"
        style={{
          color: 'var(--accent-cyan)',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          marginBottom: '10px',
        }}
      >
        SECTION 02 // CONVENTIONAL BASELINE
      </div>

      <h2
        style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 600,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          margin: '0 0 16px',
          fontFamily: 'var(--font-display)',
        }}
      >
        Current Approach: Sequential Conjunction Data Messages
      </h2>

      <p
        style={{
          fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
          color: 'var(--text-secondary)',
          maxWidth: '780px',
          lineHeight: 1.55,
          margin: '0 0 36px',
        }}
      >
        Each Conjunction Data Message (CDM) provides another observation as the encounter evolves.
      </p>

      {/* 5 CDM Timeline Blocks */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
          width: '100%',
          marginBottom: '36px',
        }}
      >
        {[
          { label: 'CDM 01', time: 'T-72h', desc: 'Early Track Pass' },
          { label: 'CDM 02', time: 'T-48h', desc: 'Refined Radar Pass' },
          { label: 'CDM 03', time: 'T-24h', desc: 'Updated Covariance' },
          { label: 'CDM 04', time: 'T-12h', desc: 'Close Boundary' },
          { label: 'CDM 05', time: 'T-2h', desc: 'Final Pre-TCA Window' },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(12, 18, 26, 0.9)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '4px',
              padding: '18px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <div
              className="telemetry-mono"
              style={{
                color: 'var(--accent-cyan)',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: '0.82rem',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {item.time}
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Recurrent Baseline Box */}
      <div
        style={{
          width: '100%',
          padding: '20px 28px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <div
            className="telemetry-mono"
            style={{
              color: 'var(--accent-amber)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              marginBottom: '4px',
            }}
          >
            ESTABLISHED SEQUENCE BENCHMARK // LSTM / GRU
          </div>
          <div
            style={{
              fontSize: '1.05rem',
              color: '#ffffff',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Existing recurrent sequence models (LSTM / GRU) learn temporal patterns step-by-step from conjunction observations.
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* SCREEN 4: OUR IDEA */
/* ========================================================================= */
export const Screen4OurIdea: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '1080px',
      }}
    >
      <div
        className="telemetry-mono"
        style={{
          color: 'var(--accent-emerald)',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          marginBottom: '10px',
        }}
      >
        SECTION 03 // OUR CORE RESEARCH IDEA
      </div>

      <h2
        style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 600,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          margin: '0 0 16px',
          fontFamily: 'var(--font-display)',
        }}
      >
        Our Idea: Temporal Attention for Conjunction Evolution
      </h2>

      <p
        style={{
          fontSize: 'clamp(1.1rem, 1.9vw, 1.35rem)',
          color: 'var(--text-primary)',
          maxWidth: '840px',
          lineHeight: 1.5,
          margin: '0 0 32px',
        }}
      >
        Instead of treating conjunction observations independently, we model <strong style={{ color: 'var(--accent-emerald)' }}>how the encounter evolves over time</strong>.
      </p>

      {/* Conceptual Pipeline Flow */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '12px',
          width: '100%',
          marginBottom: '32px',
        }}
      >
        {[
          { step: '01', title: 'CDM SEQUENCE', sub: 'Multi-pass time series' },
          { step: '02', title: 'FEATURE EMBEDDING', sub: 'Latent space projection' },
          { step: '03', title: 'SELF-ATTENTION', sub: 'Cross-time relational links' },
          { step: '04', title: 'TRANSFORMER', sub: 'Stacked temporal encoders' },
          { step: '05', title: 'RISK PREDICTION', sub: 'Calibrated collision score' },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(12, 22, 18, 0.95)',
              border: '1px solid rgba(52, 211, 153, 0.4)',
              borderRadius: '4px',
              padding: '20px 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <div
              className="telemetry-mono"
              style={{
                color: 'var(--accent-emerald)',
                fontSize: '0.72rem',
                fontWeight: 600,
              }}
            >
              STEP {item.step}
            </div>
            <div
              style={{
                fontSize: '0.88rem',
                color: '#ffffff',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {item.sub}
            </div>
          </div>
        ))}
      </div>

      {/* 2 Key Proposition Takeaways */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '4px',
          }}
        >
          <div style={{ color: 'var(--accent-emerald)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '6px', fontFamily: 'var(--font-display)' }}>
            Direct Cross-Time Attention
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
            Attention allows the model to correlate early baseline trajectory passes directly with late critical covariance updates without bottlenecking.
          </div>
        </div>

        <div
          style={{
            padding: '20px 24px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '4px',
          }}
        >
          <div style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '6px', fontFamily: 'var(--font-display)' }}>
            Proposed for Rigorous Comparison
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
            Transformer-based temporal learning is proposed as an alternative to be benchmarked side-by-side against the established LSTM/GRU baseline.
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* SCREEN 5: DATA + EXPERIMENT PLAN */
/* ========================================================================= */
export const Screen5DataExperiment: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1120px',
      }}
    >
      <div
        className="telemetry-mono"
        style={{
          color: 'var(--accent-cyan)',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          marginBottom: '10px',
        }}
      >
        SECTION 04 // DATA & EXPERIMENTAL PROTOCOL
      </div>

      <h2
        style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 600,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          margin: '0 0 28px',
          fontFamily: 'var(--font-display)',
          textAlign: 'center',
        }}
      >
        Verified Dataset & Experimental Setup
      </h2>

      {/* Two Large Side-by-Side Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          width: '100%',
          marginBottom: '24px',
        }}
      >
        {/* Left: ESA Dataset Metrics */}
        <div
          style={{
            background: 'rgba(10, 16, 24, 0.9)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '6px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            className="telemetry-mono"
            style={{
              color: 'var(--accent-cyan)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
            }}
          >
            DATASET // ESA COLLISION AVOIDANCE CHALLENGE
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              textAlign: 'center',
            }}
          >
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px 8px', borderRadius: '4px' }}>
              <div style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                162,634
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                CDM ROWS
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px 8px', borderRadius: '4px' }}>
              <div style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                13,154
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                UNIQUE EVENTS
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px 8px', borderRadius: '4px' }}>
              <div style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 700, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                103
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                FEATURES / CDM
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Standardized physical orbital parameters, state vectors, positional uncertainty covariances, and relative encounter geometry.
          </div>
        </div>

        {/* Right: Controlled Experiment Pipeline */}
        <div
          style={{
            background: 'rgba(10, 16, 24, 0.9)',
            border: '1px solid rgba(52, 211, 153, 0.4)',
            borderRadius: '6px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            className="telemetry-mono"
            style={{
              color: 'var(--accent-emerald)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              marginBottom: '12px',
            }}
          >
            EXPERIMENTAL BENCHMARK PIPELINE
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: '#ffffff',
            }}
          >
            <span style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '6px 10px', borderRadius: '3px' }}>ESA DATA</span>
            <span>→</span>
            <span style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '6px 10px', borderRadius: '3px' }}>PREPROCESS</span>
            <span>→</span>
            <span style={{ background: 'rgba(251, 191, 36, 0.15)', color: 'var(--accent-amber)', padding: '6px 10px', borderRadius: '3px' }}>LSTM / GRU</span>
            <span>vs</span>
            <span style={{ background: 'rgba(52, 211, 153, 0.15)', color: 'var(--accent-emerald)', padding: '6px 10px', borderRadius: '3px' }}>TRANSFORMER</span>
          </div>

          <div
            style={{
              marginTop: '16px',
              padding: '12px 16px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '4px',
              fontSize: '0.88rem',
              color: 'var(--text-primary)',
            }}
          >
            "Both approaches are evaluated under the exact same experimental setup and validation splits."
          </div>
        </div>
      </div>

      {/* Planned Extensions Footnote */}
      <div
        className="telemetry-mono"
        style={{
          color: 'var(--text-tertiary)',
          fontSize: '0.72rem',
          letterSpacing: '0.08em',
        }}
      >
        PLANNED EXTENSIONS: NASA CARA CDM ARCHIVE // SPACE-TRACK / CELESTRAK // ESA DISCOS CATALOG
      </div>
    </div>
  );
};

/* ========================================================================= */
/* SCREEN 6: PROPOSED MODEL */
/* ========================================================================= */
export const Screen6ProposedModel: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '1120px',
      }}
    >
      <div
        className="telemetry-mono"
        style={{
          color: 'var(--accent-emerald)',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          marginBottom: '10px',
        }}
      >
        SECTION 05 // PROPOSED NEURAL ARCHITECTURE
      </div>

      <h2
        style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 600,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          margin: '0 0 24px',
          fontFamily: 'var(--font-display)',
        }}
      >
        Proposed Temporal Transformer Encoder
      </h2>

      {/* Clean 7-Step Architecture Flow */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
          width: '100%',
          marginBottom: '28px',
        }}
      >
        {[
          { step: '1', title: '103 FEATURES', desc: 'CDM observation x_t' },
          { step: '2', title: 'PROJECTION', desc: 'Dense latent e_t' },
          { step: '3', title: 'TIME-TO-TCA', desc: 'Positional vector P_t' },
          { step: '4', title: 'ATTENTION', desc: 'Multi-head Q, K, V' },
          { step: '5', title: 'ENCODER xN', desc: 'Residual & FFN blocks' },
          { step: '6', title: 'EVENT VECTOR', desc: 'Temporal pool h_event' },
          { step: '7', title: 'RISK HEAD', desc: 'Probability P_c' },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(10, 16, 24, 0.95)',
              border: idx === 3 || idx === 4 ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '16px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <div
              className="telemetry-mono"
              style={{
                color: idx === 3 || idx === 4 ? 'var(--accent-emerald)' : 'var(--text-tertiary)',
                fontSize: '0.65rem',
                fontWeight: 600,
              }}
            >
              STAGE {item.step}
            </div>
            <div
              style={{
                fontSize: '0.78rem',
                color: '#ffffff',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                fontSize: '0.68rem',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Model Visualizer Blueprint */}
      <div
        style={{
          width: '100%',
          height: '240px',
          background: 'rgba(8, 12, 18, 0.8)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '6px',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '20px',
        }}
      >
        <ModelArchitectureVisualizer phase={10} />
      </div>

      {/* Status Notice */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '8px 18px',
          background: 'rgba(251, 191, 36, 0.08)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '3px',
        }}
      >
        <span
          className="telemetry-mono"
          style={{
            color: 'var(--accent-amber)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
          }}
        >
          [ PROPOSED ARCHITECTURE // TRAINING STATUS: NOT YET TRAINED — EXPERIMENTAL VALIDATION PENDING ]
        </span>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* SCREEN 7: EXPECTED OUTPUT / HERO DEMO */
/* ========================================================================= */
export const Screen7SimulatedDemo: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1120px',
      }}
    >
      <div
        className="telemetry-mono"
        style={{
          color: 'var(--accent-ruby)',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          marginBottom: '10px',
        }}
      >
        SECTION 06 // EXPECTED RISK INTELLIGENCE OUTPUT
      </div>

      <h2
        style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 600,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          margin: '0 0 24px',
          fontFamily: 'var(--font-display)',
          textAlign: 'center',
        }}
      >
        Operational Decision Support Demonstration
      </h2>

      {/* Workstation Simulation Area */}
      <div
        style={{
          width: '100%',
          height: '380px',
          background: 'rgba(8, 12, 18, 0.85)',
          border: '1px solid rgba(248, 113, 113, 0.4)',
          borderRadius: '6px',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '20px',
        }}
      >
        <PredictionSimulationVisualizer phase={7} />
      </div>

      {/* Honest Prototype Safeguards Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '10px 18px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
        }}
      >
        <div
          className="telemetry-mono"
          style={{
            color: 'var(--accent-ruby)',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
          }}
        >
          [ SIMULATED DEMO OUTPUT — NOT A DEPLOYED OPERATIONAL SYSTEM ]
        </div>

        <div
          className="telemetry-mono"
          style={{
            color: 'var(--text-tertiary)',
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
          }}
        >
          DECISION SUPPORT PROTOTYPE // PRESERVES OPERATOR AUTHORITY
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* SCREEN 8: CONCLUSION */
/* ========================================================================= */
export const Screen8Conclusion: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '960px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="telemetry-mono"
        style={{
          color: 'var(--accent-emerald)',
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          marginBottom: '16px',
        }}
      >
        SECTION 07 // PROJECT SUMMARY & HORIZON
      </motion.div>

      {/* Main Research Question */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontSize: 'clamp(2.0rem, 4.2vw, 3.4rem)',
          fontWeight: 600,
          color: '#ffffff',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          margin: '0 0 14px',
          fontFamily: 'var(--font-display)',
        }}
      >
        Can temporal attention improve satellite conjunction risk prediction?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
          color: 'var(--accent-emerald)',
          margin: '0 0 32px',
          fontFamily: 'var(--font-mono)',
        }}
      >
        Evaluated against established LSTM / GRU baselines.
      </motion.p>

      {/* Compact Pipeline Arrow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 24px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          color: '#ffffff',
          marginBottom: '28px',
        }}
      >
        <span>DATA</span>
        <span style={{ color: 'var(--accent-emerald)' }}>→</span>
        <span>SEQUENCE</span>
        <span style={{ color: 'var(--accent-emerald)' }}>→</span>
        <span>MODEL</span>
        <span style={{ color: 'var(--accent-emerald)' }}>→</span>
        <span>RISK</span>
      </motion.div>

      {/* Final Thesis Line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          fontSize: 'clamp(1.0rem, 1.8vw, 1.25rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '36px',
        }}
      >
        "From historical conjunction observations to intelligent collision-risk prediction."
      </motion.div>

      <div
        className="telemetry-mono"
        style={{
          color: 'var(--text-tertiary)',
          fontSize: '0.72rem',
          letterSpacing: '0.1em',
        }}
      >
        RESEARCH PROTOTYPE // ORBITAL COLLISION RISK INTELLIGENCE
      </div>
    </div>
  );
};
