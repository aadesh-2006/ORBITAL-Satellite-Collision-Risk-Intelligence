import React from 'react';

interface MissionClosingVisualizerProps {
  phase: number; // 1 to 6
  parallaxX?: number;
  parallaxY?: number;
}

export const MissionClosingVisualizer: React.FC<MissionClosingVisualizerProps> = ({
  phase,
  parallaxX = 0,
  parallaxY = 0,
}) => {
  const cx = 960;
  const cy = 490;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'auto',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: '100%',
          height: '100%',
          transform: `translate3d(${parallaxX * 0.08}px, ${parallaxY * 0.08}px, 0)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <defs>
          <linearGradient id="m10GlowEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="m10GlowCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="m10GlowAmber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="m10EarthHorizon" cx="50%" cy="100%" r="70%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
            <stop offset="40%" stopColor="#0284c7" stopOpacity="0.1" />
            <stop offset="80%" stopColor="#082f49" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Cinematic Orbital Arc / Earth Horizon Backdrop */}
        <g opacity="0.6">
          <ellipse cx={cx} cy="1180" rx="980" ry="420" fill="url(#m10EarthHorizon)" />
          <path
            d="M -100 1180 Q 960 760 2020 1180"
            fill="none"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeWidth="1.2"
          />
          <path
            d="M -100 1195 Q 960 775 2020 1195"
            fill="none"
            stroke="rgba(52, 211, 153, 0.2)"
            strokeWidth="0.8"
            strokeDasharray="4 6"
          />
        </g>

        {/* Orbital Plane Traces */}
        <g opacity="0.16">
          <ellipse cx={cx} cy={cy} rx="580" ry="240" fill="none" stroke="#ffffff" strokeWidth="0.7" strokeDasharray="3 6" />
          <ellipse cx={cx} cy={cy} rx="420" ry="170" fill="none" stroke="#ffffff" strokeWidth="0.6" />
          <ellipse cx={cx} cy={cy} rx="260" ry="100" fill="none" stroke="#ffffff" strokeWidth="0.5" />
        </g>

        {/* ========================================================================= */}
        {/* PHASE 1: SYSTEM COMPLETE (Full Pipeline Trace) */}
        {/* ========================================================================= */}
        {phase === 1 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <rect x="-440" y="-140" width="880" height="280" fill="rgba(8, 14, 22, 0.95)" stroke="var(--border-subtle)" strokeWidth="1.2" rx="6" />

            <text x="-410" y="-110" fill="#34d399" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.1em">
              COMPLETE RESEARCH PIPELINE // [ HISTORICAL DATA → INTELLIGENT PREDICTION ]
            </text>
            <text x="410" y="-110" textAnchor="end" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
              END-TO-END FLOW
            </text>
            <line x1="-410" y1="-95" x2="410" y2="-95" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" />

            {[
              { label: 'HISTORICAL DATA', sub: 'ESA Challenge CDMs', x: -330, color: '#38bdf8' },
              { label: 'TEMPORAL SEQUENCES', sub: 'X ∈ ℝ^(T × 103)', x: -165, color: '#38bdf8' },
              { label: 'BASELINE + PROPOSED', sub: 'LSTM vs Transformer', x: 0, color: '#fbbf24' },
              { label: 'RISK PREDICTION', sub: 'Calibrated Probability', x: 165, color: '#f87171' },
              { label: 'RISK INTELLIGENCE', sub: 'Decision Support HUD', x: 330, color: '#34d399' },
            ].map((step, idx) => (
              <g key={idx} transform={`translate(${step.x}, 0)`}>
                <rect x="-65" y="-30" width="130" height="60" fill="rgba(255, 255, 255, 0.03)" stroke={step.color} strokeWidth="1.1" rx="3" />
                <circle cx="-48" cy="0" r="3.5" fill={step.color} />
                <text x="-36" y="-4" fill="#ffffff" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="600">
                  {step.label}
                </text>
                <text x="-36" y="12" fill={step.color} fontSize="6.5" fontFamily="var(--font-mono)">
                  {step.sub}
                </text>

                {idx < 4 && (
                  <polygon points="76,0 70,-3 70,3" fill="rgba(255, 255, 255, 0.3)" />
                )}
              </g>
            ))}

            <g transform="translate(0, 95)">
              <text x="0" y="0" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
                [ UNIFIED PIPELINE COMPLETE — FROM ASTRODYNAMIC PHYSICS TO TEMPORAL DEEP LEARNING ]
              </text>
            </g>
          </g>
        )}

        {/* ========================================================================= */}
        {/* PHASE 2: WHAT WE ARE BUILDING */}
        {/* ========================================================================= */}
        {phase === 2 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <circle cx="0" cy="0" r="160" fill="none" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="0" cy="0" r="100" fill="none" stroke="rgba(52, 211, 153, 0.2)" strokeWidth="0.8" />
            
            {/* Center Project Emblem */}
            <g transform="translate(0, -20)">
              <rect x="-180" y="-35" width="360" height="70" fill="rgba(8, 14, 22, 0.95)" stroke="var(--accent-emerald)" strokeWidth="1.5" rx="4" />
              <text x="0" y="-4" textAnchor="middle" fill="#ffffff" fontSize="18" fontFamily="var(--font-display)" fontWeight="600" letterSpacing="0.08em">
                ORBITAL
              </text>
              <text x="0" y="18" textAnchor="middle" fill="var(--accent-emerald)" fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.12em">
                SATELLITE COLLISION RISK INTELLIGENCE
              </text>
            </g>

            <g transform="translate(0, 90)">
              <rect x="-240" y="-18" width="480" height="36" fill="rgba(255, 255, 255, 0.03)" stroke="var(--border-subtle)" strokeWidth="0.8" rx="3" />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="var(--font-mono)" fontWeight="500">
                "Learning how satellite collision risk evolves over time across CDM sequences."
              </text>
            </g>
          </g>
        )}

        {/* ========================================================================= */}
        {/* PHASE 3: RESEARCH QUESTION */}
        {/* ========================================================================= */}
        {phase === 3 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <rect x="-380" y="-130" width="760" height="260" fill="rgba(8, 14, 22, 0.95)" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.2" rx="6" />

            <text x="0" y="-90" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.12em">
              CORE RESEARCH QUESTION
            </text>
            <line x1="-320" y1="-75" x2="320" y2="-75" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" />

            <text x="0" y="-30" textAnchor="middle" fill="#ffffff" fontSize="15" fontFamily="var(--font-display)" fontWeight="500" letterSpacing="-0.01em">
              "Can temporal learning improve satellite conjunction risk prediction?"
            </text>

            <g transform="translate(0, 20)">
              <rect x="-200" y="-14" width="400" height="28" fill="rgba(52, 211, 153, 0.08)" stroke="rgba(52, 211, 153, 0.3)" strokeWidth="0.8" rx="2" />
              <text x="0" y="4" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="var(--font-mono)">
                EVALUATED RIGOROUSLY AGAINST ESTABLISHED LSTM/GRU BASELINES
              </text>
            </g>

            <g transform="translate(0, 80)">
              <text x="0" y="0" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
                [ HYPOTHESIS UNDER FORMAL EVALUATION — RELATIVE PERFORMANCE PROVEN EXPERIMENTALLY ]
              </text>
            </g>
          </g>
        )}

        {/* ========================================================================= */}
        {/* PHASE 4: CURRENT PROJECT STATE */}
        {/* ========================================================================= */}
        {phase === 4 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <rect x="-420" y="-150" width="840" height="300" fill="rgba(8, 14, 22, 0.95)" stroke="var(--border-subtle)" strokeWidth="1.2" rx="6" />

            <text x="-390" y="-120" fill="#fbbf24" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.1em">
              CURRENT PROJECT STATE // [ RESEARCH IMPLEMENTATION STATUS ]
            </text>
            <text x="390" y="-120" textAnchor="end" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
              SCIENTIFIC AUDIT
            </text>
            <line x1="-390" y1="-105" x2="390" y2="-105" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" />

            {/* 4 Status Quadrants */}
            {[
              { label: 'DATASET', value: 'ESA Collision Avoidance Challenge', detail: '162,634 training rows // 13,154 events // 103 features', color: '#38bdf8', x: -200, y: -50 },
              { label: 'MODELS', value: 'Baseline (LSTM/GRU) + Proposed Transformer', detail: 'Sequence models ready for benchmarking', color: '#34d399', x: 200, y: -50 },
              { label: 'STATUS', value: 'Prototype / Research Implementation', detail: 'End-to-end data pipeline and architecture coded', color: '#fbbf24', x: -200, y: 45 },
              { label: 'EVALUATION', value: 'Empirical Validation Pending', detail: 'Model training and comparative tests to be executed', color: '#f87171', x: 200, y: 45 },
            ].map((q, idx) => (
              <g key={idx} transform={`translate(${q.x}, ${q.y})`}>
                <rect x="-180" y="-30" width="360" height="60" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" rx="3" />
                <circle cx="-160" cy="-6" r="3.5" fill={q.color} />
                <text x="-148" y="-10" fill="var(--text-tertiary)" fontSize="6.8" fontFamily="var(--font-mono)">
                  {q.label}
                </text>
                <text x="-148" y="6" fill="#ffffff" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">
                  {q.value}
                </text>
                <text x="-148" y="20" fill={q.color} fontSize="6.8" fontFamily="var(--font-mono)">
                  {q.detail}
                </text>
              </g>
            ))}

            <g transform="translate(0, 120)">
              <text x="0" y="0" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7" fontFamily="var(--font-mono)">
                [ METRIC HONESTY: NO INVENTED BENCHMARK ACCURACY OR FALSE PERFORMANCE CLAIMS ]
              </text>
            </g>
          </g>
        )}

        {/* ========================================================================= */}
        {/* PHASE 5: FUTURE EXTENSIONS (Planned Data Sources) */}
        {/* ========================================================================= */}
        {phase === 5 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <rect x="-420" y="-140" width="840" height="280" fill="rgba(8, 14, 22, 0.95)" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.2" rx="6" />

            <text x="-390" y="-110" fill="#38bdf8" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.1em">
              FUTURE EXTENSIONS // [ PLANNED DATA SOURCES ]
            </text>
            <text x="390" y="-110" textAnchor="end" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
              POST-BASELINE ROADMAP
            </text>
            <line x1="-390" y1="-95" x2="390" y2="-95" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" />

            {/* 3 Planned Extensions */}
            {[
              { title: 'NASA CARA ARCHIVE', sub: 'Conjunction Assessment Risk Analysis', desc: 'Additional multi-mission CDM time series across diverse orbital regimes', color: '#38bdf8', x: -260 },
              { title: 'SPACE-TRACK / CELESTRAK', sub: 'TLE & Ephemeris Data', desc: 'Continuous two-line element sets and orbital perturbation context', color: '#34d399', x: 0 },
              { title: 'ESA DISCOS CATALOG', sub: 'Database and Information System', desc: 'Physical satellite properties, cross-sectional areas, and mass attributes', color: '#fbbf24', x: 260 },
            ].map((ext, idx) => (
              <g key={idx} transform={`translate(${ext.x}, 0)`}>
                <rect x="-115" y="-50" width="230" height="100" fill="rgba(255, 255, 255, 0.03)" stroke={ext.color} strokeWidth="1" rx="3" />
                <circle cx="-95" cy="-30" r="3.5" fill={ext.color} />
                <text x="-85" y="-32" fill="#ffffff" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">
                  {ext.title}
                </text>
                <text x="-85" y="-18" fill={ext.color} fontSize="6.8" fontFamily="var(--font-mono)">
                  {ext.sub}
                </text>
                <text x="-100" y="6" fill="var(--text-secondary)" fontSize="6.8" fontFamily="var(--font-sans)" width="200">
                  {ext.desc}
                </text>
                <text x="0" y="38" textAnchor="middle" fill="var(--text-tertiary)" fontSize="6.5" fontFamily="var(--font-mono)">
                  [ PLANNED INTEGRATION ]
                </text>
              </g>
            ))}

            <g transform="translate(0, 105)">
              <text x="0" y="0" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7" fontFamily="var(--font-mono)">
                [ PLANNED ROADMAP ONLY — THESE ARCHIVES ARE NOT YET INTEGRATED INTO THE PROTOTYPE ]
              </text>
            </g>
          </g>
        )}

        {/* ========================================================================= */}
        {/* PHASE 6: FINAL CINEMATIC MESSAGE */}
        {/* ========================================================================= */}
        {phase === 6 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <circle cx="0" cy="0" r="220" fill="none" stroke="rgba(52, 211, 153, 0.3)" strokeWidth="1.2" strokeDasharray="3 6" />
            <circle cx="0" cy="0" r="140" fill="none" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="6" fill="#34d399" />

            <g transform="translate(0, -70)">
              <text x="0" y="0" textAnchor="middle" fill="#ffffff" fontSize="26" fontFamily="var(--font-display)" fontWeight="600" letterSpacing="0.06em">
                ORBITAL
              </text>
              <text x="0" y="26" textAnchor="middle" fill="var(--accent-emerald)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.14em">
                SATELLITE COLLISION RISK INTELLIGENCE
              </text>
            </g>

            <g transform="translate(0, 10)">
              <text x="0" y="0" textAnchor="middle" fill="#ffffff" fontSize="13" fontFamily="var(--font-display)" fontWeight="400" letterSpacing="-0.01em">
                "From historical conjunction data to intelligent risk prediction."
              </text>
              <text x="0" y="24" textAnchor="middle" fill="var(--text-secondary)" fontSize="7.8" fontFamily="var(--font-mono)" letterSpacing="0.1em">
                HISTORICAL OBSERVATIONS → TEMPORAL LEARNING → COLLISION-RISK INTELLIGENCE
              </text>
            </g>

            <g transform="translate(0, 95)">
              <rect x="-240" y="-16" width="480" height="32" fill="rgba(8, 14, 22, 0.95)" stroke="var(--border-subtle)" strokeWidth="0.8" rx="3" />
              <text x="0" y="4" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7.2" fontFamily="var(--font-mono)" letterSpacing="0.08em">
                RESEARCH PROTOTYPE // ORBITAL COLLISION RISK INTELLIGENCE
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
