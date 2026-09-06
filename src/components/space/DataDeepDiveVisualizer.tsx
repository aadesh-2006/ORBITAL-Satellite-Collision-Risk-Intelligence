import React, { useEffect, useState } from 'react';

interface DataDeepDiveVisualizerProps {
  phase: number; // 1 to 8
  parallaxX?: number;
  parallaxY?: number;
}

export const DataDeepDiveVisualizer: React.FC<DataDeepDiveVisualizerProps> = ({
  phase,
  parallaxX = 0,
  parallaxY = 0,
}) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      setTime(performance.now() * 0.001);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const cx = 960;
  const cy = 490;
  const pulse = Math.sin(time * 3) * 0.5 + 0.5;

  const cdmTimeline = [
    { id: 'CDM 01', relativeTime: 'EARLIER', offsetLabel: 'T-72h', x: -280 },
    { id: 'CDM 02', relativeTime: 'INTERMEDIATE', offsetLabel: 'T-48h', x: -140 },
    { id: 'CDM 03', relativeTime: 'INTERMEDIATE', offsetLabel: 'T-24h', x: 0 },
    { id: 'CDM 04', relativeTime: 'LATER', offsetLabel: 'T-12h', x: 140 },
    { id: 'CDM 05', relativeTime: 'NEAR TCA', offsetLabel: 'T-2h', x: 280 },
  ];

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
          <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Phase 1: M5 Synthesis Zoom into DATA */}
        {phase === 1 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* DATA block prominently highlighted */}
            <g transform="translate(-240, 0)">
              <rect
                x="-85"
                y="-28"
                width="170"
                height="56"
                fill="rgba(10, 16, 24, 0.95)"
                stroke="rgba(56, 189, 248, 0.75)"
                strokeWidth="1.5"
                rx="2"
              />
              <text
                x="0"
                y="6"
                textAnchor="middle"
                fill="var(--accent-cyan)"
                fontSize="11"
                fontFamily="var(--font-mono)"
                letterSpacing="0.16em"
                fontWeight="600"
              >
                DATA
              </text>
            </g>

            {/* Downstream stages dimming as camera zooms into DATA */}
            {[
              { label: 'SEQUENCE', x: -40 },
              { label: 'MODEL', x: 140 },
              { label: 'RISK', x: 300 },
            ].map((st, idx) => (
              <g key={st.label} transform={`translate(${st.x}, 0)`} opacity="0.3">
                <rect
                  x="-60"
                  y="-18"
                  width="120"
                  height="36"
                  fill="rgba(8, 12, 16, 0.8)"
                  stroke="var(--border-subtle)"
                  strokeWidth="0.8"
                  rx="2"
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill="var(--text-tertiary)"
                  fontSize="7.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.12em"
                >
                  {st.label}
                </text>
                {idx < 2 && (
                  <line x1="60" y1="0" x2="80" y2="0" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" strokeDasharray="2 3" />
                )}
              </g>
            ))}
          </g>
        )}

        {/* Phase 2: One Conjunction Event (Physical Encounter Isolated) */}
        {phase === 2 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Trajectory Guide Track for Object A */}
            <line
              x1="-320"
              y1="-140"
              x2="300"
              y2="130"
              stroke="rgba(56, 189, 248, 0.3)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />
            {/* Trajectory Guide Track for Object B */}
            <line
              x1="300"
              y1="-150"
              x2="-310"
              y2="140"
              stroke="rgba(52, 211, 153, 0.3)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />

            {/* Encounter Region Target */}
            <circle
              cx="0"
              cy="0"
              r="40"
              fill="none"
              stroke="rgba(248, 113, 113, 0.4)"
              strokeWidth="0.8"
              strokeDasharray="3 4"
            />
            <circle cx="0" cy="0" r="4" fill="var(--accent-ruby)" />

            {/* Object A */}
            <g transform="translate(-80, -35)">
              <circle cx="0" cy="0" r="3" fill="#38bdf8" />
              <circle cx="0" cy="0" r={8 + pulse * 2} fill="none" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="0.75" />
              <text x="-12" y="-8" textAnchor="end" fill="#38bdf8" fontSize="7.5" fontFamily="var(--font-mono)">
                OBJECT A
              </text>
            </g>

            {/* Object B */}
            <g transform="translate(80, 35)">
              <circle cx="0" cy="0" r="3" fill="#34d399" />
              <circle cx="0" cy="0" r={8 + pulse * 2} fill="none" stroke="rgba(52, 211, 153, 0.5)" strokeWidth="0.75" />
              <text x="12" y="14" fill="#34d399" fontSize="7.5" fontFamily="var(--font-mono)">
                OBJECT B
              </text>
            </g>

            {/* Event Isolation Badge */}
            <g transform="translate(0, 75)">
              <rect
                x="-120"
                y="-14"
                width="240"
                height="28"
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
                fontSize="6.8"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
              >
                1 EVENT ──→ MULTIPLE CDMs TO TCA
              </text>
            </g>
          </g>
        )}

        {/* Phase 3: Spatial CDM Sequence Timeline */}
        {phase === 3 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Timeline Axis */}
            <line
              x1="-360"
              y1="0"
              x2="360"
              y2="0"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
            />

            {cdmTimeline.map((node, idx) => (
              <g key={node.id} transform={`translate(${node.x}, 0)`}>
                {/* Vertical tick */}
                <line x1="0" y1="-28" x2="0" y2="28" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />

                {/* Node dot */}
                <circle
                  cx="0"
                  cy="0"
                  r={idx === 4 ? 4.5 : 3}
                  fill={idx === 4 ? '#ffffff' : idx > 2 ? 'var(--accent-emerald)' : 'var(--accent-cyan)'}
                />

                {/* CDM Card */}
                <rect
                  x="-36"
                  y="-48"
                  width="72"
                  height="22"
                  fill="rgba(8, 12, 16, 0.9)"
                  stroke={idx === 4 ? 'rgba(255, 255, 255, 0.5)' : 'var(--border-subtle)'}
                  strokeWidth="0.8"
                  rx="2"
                />
                <text
                  x="0"
                  y="-34"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="7.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                  fontWeight={idx === 4 ? '600' : '400'}
                >
                  {node.id}
                </text>

                {/* Relative Timing Descriptor */}
                <text
                  x="0"
                  y="42"
                  textAnchor="middle"
                  fill="var(--text-tertiary)"
                  fontSize="6.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                >
                  {node.relativeTime}
                </text>
              </g>
            ))}

            {/* Bottom Sequence Flow Note */}
            <g transform="translate(0, 85)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="6.8"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
              >
                EARLIER OBSERVATIONS ──────────────→ CLOSER TO TCA [ REPRESENTATIVE SEQUENCE ]
              </text>
            </g>
          </g>
        )}

        {/* Phase 4: Inside a CDM (5 Representative Categories) */}
        {phase === 4 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Center CDM Blueprint Core */}
            <g transform="translate(0, -70)">
              <rect
                x="-90"
                y="-18"
                width="180"
                height="36"
                fill="rgba(10, 16, 24, 0.95)"
                stroke="rgba(56, 189, 248, 0.6)"
                strokeWidth="1.2"
                rx="2"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="8.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.14em"
                fontWeight="600"
              >
                CDM ANATOMY
              </text>
            </g>

            {/* 5 Clean Structured Categories */}
            {[
              { title: 'EVENT / TIMING', items: 'TCA • Time to TCA', x: -340, y: 30 },
              { title: 'OBJECT STATE', items: 'Position • Velocity', x: -170, y: 30 },
              { title: 'RELATIVE GEOMETRY', items: 'Miss Distance • Rel Vel', x: 0, y: 30 },
              { title: 'UNCERTAINTY', items: 'Covariance Matrix', x: 170, y: 30 },
              { title: 'OBJECT METADATA', items: 'Object Identifiers', x: 340, y: 30 },
            ].map((cat) => (
              <g key={cat.title} transform={`translate(${cat.x}, ${cat.y})`}>
                <line x1="0" y1="-64" x2="0" y2="-18" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" strokeDasharray="2 3" />
                <rect
                  x="-75"
                  y="-18"
                  width="150"
                  height="44"
                  fill="rgba(8, 12, 16, 0.9)"
                  stroke="var(--border-subtle)"
                  strokeWidth="0.8"
                  rx="2"
                />
                <text
                  x="0"
                  y="-4"
                  textAnchor="middle"
                  fill="var(--accent-cyan)"
                  fontSize="6.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                  fontWeight="500"
                >
                  {cat.title}
                </text>
                <text
                  x="0"
                  y="12"
                  textAnchor="middle"
                  fill="var(--text-secondary)"
                  fontSize="6.2"
                  fontFamily="var(--font-mono)"
                >
                  {cat.items}
                </text>
              </g>
            ))}

            <g transform="translate(0, 95)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="6.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
              >
                REPRESENTATIVE CDM FEATURES [ SCHEMATIC ]
              </text>
            </g>
          </g>
        )}

        {/* Phase 5: From Raw Data to Learning Signal (Temporal Feature Matrix) */}
        {phase === 5 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Left: 5 CDM vectors */}
            <g transform="translate(-180, 0)">
              {cdmTimeline.map((cdm, idx) => (
                <g key={cdm.id} transform={`translate(0, ${-60 + idx * 30})`}>
                  <rect
                    x="-120"
                    y="-12"
                    width="240"
                    height="24"
                    fill="rgba(8, 12, 16, 0.9)"
                    stroke="var(--border-subtle)"
                    strokeWidth="0.8"
                    rx="1"
                  />
                  <text
                    x="-105"
                    y="3"
                    fill="var(--accent-cyan)"
                    fontSize="6.5"
                    fontFamily="var(--font-mono)"
                    fontWeight="500"
                  >
                    {cdm.id}
                  </text>
                  <text
                    x="20"
                    y="3"
                    textAnchor="middle"
                    fill="var(--text-tertiary)"
                    fontSize="6.5"
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.08em"
                  >
                    [ x₁ &nbsp; x₂ &nbsp; x₃ &nbsp; ... &nbsp; x₁₀₃ ]
                  </text>
                </g>
              ))}
            </g>

            {/* Arrow */}
            <line x1="-30" y1="0" x2="30" y2="0" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
            <polygon points="30,0 25,-3 25,3" fill="rgba(255, 255, 255, 0.5)" />

            {/* Right: Temporal Feature Matrix X in R^(T x F) */}
            <g transform="translate(180, 0)">
              <rect
                x="-120"
                y="-75"
                width="240"
                height="150"
                fill="rgba(10, 16, 24, 0.95)"
                stroke="rgba(52, 211, 153, 0.5)"
                strokeWidth="1.2"
                rx="2"
              />
              <text
                x="0"
                y="-45"
                textAnchor="middle"
                fill="#34d399"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.12em"
                fontWeight="600"
              >
                TEMPORAL FEATURE MATRIX
              </text>
              <text
                x="0"
                y="-15"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="11"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
              >
                X ∈ ℝ^(T × F)
              </text>
              <text
                x="0"
                y="15"
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="6.8"
                fontFamily="var(--font-mono)"
              >
                T = TEMPORAL OBSERVATIONS
              </text>
              <text
                x="0"
                y="32"
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="6.8"
                fontFamily="var(--font-mono)"
              >
                F = FEATURES PER OBSERVATION
              </text>
              <text
                x="0"
                y="52"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="6"
                fontFamily="var(--font-mono)"
              >
                [ REPRESENTATIVE T = 5, F = 103 ]
              </text>
            </g>
          </g>
        )}

        {/* Phase 6: Preprocessing Pipeline Stages */}
        {phase === 6 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {[
              { label: 'RAW CDMs', desc: 'Unstructured messages', x: -360 },
              { label: 'CLEANING', desc: 'Missing values filtered', x: -220 },
              { label: 'NORMALIZATION', desc: 'Scaled ranges', x: -80 },
              { label: 'FEATURE SELECTION', desc: 'Physics parameters', x: 70 },
              { label: 'TEMPORAL ALIGNMENT', desc: 'Ordered sequence', x: 220, highlight: true },
              { label: 'MODEL INPUT', desc: 'Tensor representation', x: 370 },
            ].map((step, idx) => (
              <g key={step.label} transform={`translate(${step.x}, 0)`}>
                <rect
                  x="-62"
                  y="-22"
                  width="124"
                  height="44"
                  fill="rgba(8, 12, 16, 0.9)"
                  stroke={step.highlight ? 'rgba(56, 189, 248, 0.6)' : 'var(--border-subtle)'}
                  strokeWidth={step.highlight ? 1.2 : 0.8}
                  rx="2"
                />
                <text
                  x="0"
                  y="-5"
                  textAnchor="middle"
                  fill={step.highlight ? 'var(--accent-cyan)' : '#ffffff'}
                  fontSize="6.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                  fontWeight={step.highlight ? '600' : '400'}
                >
                  {step.label}
                </text>
                <text
                  x="0"
                  y="10"
                  textAnchor="middle"
                  fill="var(--text-tertiary)"
                  fontSize="5.5"
                  fontFamily="var(--font-mono)"
                >
                  {step.desc}
                </text>

                {idx < 5 && (
                  <g>
                    <line x1="62" y1="0" x2="80" y2="0" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
                    <polygon points="80,0 76,-2.5 76,2.5" fill="rgba(255, 255, 255, 0.4)" />
                  </g>
                )}
              </g>
            ))}

            <g transform="translate(0, 80)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="6.8"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
              >
                PREPROCESSING PIPELINE [ EXPERIMENTAL DESIGN ]
              </text>
            </g>
          </g>
        )}

        {/* Phase 7: Dataset Scale (162K rows vs 13K events) */}
        {phase === 7 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Header: Dataset Title */}
            <g transform="translate(0, -75)">
              <rect
                x="-180"
                y="-16"
                width="360"
                height="32"
                fill="rgba(10, 16, 24, 0.95)"
                stroke="rgba(56, 189, 248, 0.5)"
                strokeWidth="1.2"
                rx="2"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="8"
                fontFamily="var(--font-mono)"
                letterSpacing="0.12em"
                fontWeight="600"
              >
                ESA COLLISION AVOIDANCE CHALLENGE
              </text>
            </g>

            {/* Left Card: Training Set */}
            <g transform="translate(-200, 10)">
              <rect
                x="-130"
                y="-45"
                width="260"
                height="90"
                fill="rgba(8, 12, 16, 0.95)"
                stroke="var(--border-subtle)"
                strokeWidth="1"
                rx="2"
              />
              <text
                x="0"
                y="-24"
                textAnchor="middle"
                fill="var(--accent-cyan)"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.14em"
                fontWeight="600"
              >
                TRAINING SET
              </text>
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="11"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
                fontWeight="500"
              >
                162,634 ROWS
              </text>
              <text
                x="0"
                y="24"
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
              >
                13,154 UNIQUE LABELED EVENTS
              </text>
            </g>

            {/* Right Card: Test Set */}
            <g transform="translate(200, 10)">
              <rect
                x="-130"
                y="-45"
                width="260"
                height="90"
                fill="rgba(8, 12, 16, 0.95)"
                stroke="var(--border-subtle)"
                strokeWidth="1"
                rx="2"
              />
              <text
                x="0"
                y="-24"
                textAnchor="middle"
                fill="var(--accent-emerald)"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.14em"
                fontWeight="600"
              >
                TEST SET
              </text>
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="11"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
                fontWeight="500"
              >
                24,484 ROWS
              </text>
              <text
                x="0"
                y="24"
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
              >
                2,167 UNIQUE EVENTS
              </text>
            </g>

            {/* Bottom: Feature Space & Key Insight */}
            <g transform="translate(0, 95)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="var(--accent-amber)"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.12em"
                fontWeight="500"
              >
                FEATURE SPACE: 103 VARIABLES &nbsp;|&nbsp; ROWS ≠ UNIQUE EVENTS (MULTIPLE CDMs PER EVENT)
              </text>
            </g>
          </g>
        )}

        {/* Phase 8: Final Model Input Assembly & Synthesis */}
        {phase === 8 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {[
              { label: 'ESA DATA', x: -360 },
              { label: 'CONJUNCTION EVENT', x: -220 },
              { label: 'CDM OBSERVATIONS', x: -70 },
              { label: 'TEMPORAL SEQUENCE', x: 80, highlight: true },
              { label: 'FEATURE MATRIX', x: 230 },
              { label: 'MODEL INPUT', x: 370, highlight: true },
            ].map((step, idx) => (
              <g key={step.label} transform={`translate(${step.x}, 0)`}>
                <rect
                  x="-62"
                  y="-20"
                  width="124"
                  height="40"
                  fill="rgba(8, 12, 16, 0.95)"
                  stroke={step.highlight ? 'rgba(52, 211, 153, 0.6)' : 'var(--border-subtle)'}
                  strokeWidth={step.highlight ? 1.2 : 0.8}
                  rx="2"
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill={step.highlight ? '#34d399' : '#ffffff'}
                  fontSize="6.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                  fontWeight={step.highlight ? '600' : '400'}
                >
                  {step.label}
                </text>

                {idx < 5 && (
                  <g>
                    <line x1="62" y1="0" x2="82" y2="0" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" />
                    <polygon points="82,0 77,-2.5 77,2.5" fill="rgba(255, 255, 255, 0.5)" />
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
