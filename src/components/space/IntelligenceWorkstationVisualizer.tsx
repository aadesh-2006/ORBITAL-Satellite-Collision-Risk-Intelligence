import React from 'react';

interface IntelligenceWorkstationVisualizerProps {
  phase: number; // 1 to 9
  parallaxX?: number;
  parallaxY?: number;
}

export const IntelligenceWorkstationVisualizer: React.FC<IntelligenceWorkstationVisualizerProps> = ({
  phase,
  parallaxX = 0,
  parallaxY = 0,
}) => {
  const cx = 960;
  const cy = 490;

  const cdmSeries = [
    { num: '01', time: 'T-72h', dist: '1,420 m', pc: '0.00002', status: 'EARLY PASS', color: '#38bdf8', x: -260 },
    { num: '02', time: 'T-48h', dist: '890 m', pc: '0.00008', status: 'OPTICAL UPDATE', color: '#38bdf8', x: -130 },
    { num: '03', time: 'T-24h', dist: '510 m', pc: '0.00019', status: 'RADAR REFINED', color: '#fbbf24', x: 0 },
    { num: '04', time: 'T-12h', dist: '340 m', pc: '0.00035', status: 'CLOSE BOUNDARY', color: '#f87171', x: 130 },
    { num: '05', time: 'T-2h', dist: '284 m', pc: '0.00042', status: 'CRITICAL TCA', color: '#f87171', x: 260 },
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
          transform: `translate3d(${parallaxX * 0.08}px, ${parallaxY * 0.08}px, 0)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <defs>
          <linearGradient id="m9GradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="m9GradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="m9GradAmber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="m9GradRuby" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Tactical Radar Grid / Aerospace Geometry */}
        <g opacity="0.14">
          <circle cx={cx} cy={cy} r="500" fill="none" stroke="#ffffff" strokeWidth="0.6" strokeDasharray="3 6" />
          <circle cx={cx} cy={cy} r="340" fill="none" stroke="#ffffff" strokeWidth="0.5" />
          <circle cx={cx} cy={cy} r="180" fill="none" stroke="#ffffff" strokeWidth="0.4" />
          <line x1={cx - 560} y1={cy} x2={cx + 560} y2={cy} stroke="#ffffff" strokeWidth="0.6" strokeDasharray="4 8" />
          <line x1={cx} y1={cy - 360} x2={cx} y2={cy + 360} stroke="#ffffff" strokeWidth="0.6" strokeDasharray="4 8" />
        </g>

        {/* ========================================================================= */}
        {/* PHASE 1: SYSTEM CONVERGENCE */}
        {/* ========================================================================= */}
        {phase === 1 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* 4 Pillars Converging */}
            {[
              { title: 'CDM SEQUENCE', sub: 'Multi-Pass Data', x: -330, y: -90, color: '#38bdf8' },
              { title: 'TEMPORAL MODEL', sub: 'Self-Attention', x: -110, y: -90, color: '#34d399' },
              { title: 'RISK PREDICTION', sub: 'Calibrated P_c', x: 110, y: -90, color: '#fbbf24' },
              { title: 'OPERATIONAL HUD', sub: 'Decision Support', x: 330, y: -90, color: '#f87171' },
            ].map((p, idx) => (
              <g key={idx} transform={`translate(${p.x}, ${p.y})`}>
                <rect x="-95" y="-30" width="190" height="60" fill="rgba(10, 16, 24, 0.95)" stroke={p.color} strokeWidth="1.2" rx="4" />
                <circle cx="-75" cy="0" r="4" fill={p.color} />
                <text x="-60" y="-4" fill="#ffffff" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="600">
                  {p.title}
                </text>
                <text x="-60" y="12" fill="var(--text-secondary)" fontSize="7" fontFamily="var(--font-mono)">
                  {p.sub}
                </text>

                {/* Converging line into center */}
                <path
                  d={`M 0 30 C 0 80, ${-p.x * 0.4} 100, 0 140`}
                  fill="none"
                  stroke={p.color}
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
              </g>
            ))}

            {/* Central Convergence Core */}
            <g transform="translate(0, 150)">
              <rect x="-220" y="-28" width="440" height="56" fill="rgba(8, 14, 22, 0.98)" stroke="var(--accent-emerald)" strokeWidth="1.6" rx="4" />
              <circle cx="-190" cy="0" r="6" fill="#34d399" />
              <text x="-170" y="-3" fill="#ffffff" fontSize="10" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.08em">
                ORBITAL INTELLIGENCE WORKSTATION
              </text>
              <text x="-170" y="14" fill="var(--accent-emerald)" fontSize="7.5" fontFamily="var(--font-mono)">
                UNIFIED COLLISION-RISK ANALYSIS PLATFORM [PROTOTYPE]
              </text>
            </g>

            <text x="0" y="-170" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.12em">
              [ PROTOTYPE CONVERGENCE ] — SYNTHESIZING RAW DATA, NEURAL ATTENTION, AND DECISION LOGIC
            </text>
          </g>
        )}

        {/* ========================================================================= */}
        {/* PHASE 2: CONJUNCTION ANALYSIS (Workstation Encounter Radar) */}
        {/* ========================================================================= */}
        {phase === 2 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Center Astrodynamic Grid */}
            <g transform="translate(-160, 0)">
              <circle cx="0" cy="0" r="140" fill="rgba(10, 16, 24, 0.9)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="0" cy="0" r="80" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" />
              
              {/* Converging trajectories */}
              <path d="M -180 -100 C -90 -50, -40 0, 0 10 C 40 20, 120 70, 180 120" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="5 3" />
              <path d="M -180 120 C -90 60, -40 20, 0 10 C 40 0, 120 -60, 180 -110" fill="none" stroke="#f87171" strokeWidth="1.8" strokeDasharray="5 3" />

              {/* Object A Node */}
              <g transform="translate(-90, -50)">
                <circle cx="0" cy="0" r="10" fill="rgba(8, 14, 22, 0.95)" stroke="#38bdf8" strokeWidth="1.4" />
                <circle cx="0" cy="0" r="3" fill="#38bdf8" />
                <text x="0" y="-16" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">
                  OBJECT A
                </text>
              </g>

              {/* Object B Node */}
              <g transform="translate(-90, 60)">
                <circle cx="0" cy="0" r="10" fill="rgba(8, 14, 22, 0.95)" stroke="#f87171" strokeWidth="1.4" />
                <polygon points="0,-4 4,3 -4,3" fill="#f87171" />
                <text x="0" y="24" textAnchor="middle" fill="#f87171" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">
                  OBJECT B
                </text>
              </g>

              {/* Encounter Center */}
              <circle cx="0" cy="10" r="16" fill="rgba(248, 113, 113, 0.15)" stroke="#f87171" strokeWidth="1.2" />
              <circle cx="0" cy="10" r="3" fill="#ffffff" />
              <text x="0" y="38" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontFamily="var(--font-mono)">
                TCA ENCOUNTER POINT
              </text>
            </g>

            {/* Right Telemetry Workstation Panel */}
            <g transform="translate(240, 0)">
              <rect x="-150" y="-140" width="300" height="280" fill="rgba(10, 16, 24, 0.95)" stroke="var(--border-subtle)" strokeWidth="1.2" rx="4" />
              <text x="-130" y="-115" fill="#38bdf8" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
                EVENT TELEMETRY DOSSIER
              </text>
              <line x1="-130" y1="-105" x2="130" y2="-105" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" />

              <text x="-130" y="-80" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">PRIMARY (A):</text>
              <text x="130" y="-80" textAnchor="end" fill="#ffffff" fontSize="8" fontFamily="var(--font-mono)">SENTINEL-LIKE [SIM]</text>

              <text x="-130" y="-55" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">CHASER (B):</text>
              <text x="130" y="-55" textAnchor="end" fill="#f87171" fontSize="8" fontFamily="var(--font-mono)">DEBRIS FRAG-882 [SIM]</text>

              <text x="-130" y="-30" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">TCA COUNTDOWN:</text>
              <text x="130" y="-30" textAnchor="end" fill="#fbbf24" fontSize="8" fontFamily="var(--font-mono)">T-02h 14m 00s</text>

              <text x="-130" y="-5" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">MISS DISTANCE:</text>
              <text x="130" y="-5" textAnchor="end" fill="#ffffff" fontSize="8" fontFamily="var(--font-mono)">284 m [SIMULATED]</text>

              <text x="-130" y="20" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">RELATIVE VELOCITY:</text>
              <text x="130" y="20" textAnchor="end" fill="#ffffff" fontSize="8" fontFamily="var(--font-mono)">14.24 km/s</text>

              <text x="-130" y="45" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">ORBITAL REGIME:</text>
              <text x="130" y="45" textAnchor="end" fill="#34d399" fontSize="8" fontFamily="var(--font-mono)">642.8 km (LEO)</text>

              <g transform="translate(0, 95)">
                <rect x="-130" y="-18" width="260" height="36" fill="rgba(56, 189, 248, 0.08)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.8" rx="2" />
                <text x="0" y="4" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="var(--font-mono)">
                  [ PROTOTYPE — SIMULATED DATA ]
                </text>
              </g>
            </g>
          </g>
        )}

        {/* ========================================================================= */}
        {/* PHASE 3: TEMPORAL RISK EVOLUTION */}
        {/* ========================================================================= */}
        {phase === 3 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <rect x="-380" y="-160" width="760" height="320" fill="rgba(10, 16, 24, 0.95)" stroke="var(--border-subtle)" strokeWidth="1.2" rx="6" />

            <text x="-350" y="-130" fill="#38bdf8" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.1em">
              ILLUSTRATIVE RISK EVOLUTION // [ SIMULATED DATA ]
            </text>
            <text x="350" y="-130" textAnchor="end" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
              TEMPORAL EVIDENCE UPDATE (T-72h → T-2h)
            </text>
            <line x1="-350" y1="-115" x2="350" y2="-115" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" />

            {/* Threshold line */}
            <line x1="-320" y1="-10" x2="320" y2="-10" stroke="rgba(251, 191, 36, 0.45)" strokeWidth="1.2" strokeDasharray="4 4" />
            <text x="320" y="-14" textAnchor="end" fill="#fbbf24" fontSize="7.5" fontFamily="var(--font-mono)">
              OPERATIONAL THRESHOLD (10^-4)
            </text>

            {/* Risk Trend Curve */}
            <path
              d="M -260 55 C -180 45, -150 30, -130 20 C -90 10, -30 -10, 0 -25 C 50 -40, 90 -55, 130 -68 C 180 -78, 220 -82, 260 -86"
              fill="none"
              stroke="url(#m9GradRuby)"
              strokeWidth="2.5"
            />

            {/* 5 CDM Time Points */}
            {cdmSeries.map((node) => {
              const yMap: Record<string, number> = {
                '01': 55,
                '02': 20,
                '03': -25,
                '04': -68,
                '05': -86,
              };
              const yPos = yMap[node.num] || 0;

              return (
                <g key={node.num} transform={`translate(${node.x}, ${yPos})`}>
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
                    {node.time}
                  </text>
                </g>
              );
            })}

            <text x="0" y="145" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
              "Risk assessment evolves dynamically across successive tracking messages as orbital covariance contracts."
            </text>
          </g>
        )}

        {/* ========================================================================= */}
        {/* PHASE 4: MODEL STATUS (Proposed Architecture) */}
        {/* ========================================================================= */}
        {phase === 4 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Architecture Pipeline Map */}
            <g transform="translate(-80, 0)">
              {[
                { title: '103 FEATURES / CDM', sub: 'Input Matrix X', x: -280, color: '#38bdf8' },
                { title: 'PROJECTION + POS', sub: 'e_t + P_t(Δt_tca)', x: -140, color: '#38bdf8' },
                { title: 'SELF-ATTENTION', sub: 'Transformer Encoder', x: 0, color: '#34d399' },
                { title: 'EVENT VECTOR', sub: 'h_event ∈ ℝ^d', x: 140, color: '#fbbf24' },
                { title: 'PREDICTION HEAD', sub: 'Risk Regression & Class', x: 280, color: '#f87171' },
              ].map((step, idx) => (
                <g key={idx} transform={`translate(${step.x}, 0)`}>
                  <rect x="-56" y="-35" width="112" height="70" fill="rgba(10, 16, 24, 0.95)" stroke={step.color} strokeWidth="1.2" rx="3" />
                  <text x="0" y="-12" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="600">
                    {step.title}
                  </text>
                  <text x="0" y="6" textAnchor="middle" fill={step.color} fontSize="6.8" fontFamily="var(--font-mono)">
                    {step.sub}
                  </text>
                  <text x="0" y="22" textAnchor="middle" fill="var(--text-tertiary)" fontSize="6" fontFamily="var(--font-mono)">
                    STAGE {idx + 1}
                  </text>

                  {idx < 4 && (
                    <polygon points="66,0 60,-3 60,3" fill="rgba(255, 255, 255, 0.3)" />
                  )}
                </g>
              ))}
            </g>

            {/* Bottom Status Badges */}
            <g transform="translate(0, 120)">
              <rect x="-260" y="-24" width="520" height="48" fill="rgba(10, 16, 24, 0.95)" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1.2" rx="4" />
              <circle cx="-230" cy="0" r="5" fill="#fbbf24" />
              <text x="-210" y="-4" fill="#ffffff" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="600">
                MODEL STATUS: PROPOSED ARCHITECTURE // TRAINING STATUS: NOT YET TRAINED
              </text>
              <text x="-210" y="12" fill="var(--accent-amber)" fontSize="7.2" fontFamily="var(--font-mono)">
                [ CONCEPTUAL ATTENTION VISUALIZATION — ZERO FABRICATED METRICS ]
              </text>
            </g>
          </g>
        )}

        {/* ========================================================================= */}
        {/* PHASE 5: PREDICTION OUTPUT (Illustrative Only) */}
        {/* ========================================================================= */}
        {phase === 5 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <rect x="-260" y="-150" width="520" height="300" fill="rgba(10, 16, 24, 0.95)" stroke="rgba(248, 113, 113, 0.6)" strokeWidth="1.4" rx="6" />

            <text x="-230" y="-120" fill="var(--accent-ruby)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.1em">
              WORKSTATION PREDICTION OUTPUT // [ SIMULATED DATA ]
            </text>
            <text x="230" y="-120" textAnchor="end" fill="var(--text-tertiary)" fontSize="8" fontFamily="var(--font-mono)">
              PROTOTYPE HUD
            </text>
            <line x1="-230" y1="-105" x2="230" y2="-105" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.8" />

            <g transform="translate(-110, -35)">
              <rect x="-100" y="-45" width="200" height="90" fill="rgba(248, 113, 113, 0.08)" stroke="rgba(248, 113, 113, 0.4)" strokeWidth="1" rx="4" />
              <text x="0" y="-22" textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)">
                ESTIMATED COLLISION PROBABILITY (P_c)
              </text>
              <text x="0" y="10" textAnchor="middle" fill="#f87171" fontSize="22" fontFamily="var(--font-mono)" fontWeight="700">
                0.00042
              </text>
              <text x="0" y="30" textAnchor="middle" fill="var(--accent-amber)" fontSize="7.5" fontFamily="var(--font-mono)">
                [ SIMULATED OUTPUT ]
              </text>
            </g>

            <g transform="translate(110, -35)">
              <rect x="-100" y="-45" width="200" height="90" fill="rgba(251, 191, 36, 0.08)" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1" rx="4" />
              <text x="0" y="-22" textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)">
                RISK SEVERITY CLASS
              </text>
              <text x="0" y="10" textAnchor="middle" fill="#fbbf24" fontSize="18" fontFamily="var(--font-mono)" fontWeight="600">
                ELEVATED
              </text>
              <text x="0" y="30" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
                [ ILLUSTRATIVE OUTPUT ]
              </text>
            </g>

            <g transform="translate(0, 70)">
              <text x="-230" y="-12" fill="var(--text-secondary)" fontSize="7.5" fontFamily="var(--font-mono)">
                SAFETY BOUNDARY (ILLUSTRATIVE): 1.0 × 10^(-4)
              </text>
              <rect x="-230" y="0" width="460" height="12" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" rx="2" />
              <rect x="-230" y="0" width="310" height="12" fill="url(#m9GradRuby)" rx="2" />
            </g>

            <g transform="translate(0, 125)">
              <text x="0" y="0" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7" fontFamily="var(--font-mono)">
                [ MODEL NOT YET TRAINED — NUMERICAL VALUES ARE FOR PROTOTYPE INTERFACE DEMONSTRATION ONLY ]
              </text>
            </g>
          </g>
        )}

        {/* ========================================================================= */}
        {/* PHASE 6: INTELLIGENCE SUMMARY (Unified Workstation Console) */}
        {/* ========================================================================= */}
        {phase === 6 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <rect x="-420" y="-160" width="840" height="320" fill="rgba(10, 16, 24, 0.95)" stroke="var(--border-subtle)" strokeWidth="1.2" rx="6" />

            <text x="-390" y="-130" fill="#34d399" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.1em">
              MISSION ANALYSIS WORKSTATION // [ INTEGRATED INTELLIGENCE SUMMARY ]
            </text>
            <text x="390" y="-130" textAnchor="end" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
              PROTOTYPE DOSSIER
            </text>
            <line x1="-390" y1="-115" x2="390" y2="-115" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" />

            {/* 6 Integrated Telemetry Tiles */}
            {[
              { label: 'CONJUNCTION STATUS', value: 'DETECTED', color: '#38bdf8', col: 0, row: 0 },
              { label: 'OBJECT PAIR', value: 'SENTINEL-LIKE / FRAG-882', color: '#ffffff', col: 1, row: 0 },
              { label: 'TCA COUNTDOWN', value: 'T-02h 14m 00s', color: '#fbbf24', col: 2, row: 0 },
              { label: 'MISS DISTANCE', value: '284 m [SIMULATED]', color: '#ffffff', col: 0, row: 1 },
              { label: 'RELATIVE VELOCITY', value: '14.24 km/s', color: '#ffffff', col: 1, row: 1 },
              { label: 'PROPOSED MODEL', value: 'TRANSFORMER ENCODER', color: '#34d399', col: 2, row: 1 },
            ].map((tile, idx) => {
              const xPos = -260 + tile.col * 260;
              const yPos = -50 + tile.row * 90;

              return (
                <g key={idx} transform={`translate(${xPos}, ${yPos})`}>
                  <rect x="-115" y="-30" width="230" height="60" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" rx="3" />
                  <text x="-95" y="-10" fill="var(--text-tertiary)" fontSize="7" fontFamily="var(--font-mono)">
                    {tile.label}
                  </text>
                  <text x="-95" y="12" fill={tile.color} fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="600">
                    {tile.value}
                  </text>
                </g>
              );
            })}

            <g transform="translate(0, 130)">
              <text x="0" y="0" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
                [ PROTOTYPE MISSION INTELLIGENCE CONSOLE — INTEGRATED VIEW OF MULTI-CDM RISK STATE ]
              </text>
            </g>
          </g>
        )}

        {/* ========================================================================= */}
        {/* PHASE 7: RESEARCH / OPERATIONAL BOUNDARY */}
        {/* ========================================================================= */}
        {phase === 7 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Left: What our research system DOES */}
            <g transform="translate(-220, 0)">
              <rect x="-180" y="-140" width="360" height="280" fill="rgba(10, 16, 24, 0.95)" stroke="rgba(52, 211, 153, 0.6)" strokeWidth="1.2" rx="4" />
              <text x="-155" y="-115" fill="#34d399" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
                DECISION SUPPORT PROTOTYPE [IN SCOPE]
              </text>
              <line x1="-155" y1="-105" x2="155" y2="-105" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" />

              {[
                'Automated multi-CDM sequence ingestion',
                'Temporal self-attention over evolving tracks',
                'Calibrated collision-risk probability scoring',
                'Operator advisory and uncertainty context',
                'High-throughput fleet screening assistance',
              ].map((item, idx) => (
                <g key={idx} transform={`translate(-155, ${-75 + idx * 36})`}>
                  <circle cx="4" cy="0" r="3" fill="#34d399" />
                  <text x="16" y="3" fill="#ffffff" fontSize="7.5" fontFamily="var(--font-mono)">
                    {item}
                  </text>
                </g>
              ))}
            </g>

            {/* Right: What our research system DOES NOT do */}
            <g transform="translate(220, 0)">
              <rect x="-180" y="-140" width="360" height="280" fill="rgba(10, 16, 24, 0.95)" stroke="rgba(248, 113, 113, 0.5)" strokeWidth="1.2" rx="4" />
              <text x="-155" y="-115" fill="#f87171" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
                NOT AN AUTONOMOUS SYSTEM [OUT OF SCOPE]
              </text>
              <line x1="-155" y1="-105" x2="155" y2="-105" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" />

              {[
                'NO autonomous maneuver burn execution',
                'NO real-time satellite thruster commanding',
                'NO mandatory delta-V trajectory overrides',
                'NO claim of replacing human flight dynamics teams',
                'Preserves human-in-the-loop flight safety authority',
              ].map((item, idx) => (
                <g key={idx} transform={`translate(-155, ${-75 + idx * 36})`}>
                  <circle cx="4" cy="0" r="3" fill="#f87171" />
                  <text x="16" y="3" fill="var(--text-secondary)" fontSize="7.5" fontFamily="var(--font-mono)">
                    {item}
                  </text>
                </g>
              ))}
            </g>
          </g>
        )}

        {/* ========================================================================= */}
        {/* PHASE 8: COMPLETE RESEARCH & EVALUATION PIPELINE */}
        {/* ========================================================================= */}
        {phase === 8 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <rect x="-440" y="-160" width="880" height="320" fill="rgba(10, 16, 24, 0.95)" stroke="var(--border-subtle)" strokeWidth="1.2" rx="6" />

            <text x="-410" y="-130" fill="#38bdf8" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.1em">
              COMPLETE RESEARCH PIPELINE // [ BASELINE VS PROPOSED BENCHMARK PROTOCOL ]
            </text>
            <text x="410" y="-130" textAnchor="end" fill="var(--text-tertiary)" fontSize="7.5" fontFamily="var(--font-mono)">
              ESA DATASET BENCHMARKING
            </text>
            <line x1="-410" y1="-115" x2="410" y2="-115" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" />

            {/* Horizontal flow */}
            {[
              { label: 'RAW CDM DATA', sub: 'ESA Dataset', x: -340, color: '#38bdf8' },
              { label: 'SEQUENCE MATRIX', sub: 'X ∈ ℝ^(T × F)', x: -200, color: '#38bdf8' },
              { label: 'DUAL MODELS', sub: 'LSTM vs Transformer', x: -40, color: '#fbbf24' },
              { label: 'EVALUATION', sub: 'Metrics Comparison', x: 120, color: '#34d399' },
              { label: 'RISK PREDICTION', sub: 'Calibrated P_c', x: 260, color: '#f87171' },
              { label: 'WORKSTATION', sub: 'Decision Support', x: 380, color: '#f87171' },
            ].map((step, idx) => (
              <g key={idx} transform={`translate(${step.x}, -20)`}>
                <rect x="-52" y="-30" width="104" height="60" fill="rgba(255, 255, 255, 0.03)" stroke={step.color} strokeWidth="1" rx="3" />
                <text x="0" y="-8" textAnchor="middle" fill="#ffffff" fontSize="7.2" fontFamily="var(--font-mono)" fontWeight="600">
                  {step.label}
                </text>
                <text x="0" y="10" textAnchor="middle" fill={step.color} fontSize="6.5" fontFamily="var(--font-mono)">
                  {step.sub}
                </text>

                {idx < 5 && (
                  <polygon points="62,0 56,-3 56,3" fill="rgba(255, 255, 255, 0.3)" />
                )}
              </g>
            ))}

            <g transform="translate(0, 95)">
              <rect x="-300" y="-18" width="600" height="36" fill="rgba(251, 191, 36, 0.08)" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="0.8" rx="3" />
              <text x="0" y="4" textAnchor="middle" fill="#fbbf24" fontSize="7.5" fontFamily="var(--font-mono)">
                "Baseline (LSTM/GRU) and Proposed Transformer will be evaluated side-by-side; relative performance to be proven experimentally."
              </text>
            </g>
          </g>
        )}

        {/* ========================================================================= */}
        {/* PHASE 9: TRANSITION TO CLOSING */}
        {/* ========================================================================= */}
        {phase === 9 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <circle cx="0" cy="0" r="180" fill="none" stroke="rgba(52, 211, 153, 0.3)" strokeWidth="1" strokeDasharray="3 6" />
            <circle cx="0" cy="0" r="100" fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="6" fill="#34d399" />

            <text x="0" y="-80" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="var(--font-display)" fontWeight="500" letterSpacing="-0.02em">
              From Conjunction Data to Intelligent Risk Prediction
            </text>
            <text x="0" y="-50" textAnchor="middle" fill="var(--accent-emerald)" fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.1em">
              HISTORICAL OBSERVATIONS → TEMPORAL LEARNING → COLLISION-RISK INTELLIGENCE
            </text>

            <g transform="translate(0, 80)">
              <rect x="-200" y="-20" width="400" height="40" fill="rgba(10, 16, 24, 0.95)" stroke="var(--border-subtle)" strokeWidth="1" rx="3" />
              <text x="0" y="4" textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-mono)">
                STAGE 08 COMPLETE // READY TO EXPLORE THE MISSION HORIZON (M10)
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
