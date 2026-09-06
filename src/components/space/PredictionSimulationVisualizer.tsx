import React, { useState } from 'react';

interface PredictionSimulationVisualizerProps {
  phase: number; // 1 to 10
  parallaxX?: number;
  parallaxY?: number;
}

export const PredictionSimulationVisualizer: React.FC<PredictionSimulationVisualizerProps> = ({
  phase,
  parallaxX = 0,
  parallaxY = 0,
}) => {
  const [hoveredCdm, setHoveredCdm] = useState<number | null>(null);

  const cx = 960;
  const cy = 490;

  const cdmNodes = [
    { id: 'cdm1', num: '01', timeTag: 'T-72h', missDist: '1,420 m', pc: '0.00002', status: 'EARLY NOTICE', color: '#38bdf8', x: -280 },
    { id: 'cdm2', num: '02', timeTag: 'T-48h', missDist: '890 m', pc: '0.00008', status: 'REFINED TRACK', color: '#38bdf8', x: -140 },
    { id: 'cdm3', num: '03', timeTag: 'T-24h', missDist: '510 m', pc: '0.00019', status: 'UPDATED COV', color: '#fbbf24', x: 0 },
    { id: 'cdm4', num: '04', timeTag: 'T-12h', missDist: '340 m', pc: '0.00035', status: 'CLOSE APPROACH', color: '#f87171', x: 140 },
    { id: 'cdm5', num: '05', timeTag: 'T-2h', missDist: '284 m', pc: '0.00042', status: 'CRITICAL WINDOW', color: '#f87171', x: 280 },
  ];

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
          transform: `translate3d(${parallaxX * 0.1}px, ${parallaxY * 0.1}px, 0)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <defs>
          <linearGradient id="m8GlowCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="m8GlowEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="m8GlowAmber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="m8GlowRuby" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="m8StreamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Global Blueprint Grid Backdrop */}
        <g opacity="0.18">
          <circle cx={cx} cy={cy} r="480" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.7" strokeDasharray="3 6" />
          <circle cx={cx} cy={cy} r="320" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.6" />
          <circle cx={cx} cy={cy} r="160" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.5" />
          <line x1={cx - 520} y1={cy} x2={cx + 520} y2={cy} stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.7" strokeDasharray="4 8" />
          <line x1={cx} y1={cy - 340} x2={cx} y2={cy + 340} stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.7" strokeDasharray="4 8" />
        </g>

        {/* PHASE 1: SELECT CONJUNCTION */}
        {phase === 1 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <path
              d="M -420 -160 C -180 -90, -80 0, 0 30 C 80 60, 220 120, 420 180"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.6"
              strokeDasharray="6 4"
            />
            <path
              d="M -420 180 C -220 110, -90 50, 0 30 C 90 10, 240 -80, 420 -150"
              fill="none"
              stroke="#f87171"
              strokeWidth="1.6"
              strokeDasharray="6 4"
            />

            {/* Satellite A */}
            <g transform="translate(-240, -110)">
              <circle cx="0" cy="0" r="16" fill="rgba(8, 14, 22, 0.9)" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="5" fill="#38bdf8" />
              <text x="0" y="30" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="var(--font-mono)" fontWeight="600">
                OBJECT A (PRIMARY)
              </text>
              <text x="0" y="44" textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)">
                [ SIMULATED ASSET ] // NORAD #49281
              </text>
            </g>

            {/* Debris B */}
            <g transform="translate(-240, 130)">
              <circle cx="0" cy="0" r="16" fill="rgba(8, 14, 22, 0.9)" stroke="#f87171" strokeWidth="1.5" />
              <polygon points="0,-7 6,5 -6,5" fill="#f87171" />
              <text x="0" y="32" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="var(--font-mono)" fontWeight="600">
                OBJECT B (SECONDARY)
              </text>
              <text x="0" y="46" textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)">
                [ SIMULATED DEBRIS ] // FRAG-882
              </text>
            </g>

            {/* TCA Encounter Point */}
            <g transform="translate(0, 30)">
              <circle cx="0" cy="0" r="44" fill="rgba(248, 113, 113, 0.08)" stroke="rgba(248, 113, 113, 0.5)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="0" cy="0" r="24" fill="rgba(248, 113, 113, 0.15)" stroke="#f87171" strokeWidth="1.4" />
              <circle cx="0" cy="0" r="4" fill="#ffffff" />
              <text x="0" y="-34" textAnchor="middle" fill="#f87171" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.1em">
                TCA ENCOUNTER POINT
              </text>
              <text x="0" y="58" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="var(--font-mono)" fontWeight="500">
                MISS DISTANCE: 284 m [SIMULATED]
              </text>
              <text x="0" y="72" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8" fontFamily="var(--font-mono)">
                V_REL: 14.2 km/s // 5 CDMs COLLECTED
              </text>
            </g>

            {/* Dossier */}
            <g transform="translate(240, 0)">
              <rect x="-100" y="-55" width="200" height="110" fill="rgba(10, 16, 24, 0.85)" stroke="var(--border-subtle)" strokeWidth="1" rx="4" />
              <text x="-85" y="-32" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">ENCOUNTER DOSSIER</text>
              <text x="-85" y="-14" fill="#38bdf8" fontSize="8.5" fontFamily="var(--font-mono)">EVENT ID: SIM-EVT-9042</text>
              <text x="-85" y="4" fill="#ffffff" fontSize="8.5" fontFamily="var(--font-mono)">ALTITUDE: 642.8 km (LEO)</text>
              <text x="-85" y="22" fill="#fbbf24" fontSize="8.5" fontFamily="var(--font-mono)">CDM HISTORY: 5 MESSAGES</text>
              <text x="-85" y="40" fill="var(--accent-emerald)" fontSize="7.5" fontFamily="var(--font-mono)">[ SIMULATED SCENARIO ]</text>
            </g>
          </g>
        )}

        {/* PHASE 2: LOAD CDM SEQUENCE */}
        {phase === 2 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <line x1="-360" y1="0" x2="360" y2="0" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" />
            <polygon points="365,0 355,-4 355,4" fill="rgba(255, 255, 255, 0.4)" />
            <text x="360" y="24" textAnchor="end" fill="var(--text-tertiary)" fontSize="8" fontFamily="var(--font-mono)">
              APPROACH TO TCA →
            </text>

            <path
              d="M -280 0 L -140 0 L 0 0 L 140 0 L 280 0"
              fill="none"
              stroke="url(#m8StreamGrad)"
              strokeWidth="2.5"
            />

            {cdmNodes.map((node, idx) => (
              <g
                key={node.id}
                transform={`translate(${node.x}, 0)`}
                onMouseEnter={() => setHoveredCdm(idx)}
                onMouseLeave={() => setHoveredCdm(null)}
                style={{ cursor: 'pointer' }}
              >
                <line x1="0" y1="-80" x2="0" y2="80" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" strokeDasharray="3 3" />

                <g transform="translate(0, -95)">
                  <rect x="-36" y="-12" width="72" height="24" fill="rgba(10, 16, 24, 0.95)" stroke={node.color} strokeWidth="1.2" rx="3" />
                  <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
                    CDM {node.num}
                  </text>
                </g>

                <circle cx="0" cy="0" r={hoveredCdm === idx ? 18 : 14} fill="rgba(8, 14, 22, 0.95)" stroke={node.color} strokeWidth="1.5" />
                <circle cx="0" cy="0" r="4" fill={node.color} />
                <text x="0" y="-22" textAnchor="middle" fill={node.color} fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">
                  {node.timeTag}
                </text>

                <g transform="translate(0, 105)">
                  <rect x="-56" y="-24" width="112" height="52" fill="rgba(8, 14, 22, 0.9)" stroke="var(--border-subtle)" strokeWidth="1" rx="3" />
                  <text x="0" y="-8" textAnchor="middle" fill="var(--text-secondary)" fontSize="7" fontFamily="var(--font-mono)">
                    d_miss: {node.missDist}
                  </text>
                  <text x="0" y="6" textAnchor="middle" fill={node.color} fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">
                    {node.status}
                  </text>
                  <text x="0" y="20" textAnchor="middle" fill="var(--text-tertiary)" fontSize="6.5" fontFamily="var(--font-mono)">
                    [ SIMULATED ]
                  </text>
                </g>
              </g>
            ))}

            <text x="0" y="-150" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.12em">
              [ SIMULATED SEQUENCE ] — 5 CONSECUTIVE CDMs RECEIVED OVER 70 HOURS
            </text>
          </g>
        )}

        {/* PHASE 3: FEATURE PROCESSING */}
        {phase === 3 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <g transform="translate(-320, 0)">
              <rect x="-90" y="-120" width="180" height="240" fill="rgba(10, 16, 24, 0.9)" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.2" rx="4" />
              <text x="0" y="-95" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
                RAW CDM SEQUENCE
              </text>
              <text x="0" y="-80" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
                X ∈ ℝ^(5 × 103) [SIMULATED]
              </text>

              {[0, 1, 2, 3, 4].map((i) => (
                <g key={i} transform={`translate(0, ${-45 + i * 32})`}>
                  <rect x="-75" y="-10" width="150" height="20" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" rx="2" />
                  <text x="-65" y="4" fill="var(--text-secondary)" fontSize="7.5" fontFamily="var(--font-mono)">
                    CDM 0{i + 1} : [r, v, C_cov, ...]
                  </text>
                  <text x="65" y="4" textAnchor="end" fill="#38bdf8" fontSize="7" fontFamily="var(--font-mono)">
                    103 dims
                  </text>
                </g>
              ))}
            </g>

            <g transform="translate(0, 0)">
              <line x1="-230" y1="0" x2="-80" y2="0" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="-80,0 -90,-4 -90,4" fill="#38bdf8" />

              <rect x="-70" y="-80" width="140" height="160" fill="rgba(14, 22, 34, 0.95)" stroke="var(--accent-emerald)" strokeWidth="1.4" rx="4" />
              <text x="0" y="-55" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
                LINEAR PROJECTION
              </text>
              <text x="0" y="-38" textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)">
                W_p ∈ ℝ^(103 × d_model)
              </text>
              <text x="0" y="-18" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
                e_t = x_t W_p + b_p
              </text>

              <rect x="-55" y="5" width="110" height="30" fill="rgba(52, 211, 153, 0.1)" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="0.8" rx="2" />
              <text x="0" y="24" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="var(--font-mono)" fontWeight="500">
                d_model = 64 / 128
              </text>

              <text x="0" y="60" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7" fontFamily="var(--font-mono)">
                [ STANDARDIZED ]
              </text>

              <line x1="70" y1="0" x2="220" y2="0" stroke="#34d399" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="220,0 210,-4 210,4" fill="#34d399" />
            </g>

            <g transform="translate(320, 0)">
              <rect x="-90" y="-120" width="180" height="240" fill="rgba(10, 16, 24, 0.9)" stroke="rgba(52, 211, 153, 0.6)" strokeWidth="1.2" rx="4" />
              <text x="0" y="-95" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
                LATENT EMBEDDINGS
              </text>
              <text x="0" y="-80" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
                E ∈ ℝ^(5 × d_model)
              </text>

              {[0, 1, 2, 3, 4].map((i) => (
                <g key={i} transform={`translate(0, ${-45 + i * 32})`}>
                  <rect x="-75" y="-10" width="150" height="20" fill="rgba(52, 211, 153, 0.08)" stroke="rgba(52, 211, 153, 0.3)" strokeWidth="0.8" rx="2" />
                  <text x="-65" y="4" fill="#ffffff" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">
                    e_${i + 1} (T-${(72 - i * 17.5).toFixed(0)}h)
                  </text>
                  <text x="65" y="4" textAnchor="end" fill="#34d399" fontSize="7" fontFamily="var(--font-mono)">
                    d_model
                  </text>
                </g>
              ))}
            </g>
          </g>
        )}

        {/* PHASE 4: ENTER THE TRANSFORMER */}
        {phase === 4 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <rect x="-420" y="-170" width="840" height="340" fill="rgba(10, 16, 24, 0.95)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.4" rx="6" />
            <text x="-400" y="-145" fill="#38bdf8" fontSize="10" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.1em">
              TRANSFORMER ENCODER // INFERENCE PIPELINE
            </text>
            <text x="400" y="-145" textAnchor="end" fill="var(--text-tertiary)" fontSize="8" fontFamily="var(--font-mono)">
              [ SIMULATED INFERENCE FLOW ]
            </text>

            {cdmNodes.map((node, idx) => (
              <g key={node.id} transform={`translate(${node.x}, -50)`}>
                <rect x="-36" y="-20" width="72" height="28" fill="rgba(18, 28, 42, 0.9)" stroke="#38bdf8" strokeWidth="1" rx="3" />
                <text x="0" y="-2" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">
                  e_${idx + 1}
                </text>
                <text x="0" y="10" textAnchor="middle" fill="var(--text-tertiary)" fontSize="6.5" fontFamily="var(--font-mono)">
                  {node.timeTag}
                </text>

                <line x1="0" y1="8" x2="0" y2="38" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
                <circle cx="0" cy="38" r="9" fill="rgba(8, 14, 22, 0.9)" stroke="var(--accent-amber)" strokeWidth="1" />
                <text x="0" y="42" textAnchor="middle" fill="var(--accent-amber)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
                  +
                </text>

                <g transform="translate(0, 72)">
                  <rect x="-38" y="-12" width="76" height="24" fill="rgba(251, 191, 36, 0.1)" stroke="var(--accent-amber)" strokeWidth="0.9" rx="2" />
                  <text x="0" y="4" textAnchor="middle" fill="var(--accent-amber)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="500">
                    P_${idx + 1} (Δt_tca)
                  </text>
                </g>

                <line x1="0" y1="84" x2="0" y2="120" stroke="#34d399" strokeWidth="1.4" strokeDasharray="3 2" />
                <polygon points="0,120 -3,114 3,114" fill="#34d399" />

                <g transform="translate(0, 136)">
                  <rect x="-36" y="-14" width="72" height="28" fill="rgba(12, 22, 18, 0.9)" stroke="var(--accent-emerald)" strokeWidth="1.2" rx="3" />
                  <text x="0" y="4" textAnchor="middle" fill="#34d399" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="600">
                    z_${idx + 1}^(0)
                  </text>
                </g>
              </g>
            ))}
          </g>
        )}

        {/* PHASE 5: ATTENTION ACTIVATION */}
        {phase === 5 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {cdmNodes.map((src, i) =>
              cdmNodes.map((tgt, j) => {
                if (i >= j) return null;
                const isHighlighted = hoveredCdm === null || hoveredCdm === i || hoveredCdm === j;
                const arcHeight = Math.abs(i - j) * 42;
                const isLateCritical = i >= 2 && j >= 3;

                return (
                  <path
                    key={`arc-${src.id}-${tgt.id}`}
                    d={`M ${src.x} -20 Q ${(src.x + tgt.x) / 2} ${-20 - arcHeight} ${tgt.x} -20`}
                    fill="none"
                    stroke={
                      isHighlighted
                        ? isLateCritical
                          ? 'rgba(248, 113, 113, 0.75)'
                          : 'rgba(52, 211, 153, 0.6)'
                        : 'rgba(255, 255, 255, 0.08)'
                    }
                    strokeWidth={isHighlighted ? (isLateCritical ? 2.2 : 1.4) : 0.6}
                    strokeDasharray={isHighlighted ? 'none' : '3 4'}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                );
              })
            )}

            {cdmNodes.map((node, idx) => {
              const isHovered = hoveredCdm === idx;
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, 0)`}
                  onMouseEnter={() => setHoveredCdm(idx)}
                  onMouseLeave={() => setHoveredCdm(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx="0"
                    cy="-20"
                    r={isHovered ? 20 : 15}
                    fill="rgba(8, 14, 22, 0.95)"
                    stroke={isHovered ? '#ffffff' : idx >= 3 ? '#f87171' : '#34d399'}
                    strokeWidth={isHovered ? 2.2 : 1.4}
                    style={{ transition: 'all 0.25s ease' }}
                  />
                  <text x="0" y="-15" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
                    z_${idx + 1}
                  </text>

                  <g transform="translate(0, 30)">
                    <rect x="-45" y="-12" width="90" height="24" fill="rgba(10, 16, 24, 0.85)" stroke="var(--border-subtle)" strokeWidth="0.8" rx="2" />
                    <text x="0" y="4" textAnchor="middle" fill={idx >= 3 ? '#f87171' : 'var(--text-secondary)'} fontSize="7.5" fontFamily="var(--font-mono)">
                      {idx >= 3 ? 'HIGH RELATION' : 'ACTIVE CONTEXT'}
                    </text>
                  </g>
                </g>
              );
            })}

            <text x="0" y="-170" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.1em">
              [ CONCEPTUAL ATTENTION VISUALIZATION ]
            </text>
            <text x="0" y="-150" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8" fontFamily="var(--font-mono)">
              QUALITATIVE CROSS-OBSERVATION INTERACTION // HOVER NODES TO ISOLATE RELATIONS
            </text>
          </g>
        )}

        {/* PHASE 6: TEMPORAL REPRESENTATION */}
        {phase === 6 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {cdmNodes.map((node, idx) => (
              <g key={node.id} transform={`translate(${node.x}, -120)`}>
                <rect x="-34" y="-16" width="68" height="32" fill="rgba(10, 16, 24, 0.9)" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1" rx="3" />
                <text x="0" y="4" textAnchor="middle" fill="#38bdf8" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="600">
                  z_${idx + 1}^(L)
                </text>

                <path
                  d={`M 0 16 C 0 60, ${-node.x * 0.4} 80, 0 130`}
                  fill="none"
                  stroke="rgba(52, 211, 153, 0.5)"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
              </g>
            ))}

            <g transform="translate(0, 30)">
              <polygon points="-80,-20 80,-20 30,30 -30,30" fill="rgba(16, 26, 38, 0.95)" stroke="var(--accent-emerald)" strokeWidth="1.2" />
              <text x="0" y="2" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">
                TEMPORAL AGGREGATION
              </text>
            </g>

            <g transform="translate(0, 130)">
              <rect x="-120" y="-24" width="240" height="48" fill="rgba(8, 14, 22, 0.95)" stroke="var(--accent-emerald)" strokeWidth="1.6" rx="4" />
              <circle cx="-95" cy="0" r="5" fill="#34d399" />
              <text x="0" y="-3" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="var(--font-mono)" fontWeight="600">
                h_event ∈ ℝ^(d_model)
              </text>
              <text x="0" y="14" textAnchor="middle" fill="var(--accent-emerald)" fontSize="8" fontFamily="var(--font-mono)">
                UNIFIED CONJUNCTION STATE VECTOR
              </text>
            </g>

            <text x="0" y="-160" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8.5" fontFamily="var(--font-mono)">
              [ LATENT EVENT VECTOR ] — 5 TEMPORAL OBSERVATIONS COMPACTED INTO SINGLE REPRESENTATION
            </text>
          </g>
        )}

        {/* PHASE 7: SIMULATED RISK OUTPUT */}
        {phase === 7 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Outer Workstation Panel */}
            <rect
              x="-560"
              y="-270"
              width="1120"
              height="540"
              fill="rgba(10, 16, 24, 0.96)"
              stroke="rgba(248, 113, 113, 0.7)"
              strokeWidth="1.8"
              rx="8"
            />

            {/* Top Dossier Header */}
            <text
              x="-520"
              y="-225"
              fill="var(--accent-ruby)"
              fontSize="18"
              fontFamily="var(--font-mono)"
              fontWeight="700"
              letterSpacing="0.1em"
            >
              MODEL OUTPUT // [ SIMULATED DEMO ]
            </text>
            <text
              x="520"
              y="-225"
              textAnchor="end"
              fill="var(--text-tertiary)"
              fontSize="15"
              fontFamily="var(--font-mono)"
            >
              CONJUNCTION EVENT: SIM-EVT-9042
            </text>
            <line
              x1="-520"
              y1="-205"
              x2="520"
              y2="-205"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="1.2"
            />

            {/* Left Card: Collision Probability */}
            <g transform="translate(-270, -75)">
              <rect
                x="-240"
                y="-105"
                width="480"
                height="210"
                fill="rgba(248, 113, 113, 0.09)"
                stroke="rgba(248, 113, 113, 0.55)"
                strokeWidth="1.6"
                rx="6"
              />
              <text
                x="0"
                y="-60"
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="15"
                fontFamily="var(--font-mono)"
                fontWeight="600"
                letterSpacing="0.06em"
              >
                PREDICTED COLLISION PROBABILITY (P_c)
              </text>
              <text
                x="0"
                y="15"
                textAnchor="middle"
                fill="#f87171"
                fontSize="62"
                fontFamily="var(--font-mono)"
                fontWeight="800"
                letterSpacing="-0.02em"
              >
                0.00042
              </text>
              <text
                x="0"
                y="65"
                textAnchor="middle"
                fill="var(--accent-amber)"
                fontSize="14"
                fontFamily="var(--font-mono)"
                fontWeight="600"
                letterSpacing="0.08em"
              >
                [ SIMULATED DEMO VALUE ]
              </text>
            </g>

            {/* Right Card: Risk Severity Class */}
            <g transform="translate(270, -75)">
              <rect
                x="-240"
                y="-105"
                width="480"
                height="210"
                fill="rgba(251, 191, 36, 0.09)"
                stroke="rgba(251, 191, 36, 0.55)"
                strokeWidth="1.6"
                rx="6"
              />
              <text
                x="0"
                y="-60"
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="15"
                fontFamily="var(--font-mono)"
                fontWeight="600"
                letterSpacing="0.06em"
              >
                RISK SEVERITY CLASS
              </text>
              <text
                x="0"
                y="14"
                textAnchor="middle"
                fill="#fbbf24"
                fontSize="52"
                fontFamily="var(--font-mono)"
                fontWeight="800"
                letterSpacing="0.04em"
              >
                ELEVATED
              </text>
              <text
                x="0"
                y="65"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="14"
                fontFamily="var(--font-mono)"
                fontWeight="600"
                letterSpacing="0.08em"
              >
                [ ACTION THRESHOLD EXCEEDED ]
              </text>
            </g>

            {/* Bottom Risk Threshold Comparison Gauge */}
            <g transform="translate(0, 95)">
              <text
                x="-520"
                y="5"
                fill="#ffffff"
                fontSize="15"
                fontFamily="var(--font-mono)"
                fontWeight="600"
              >
                STANDARD OPERATIONAL THRESHOLD: 1.0 × 10^(-4) (0.00010)
              </text>
              <text
                x="520"
                y="5"
                textAnchor="end"
                fill="#f87171"
                fontSize="15"
                fontFamily="var(--font-mono)"
                fontWeight="700"
              >
                CURRENT RISK: 4.2× THRESHOLD
              </text>

              <rect
                x="-520"
                y="20"
                width="1040"
                height="24"
                fill="rgba(255, 255, 255, 0.06)"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1.2"
                rx="4"
              />
              <rect
                x="-520"
                y="20"
                width="750"
                height="24"
                fill="url(#m8GlowRuby)"
                rx="4"
              />

              {/* Threshold Marker */}
              <line
                x1="-180"
                y1="14"
                x2="-180"
                y2="50"
                stroke="#fbbf24"
                strokeWidth="2.5"
              />
              <text
                x="-180"
                y="70"
                textAnchor="middle"
                fill="#fbbf24"
                fontSize="13"
                fontFamily="var(--font-mono)"
                fontWeight="700"
              >
                THRESHOLD (10^-4)
              </text>

              {/* Current Pc Marker */}
              <line
                x1="230"
                y1="14"
                x2="230"
                y2="50"
                stroke="#f87171"
                strokeWidth="2.5"
              />
              <text
                x="230"
                y="70"
                textAnchor="middle"
                fill="#f87171"
                fontSize="13"
                fontFamily="var(--font-mono)"
                fontWeight="700"
              >
                PREDICTED P_c: 4.2 × 10^-4
              </text>
            </g>

            {/* Footer Prototype Notice */}
            <g transform="translate(0, 230)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="13"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
              >
                CONFIDENCE: NOT AVAILABLE — MODEL NOT TRAINED // PROTOTYPE DECISION SUPPORT INTERFACE
              </text>
            </g>
          </g>
        )}

        {/* PHASE 8: RISK EVOLUTION VIEW */}
        {phase === 8 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <rect x="-380" y="-160" width="760" height="320" fill="rgba(10, 16, 24, 0.95)" stroke="var(--border-subtle)" strokeWidth="1.2" rx="6" />

            <text x="-350" y="-130" fill="#38bdf8" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.1em">
              [ ILLUSTRATIVE RISK EVOLUTION ] // MULTI-OBSERVATION EVIDENCE UPDATE
            </text>
            <text x="350" y="-130" textAnchor="end" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
              NON-MONOTONIC TIME SERIES UPDATE
            </text>
            <line x1="-350" y1="-115" x2="350" y2="-115" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" />

            <line x1="-320" y1="-10" x2="320" y2="-10" stroke="rgba(251, 191, 36, 0.5)" strokeWidth="1.2" strokeDasharray="4 4" />
            <text x="320" y="-14" textAnchor="end" fill="#fbbf24" fontSize="7.5" fontFamily="var(--font-mono)">
              THRESHOLD (10^-4)
            </text>

            <path
              d="M -280 60 C -200 50, -160 35, -140 25 C -100 15, -40 -5, 0 -20 C 60 -35, 100 -50, 140 -65 C 200 -75, 240 -80, 280 -85"
              fill="none"
              stroke="url(#m8GlowRuby)"
              strokeWidth="2.5"
            />

            {cdmNodes.map((node) => {
              const yMap: Record<string, number> = {
                cdm1: 60,
                cdm2: 25,
                cdm3: -20,
                cdm4: -65,
                cdm5: -85,
              };
              const yPos = yMap[node.id] || 0;

              return (
                <g key={node.id} transform={`translate(${node.x}, ${yPos})`}>
                  <circle cx="0" cy="0" r="7" fill="rgba(8, 14, 22, 0.95)" stroke={node.color} strokeWidth="1.8" />
                  <circle cx="0" cy="0" r="3" fill="#ffffff" />
                  <line x1="0" y1="7" x2="0" y2={100 - yPos} stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.7" strokeDasharray="2 3" />

                  <text x="0" y="-12" textAnchor="middle" fill={node.color} fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="600">
                    P_c: {node.pc}
                  </text>
                  <text x="0" y={115 - yPos} textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)">
                    CDM {node.num}
                  </text>
                  <text x="0" y={127 - yPos} textAnchor="middle" fill="var(--text-tertiary)" fontSize="7" fontFamily="var(--font-mono)">
                    {node.timeTag}
                  </text>
                </g>
              );
            })}

            <text x="0" y="145" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
              "New observations update the estimated risk dynamically as orbital covariance uncertainty shrinks."
            </text>
          </g>
        )}

        {/* PHASE 9: DECISION VIEW */}
        {phase === 9 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <g transform="translate(-240, 0)">
              <rect x="-160" y="-140" width="320" height="280" fill="rgba(10, 16, 24, 0.95)" stroke="var(--border-subtle)" strokeWidth="1.2" rx="4" />
              <text x="-140" y="-115" fill="#38bdf8" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
                PRIMARY TELEMETRY DOSSIER
              </text>
              <line x1="-140" y1="-105" x2="140" y2="-105" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" />

              <text x="-140" y="-80" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">OBJECT A (PROTECTED):</text>
              <text x="140" y="-80" textAnchor="end" fill="#ffffff" fontSize="8" fontFamily="var(--font-mono)">SENTINEL-LIKE [SIM]</text>

              <text x="-140" y="-55" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">OBJECT B (INTERCEPTOR):</text>
              <text x="140" y="-55" textAnchor="end" fill="#f87171" fontSize="8" fontFamily="var(--font-mono)">DEBRIS FRAG-882 [SIM]</text>

              <text x="-140" y="-30" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">TCA COUNTDOWN:</text>
              <text x="140" y="-30" textAnchor="end" fill="#fbbf24" fontSize="8" fontFamily="var(--font-mono)">T-02h 14m 00s</text>

              <text x="-140" y="-5" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">MISS DISTANCE:</text>
              <text x="140" y="-5" textAnchor="end" fill="#ffffff" fontSize="8" fontFamily="var(--font-mono)">284 m (σ = ±32m)</text>

              <text x="-140" y="20" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">RELATIVE VELOCITY:</text>
              <text x="140" y="20" textAnchor="end" fill="#ffffff" fontSize="8" fontFamily="var(--font-mono)">14.24 km/s</text>

              <text x="-140" y="45" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">CDM HISTORY:</text>
              <text x="140" y="45" textAnchor="end" fill="#34d399" fontSize="8" fontFamily="var(--font-mono)">5 Messages / 70 hrs</text>

              <g transform="translate(0, 95)">
                <rect x="-140" y="-18" width="280" height="36" fill="rgba(56, 189, 248, 0.08)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.8" rx="3" />
                <text x="0" y="4" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="var(--font-mono)">
                  [ SIMULATED DOSSIER SUMMARY ]
                </text>
              </g>
            </g>

            <g transform="translate(240, 0)">
              <rect x="-160" y="-140" width="320" height="280" fill="rgba(10, 16, 24, 0.95)" stroke="rgba(248, 113, 113, 0.6)" strokeWidth="1.2" rx="4" />
              <text x="-140" y="-115" fill="#f87171" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
                DECISION SUPPORT ADVISORY
              </text>
              <line x1="-140" y1="-105" x2="140" y2="-105" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" />

              <g transform="translate(0, -65)">
                <rect x="-140" y="-22" width="280" height="44" fill="rgba(248, 113, 113, 0.12)" stroke="#f87171" strokeWidth="1" rx="3" />
                <text x="0" y="-4" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
                  RECOMMENDATION: OPERATOR REVIEW
                </text>
                <text x="0" y="12" textAnchor="middle" fill="#f87171" fontSize="7.5" fontFamily="var(--font-mono)">
                  RISK EXCEEDS 10^-4 THRESHOLD (0.00042)
                </text>
              </g>

              <text x="-140" y="-15" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">SUGGESTED ACTION:</text>
              <text x="-140" y="4" fill="#ffffff" fontSize="8" fontFamily="var(--font-mono)">Evaluate Radial-Transverse Maneuver</text>

              <text x="-140" y="28" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">MANEUVER DELTA-V (EST.):</text>
              <text x="-140" y="47" fill="#fbbf24" fontSize="8" fontFamily="var(--font-mono)">ΔV ≈ 0.12 m/s [SIMULATED]</text>

              <g transform="translate(0, 95)">
                <rect x="-140" y="-18" width="280" height="36" fill="rgba(251, 191, 36, 0.08)" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="0.8" rx="3" />
                <text x="0" y="-2" textAnchor="middle" fill="#fbbf24" fontSize="7" fontFamily="var(--font-mono)" fontWeight="600">
                  HUMAN-IN-THE-LOOP ARCHITECTURE
                </text>
                <text x="0" y="10" textAnchor="middle" fill="var(--text-tertiary)" fontSize="6.5" fontFamily="var(--font-mono)">
                  DECISION SUPPORT — NOT AUTONOMOUS FIRING
                </text>
              </g>
            </g>
          </g>
        )}

        {/* PHASE 10: COMPLETE INFERENCE JOURNEY BLUEPRINT */}
        {phase === 10 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <line x1="-420" y1="0" x2="420" y2="0" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="4 4" />

            {[
              { label: 'CONJUNCTION', sub: 'Orbital Encounter', x: -380, color: '#38bdf8' },
              { label: 'CDM SEQUENCE', sub: '5 Observations', x: -250, color: '#38bdf8' },
              { label: 'PROJECTION', sub: 'Latent Space', x: -125, color: '#34d399' },
              { label: 'TRANSFORMER', sub: 'Self-Attention', x: 0, color: '#34d399' },
              { label: 'EVENT VECTOR', sub: 'h_event', x: 125, color: '#fbbf24' },
              { label: 'RISK PREDICTION', sub: 'P_c = 0.00042', x: 250, color: '#f87171' },
              { label: 'DECISION SUPPORT', sub: 'Operator Review', x: 380, color: '#f87171' },
            ].map((step, idx) => (
              <g key={idx} transform={`translate(${step.x}, 0)`}>
                <circle cx="0" cy="0" r="15" fill="rgba(10, 16, 24, 0.95)" stroke={step.color} strokeWidth="1.5" />
                <circle cx="0" cy="0" r="4" fill={step.color} />

                {idx < 6 && (
                  <polygon points="50,0 44,-3 44,3" fill="rgba(255, 255, 255, 0.3)" />
                )}

                <text x="0" y="-24" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="600">
                  {step.label}
                </text>
                <text x="0" y="28" textAnchor="middle" fill="var(--text-secondary)" fontSize="6.5" fontFamily="var(--font-mono)">
                  {step.sub}
                </text>
              </g>
            ))}

            <g transform="translate(0, 100)">
              <rect x="-240" y="-22" width="480" height="44" fill="rgba(8, 14, 22, 0.9)" stroke="var(--border-subtle)" strokeWidth="1" rx="4" />
              <text x="0" y="-3" textAnchor="middle" fill="var(--accent-emerald)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
                SIMULATED INFERENCE JOURNEY COMPLETE
              </text>
              <text x="0" y="13" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
                [ DEMONSTRATION ONLY — PROPOSED OPERATIONAL INTELLIGENCE WORKFLOW ]
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
