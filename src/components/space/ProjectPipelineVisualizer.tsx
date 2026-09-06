import React from 'react';

interface ProjectPipelineVisualizerProps {
  phase: number; // 1 to 9
  parallaxX?: number;
  parallaxY?: number;
}

export const ProjectPipelineVisualizer: React.FC<ProjectPipelineVisualizerProps> = ({
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
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 4,
        transform: `translate3d(${parallaxX * -10}px, ${parallaxY * -10}px, 0)`,
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="pipelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.6)" />
            <stop offset="50%" stopColor="rgba(52, 211, 153, 0.8)" />
            <stop offset="100%" stopColor="rgba(251, 191, 36, 0.6)" />
          </linearGradient>
        </defs>

        {/* Phase 1: Progressive Pipeline Overview */}
        {phase === 1 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {[
              { label: 'DATA', x: -350, num: '01' },
              { label: 'PREPROCESSING', x: -210, num: '02' },
              { label: 'BASELINE', x: -70, num: '03' },
              { label: 'PROPOSED MODEL', x: 70, num: '04' },
              { label: 'EVALUATION', x: 210, num: '05' },
              { label: 'FINAL OUTPUT', x: 350, num: '06' },
            ].map((step, idx) => (
              <g key={step.label} transform={`translate(${step.x}, 0)`}>
                <rect
                  x="-55"
                  y="-22"
                  width="110"
                  height="44"
                  fill="rgba(8, 12, 16, 0.9)"
                  stroke={idx === 3 ? 'rgba(52, 211, 153, 0.6)' : 'var(--border-subtle)'}
                  strokeWidth={idx === 3 ? 1.2 : 0.8}
                  rx="2"
                />
                <text
                  x="0"
                  y="-6"
                  textAnchor="middle"
                  fill="var(--text-tertiary)"
                  fontSize="6.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                >
                  {step.num}
                </text>
                <text
                  x="0"
                  y="8"
                  textAnchor="middle"
                  fill={idx === 3 ? '#34d399' : '#ffffff'}
                  fontSize="6.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                  fontWeight={idx === 3 ? '600' : '400'}
                >
                  {step.label}
                </text>

                {/* Connecting arrow */}
                {idx < 5 && (
                  <g>
                    <line x1="55" y1="0" x2="85" y2="0" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeDasharray="2 3" />
                    <polygon points="85,0 80,-2.5 80,2.5" fill="rgba(255, 255, 255, 0.4)" />
                  </g>
                )}
              </g>
            ))}
          </g>
        )}

        {/* Phase 2: Primary Dataset (ESA Collision Avoidance Challenge) */}
        {phase === 2 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Center Dataset Node */}
            <g transform="translate(0, -50)">
              <rect
                x="-160"
                y="-22"
                width="320"
                height="44"
                fill="rgba(10, 14, 20, 0.95)"
                stroke="rgba(56, 189, 248, 0.5)"
                strokeWidth="1.2"
                rx="2"
              />
              <text
                x="0"
                y="-4"
                textAnchor="middle"
                fill="var(--accent-cyan)"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.14em"
              >
                PRIMARY DATASET
              </text>
              <text
                x="0"
                y="12"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="8.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
                fontWeight="600"
              >
                ESA COLLISION AVOIDANCE CHALLENGE
              </text>
            </g>

            {/* 4 Dataset Spec Cards */}
            {[
              { label: '13K+ LABELED CONJUNCTION EVENTS', x: -280, y: 50 },
              { label: 'MULTIPLE CDMs PER EVENT', x: -90, y: 50 },
              { label: 'TEMPORAL OBSERVATIONS', x: 90, y: 50 },
              { label: '100+ FEATURES PER CDM', x: 280, y: 50 },
            ].map((spec) => (
              <g key={spec.label} transform={`translate(${spec.x}, ${spec.y})`}>
                <line x1="0" y1="-78" x2="0" y2="-18" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.8" strokeDasharray="2 3" />
                <rect
                  x="-80"
                  y="-18"
                  width="160"
                  height="36"
                  fill="rgba(8, 12, 16, 0.9)"
                  stroke="var(--border-subtle)"
                  strokeWidth="0.8"
                  rx="2"
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill="var(--text-secondary)"
                  fontSize="6.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                >
                  {spec.label}
                </text>
              </g>
            ))}
          </g>
        )}

        {/* Phase 3: Preprocessing Pipeline */}
        {phase === 3 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {[
              { label: 'RAW CDMs', x: -360 },
              { label: 'CLEANING', x: -220 },
              { label: 'NORMALIZATION', x: -80 },
              { label: 'FEATURE SELECTION', x: 70 },
              { label: 'TEMPORAL SEQUENCES', x: 220 },
              { label: 'TRAIN / VAL / TEST', x: 370 },
            ].map((step, idx) => (
              <g key={step.label} transform={`translate(${step.x}, 0)`}>
                <rect
                  x="-60"
                  y="-18"
                  width="120"
                  height="36"
                  fill="rgba(8, 12, 16, 0.9)"
                  stroke="var(--border-subtle)"
                  strokeWidth="0.8"
                  rx="2"
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill={idx === 4 ? 'var(--accent-cyan)' : 'var(--text-primary)'}
                  fontSize="6.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                  fontWeight={idx === 4 ? '600' : '400'}
                >
                  {step.label}
                </text>

                {idx < 5 && (
                  <g>
                    <line x1="60" y1="0" x2="80" y2="0" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
                    <polygon points="80,0 76,-2.5 76,2.5" fill="rgba(255, 255, 255, 0.5)" />
                  </g>
                )}
              </g>
            ))}

            {/* Lower visual: CDM sequence conversion representation */}
            <g transform="translate(0, 75)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="7"
                fontFamily="var(--font-mono)"
                letterSpacing="0.12em"
              >
                CDM 01 → CDM 02 → CDM 03 → CDM 04 → CDM 05 ──→ TEMPORAL SEQUENCE INPUT
              </text>
            </g>
          </g>
        )}

        {/* Phase 4: Baseline Reproduction */}
        {phase === 4 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Step 1: Published Approach */}
            <g transform="translate(-240, 0)">
              <rect
                x="-80"
                y="-20"
                width="160"
                height="40"
                fill="rgba(8, 12, 16, 0.9)"
                stroke="var(--border-subtle)"
                strokeWidth="0.8"
                rx="2"
              />
              <text
                x="0"
                y="-2"
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="7"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
              >
                PUBLISHED APPROACH
              </text>
              <text
                x="0"
                y="10"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
                fontWeight="500"
              >
                LSTM / GRU
              </text>
            </g>

            <line x1="-160" y1="0" x2="-90" y2="0" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
            <polygon points="-90,0 -95,-3 -95,3" fill="rgba(255, 255, 255, 0.5)" />

            {/* Step 2: Our Reproduction */}
            <g transform="translate(0, 0)">
              <rect
                x="-90"
                y="-20"
                width="180"
                height="40"
                fill="rgba(10, 14, 20, 0.95)"
                stroke="rgba(56, 189, 248, 0.5)"
                strokeWidth="1"
                rx="2"
              />
              <text
                x="0"
                y="-2"
                textAnchor="middle"
                fill="var(--accent-cyan)"
                fontSize="7"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
              >
                EXPERIMENTAL DISCIPLINE
              </text>
              <text
                x="0"
                y="10"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
                fontWeight="500"
              >
                REPRODUCE BASELINE
              </text>
            </g>

            <line x1="90" y1="0" x2="160" y2="0" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
            <polygon points="160,0 155,-3 155,3" fill="rgba(255, 255, 255, 0.5)" />

            {/* Step 3: Reliable Reference */}
            <g transform="translate(240, 0)">
              <rect
                x="-80"
                y="-20"
                width="160"
                height="40"
                fill="rgba(8, 12, 16, 0.9)"
                stroke="var(--border-subtle)"
                strokeWidth="0.8"
                rx="2"
              />
              <text
                x="0"
                y="-2"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="6.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
              >
                REFERENCE POINT
              </text>
              <text
                x="0"
                y="10"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
                fontWeight="500"
              >
                BASELINE ESTABLISHED
              </text>
            </g>
          </g>
        )}

        {/* Phase 5: Proposed Transformer Model Pipeline */}
        {phase === 5 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {[
              { label: 'TEMPORAL CDM SEQUENCE', x: -375, w: 140 },
              { label: 'FEATURE EMBEDDING', x: -225, w: 120 },
              { label: 'POSITIONAL INFO', x: -80, w: 120 },
              { label: 'TRANSFORMER / ATTENTION', x: 80, w: 160, highlight: true },
              { label: 'RISK REPRESENTATION', x: 235, w: 130 },
              { label: 'PREDICTION', x: 365, w: 90 },
            ].map((block, idx) => (
              <g key={block.label} transform={`translate(${block.x}, 0)`}>
                <rect
                  x={-block.w / 2}
                  y="-18"
                  width={block.w}
                  height="36"
                  fill="rgba(8, 12, 16, 0.95)"
                  stroke={block.highlight ? 'rgba(52, 211, 153, 0.6)' : 'var(--border-subtle)'}
                  strokeWidth={block.highlight ? 1.2 : 0.8}
                  rx="2"
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill={block.highlight ? '#34d399' : '#ffffff'}
                  fontSize="6.2"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                  fontWeight={block.highlight ? '600' : '400'}
                >
                  {block.label}
                </text>

                {idx < 5 && (
                  <g>
                    <line x1={block.w / 2} y1="0" x2={block.w / 2 + 15} y2="0" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
                  </g>
                )}
              </g>
            ))}
          </g>
        )}

        {/* Phase 6: Fair Comparison */}
        {phase === 6 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Top Shared Protocol Box */}
            <g transform="translate(0, -60)">
              <rect
                x="-140"
                y="-16"
                width="280"
                height="32"
                fill="rgba(8, 12, 16, 0.9)"
                stroke="var(--border-subtle)"
                strokeWidth="0.8"
                rx="2"
              />
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.12em"
              >
                SAME DATA &nbsp;|&nbsp; SAME EVALUATION SETUP
              </text>
            </g>

            {/* Split track: Left Baseline, Right Proposed */}
            <g transform="translate(-160, 0)">
              <rect
                x="-90"
                y="-18"
                width="180"
                height="36"
                fill="rgba(8, 12, 16, 0.9)"
                stroke="rgba(56, 189, 248, 0.4)"
                strokeWidth="1"
                rx="2"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="var(--accent-cyan)"
                fontSize="8"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
                fontWeight="500"
              >
                LSTM / GRU
              </text>
            </g>

            <text x="0" y="4" textAnchor="middle" fill="var(--border-strong)" fontSize="9" fontFamily="var(--font-mono)">
              VS
            </text>

            <g transform="translate(160, 0)">
              <rect
                x="-110"
                y="-18"
                width="220"
                height="36"
                fill="rgba(8, 12, 16, 0.9)"
                stroke="rgba(52, 211, 153, 0.5)"
                strokeWidth="1"
                rx="2"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="var(--accent-emerald)"
                fontSize="8"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
                fontWeight="500"
              >
                TRANSFORMER / ATTENTION
              </text>
            </g>

            {/* Bottom Evaluation Metrics Tags (No assigned values) */}
            <g transform="translate(0, 60)">
              <line x1="-180" y1="0" x2="180" y2="0" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" />
              {['MAE', 'RMSE', 'AUC', 'F1'].map((metric, idx) => (
                <g key={metric} transform={`translate(${-135 + idx * 90}, 0)`}>
                  <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                  <text
                    x="0"
                    y="18"
                    textAnchor="middle"
                    fill="var(--text-tertiary)"
                    fontSize="7"
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.1em"
                  >
                    {metric}
                  </text>
                </g>
              ))}
            </g>
          </g>
        )}

        {/* Phase 7: Extension Roadmap (Core vs Planned Extensions) */}
        {phase === 7 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Core Implementation */}
            <g transform="translate(-240, 0)">
              <rect
                x="-110"
                y="-35"
                width="220"
                height="70"
                fill="rgba(10, 16, 24, 0.95)"
                stroke="rgba(52, 211, 153, 0.5)"
                strokeWidth="1.2"
                rx="2"
              />
              <text
                x="0"
                y="-14"
                textAnchor="middle"
                fill="#34d399"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.14em"
                fontWeight="600"
              >
                CORE IMPLEMENTATION
              </text>
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="6.8"
                fontFamily="var(--font-mono)"
                letterSpacing="0.06em"
              >
                ESA CDM CHALLENGE DATASET
              </text>
              <text
                x="0"
                y="20"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="6"
                fontFamily="var(--font-mono)"
              >
                BASELINE + TRANSFORMER
              </text>
            </g>

            {/* Extension 1: NASA CARA */}
            <g transform="translate(160, -45)">
              <rect
                x="-120"
                y="-25"
                width="240"
                height="50"
                fill="rgba(8, 12, 16, 0.9)"
                stroke="rgba(56, 189, 248, 0.35)"
                strokeWidth="0.8"
                strokeDasharray="3 3"
                rx="2"
              />
              <text
                x="0"
                y="-8"
                textAnchor="middle"
                fill="var(--accent-cyan)"
                fontSize="6.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
              >
                PLANNED EXTENSION // NASA CARA
              </text>
              <text
                x="0"
                y="8"
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="6"
                fontFamily="var(--font-mono)"
              >
                LARGER-SCALE PRETRAINING
              </text>
            </g>

            {/* Extension 2: TLE + DISCOS */}
            <g transform="translate(160, 45)">
              <rect
                x="-120"
                y="-25"
                width="240"
                height="50"
                fill="rgba(8, 12, 16, 0.9)"
                stroke="rgba(251, 191, 36, 0.35)"
                strokeWidth="0.8"
                strokeDasharray="3 3"
                rx="2"
              />
              <text
                x="0"
                y="-8"
                textAnchor="middle"
                fill="var(--accent-amber)"
                fontSize="6.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
              >
                FUTURE ENHANCEMENT // TLE + DISCOS
              </text>
              <text
                x="0"
                y="8"
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="6"
                fontFamily="var(--font-mono)"
              >
                ORBITAL / OBJECT METADATA
              </text>
            </g>

            {/* Tree Connectors */}
            <line x1="-130" y1="0" x2="40" y2="0" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
            <line x1="40" y1="-45" x2="40" y2="45" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
            <line x1="40" y1="-45" x2="40" y2="-45" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
            <line x1="40" y1="45" x2="40" y2="45" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
          </g>
        )}

        {/* Phase 8: Full Scientific Roadmap Sequence */}
        {phase === 8 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {[
              { id: '01', title: 'DATA', x: -390 },
              { id: '02', title: 'PREPROCESSING', x: -260 },
              { id: '03', title: 'BASELINE', x: -130 },
              { id: '04', title: 'TRANSFORMER', x: 0, highlight: true },
              { id: '05', title: 'EVALUATION', x: 130 },
              { id: '06', title: 'EXTENSIONS', x: 260 },
              { id: '07', title: 'FINAL PROTOTYPE', x: 390 },
            ].map((step, idx) => (
              <g key={step.id} transform={`translate(${step.x}, 0)`}>
                <rect
                  x="-55"
                  y="-22"
                  width="110"
                  height="44"
                  fill="rgba(8, 12, 16, 0.95)"
                  stroke={step.highlight ? 'rgba(52, 211, 153, 0.6)' : 'var(--border-subtle)'}
                  strokeWidth={step.highlight ? 1.2 : 0.8}
                  rx="2"
                />
                <text
                  x="0"
                  y="-6"
                  textAnchor="middle"
                  fill={step.highlight ? 'var(--accent-emerald)' : 'var(--text-tertiary)'}
                  fontSize="6.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                >
                  {step.id}
                </text>
                <text
                  x="0"
                  y="8"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="6.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                  fontWeight={step.highlight ? '600' : '400'}
                >
                  {step.title}
                </text>

                {idx < 6 && (
                  <g>
                    <line x1="55" y1="0" x2="75" y2="0" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />
                  </g>
                )}
              </g>
            ))}
          </g>
        )}

        {/* Phase 9: Summary & Final Question */}
        {phase === 9 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* 4 Connected Foundation Blocks */}
            {[
              { label: 'DATA', x: -270, color: 'var(--accent-cyan)' },
              { label: 'SEQUENCE', x: -90, color: 'var(--accent-cyan)' },
              { label: 'MODEL', x: 90, color: 'var(--accent-emerald)' },
              { label: 'RISK', x: 270, color: 'var(--accent-ruby)' },
            ].map((block, idx) => (
              <g key={block.label} transform={`translate(${block.x}, 0)`}>
                <rect
                  x="-65"
                  y="-20"
                  width="130"
                  height="40"
                  fill="rgba(10, 14, 20, 0.95)"
                  stroke={block.color}
                  strokeWidth="1"
                  rx="2"
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill={block.color}
                  fontSize="8.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.14em"
                  fontWeight="600"
                >
                  {block.label}
                </text>

                {idx < 3 && (
                  <g>
                    <line x1="65" y1="0" x2="115" y2="0" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
                    <polygon points="115,0 110,-3 110,3" fill="rgba(255, 255, 255, 0.6)" />
                  </g>
                )}
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};
