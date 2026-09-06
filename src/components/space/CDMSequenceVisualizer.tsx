import React, { useEffect, useState } from 'react';

interface CDMSequenceVisualizerProps {
  phase: number; // 1 to 5
  parallaxX?: number;
  parallaxY?: number;
}

export const CDMSequenceVisualizer: React.FC<CDMSequenceVisualizerProps> = ({
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
  const cy = 480;

  // Pulse animation offset
  const pulse = Math.sin(time * 3) * 0.5 + 0.5;

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
          <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.6)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.8)" />
            <stop offset="100%" stopColor="rgba(52, 211, 153, 0.6)" />
          </linearGradient>

          <filter id="glowEffect" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Phase 1 & 2: Physical Conjunction Encounter Reticle (Physical Space) */}
        {phase <= 3 && (
          <g
            style={{
              opacity: phase === 1 ? 0.9 : phase === 2 ? 0.75 : 0.35,
              transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Trajectory lines */}
            <line
              x1={cx - 240}
              y1={cy - 120}
              x2={cx + 240}
              y2={cy + 120}
              stroke="rgba(56, 189, 248, 0.25)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <line
              x1={cx + 240}
              y1={cy - 120}
              x2={cx - 240}
              y2={cy + 120}
              stroke="rgba(52, 211, 153, 0.25)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />

            {/* Object A at encounter proximity */}
            <circle cx={cx - 24} cy={cy - 16} r="3" fill="#38bdf8" />
            <circle
              cx={cx - 24}
              cy={cy - 16}
              r={7 + pulse * 2}
              fill="none"
              stroke="rgba(56, 189, 248, 0.4)"
              strokeWidth="0.75"
            />
            <text
              x={cx - 36}
              y={cy - 24}
              fill="#38bdf8"
              fontSize="8"
              fontFamily="var(--font-mono)"
              letterSpacing="0.08em"
              textAnchor="end"
            >
              OBJECT A
            </text>

            {/* Object B at encounter proximity */}
            <circle cx={cx + 24} cy={cy + 16} r="3" fill="#34d399" />
            <circle
              cx={cx + 24}
              cy={cy + 16}
              r={7 + pulse * 2}
              fill="none"
              stroke="rgba(52, 211, 153, 0.4)"
              strokeWidth="0.75"
            />
            <text
              x={cx + 36}
              y={cy + 28}
              fill="#34d399"
              fontSize="8"
              fontFamily="var(--font-mono)"
              letterSpacing="0.08em"
            >
              OBJECT B
            </text>

            {/* Encounter Region Target */}
            <circle
              cx={cx}
              cy={cy}
              r={36}
              fill="none"
              stroke="rgba(248, 113, 113, 0.35)"
              strokeWidth="0.75"
              strokeDasharray="2 4"
            />
          </g>
        )}

        {/* Phase 2: CDM Node Emergence & Data Converging Flow */}
        {phase === 2 && (
          <g>
            {/* Stream from Object A to CDM center */}
            <line
              x1={cx - 24}
              y1={cy - 16}
              x2={cx}
              y2={cy + 90}
              stroke="rgba(56, 189, 248, 0.5)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            {/* Stream from Object B to CDM center */}
            <line
              x1={cx + 24}
              y1={cy + 16}
              x2={cx}
              y2={cy + 90}
              stroke="rgba(52, 211, 153, 0.5)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />

            {/* Central CDM Node */}
            <g transform={`translate(${cx}, ${cy + 90})`}>
              <rect
                x="-80"
                y="-18"
                width="160"
                height="36"
                fill="rgba(8, 12, 16, 0.9)"
                stroke="rgba(255, 255, 255, 0.35)"
                strokeWidth="1"
                rx="2"
              />
              <text
                x="0"
                y="-2"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10"
                fontFamily="var(--font-mono)"
                letterSpacing="0.14em"
                fontWeight="600"
              >
                CDM
              </text>
              <text
                x="0"
                y="10"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="6.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
              >
                CONJUNCTION DATA MESSAGE
              </text>
            </g>
          </g>
        )}

        {/* Phase 3: Analytical Parameter Streams */}
        {phase === 3 && (
          <g>
            {/* Central Stream Distribution Backbone */}
            <line
              x1={cx}
              y1={cy - 20}
              x2={cx}
              y2={cy + 140}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
            />

            {/* 5 Representative Parameter Cards / Flow Lines */}
            {[
              { label: 'Time to TCA', yOffset: -10, val: 'T-24.8h' },
              { label: 'Miss Distance', yOffset: 25, val: '742 m' },
              { label: 'Relative Motion', yOffset: 60, val: '14.2 km/s' },
              { label: 'Position / Velocity', yOffset: 95, val: '6D Ephemeris' },
              { label: 'Uncertainty / Covariance', yOffset: 130, val: '3×3 Matrix' },
            ].map((param, idx) => {
              const isLeft = idx % 2 === 0;
              const lineX = isLeft ? cx - 180 : cx + 180;
              const currentY = cy + param.yOffset;

              return (
                <g key={param.label}>
                  {/* Branch line */}
                  <line
                    x1={cx}
                    y1={currentY}
                    x2={lineX}
                    y2={currentY}
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="0.8"
                    strokeDasharray="2 3"
                  />
                  {/* Branch node dot */}
                  <circle cx={cx} cy={currentY} r="2.5" fill="var(--accent-cyan)" />

                  {/* Parameter Tag */}
                  <g transform={`translate(${lineX}, ${currentY})`}>
                    <rect
                      x={isLeft ? -150 : 0}
                      y="-12"
                      width="150"
                      height="24"
                      fill="rgba(6, 9, 12, 0.85)"
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="0.8"
                      rx="2"
                    />
                    <text
                      x={isLeft ? -75 : 75}
                      y="-1"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="7.5"
                      fontFamily="var(--font-mono)"
                      letterSpacing="0.08em"
                      fontWeight="500"
                    >
                      {param.label}
                    </text>
                    <text
                      x={isLeft ? -75 : 75}
                      y="8"
                      textAnchor="middle"
                      fill="var(--text-tertiary)"
                      fontSize="6"
                      fontFamily="var(--font-mono)"
                      letterSpacing="0.06em"
                    >
                      {param.val}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        )}

        {/* Phase 4: Risk Assessment Pipeline Transformation */}
        {phase === 4 && (
          <g transform={`translate(${cx}, ${cy + 40})`}>
            {/* Flow Stage 1: TRACKING DATA */}
            <g transform="translate(-240, 0)">
              <rect
                x="-70"
                y="-20"
                width="140"
                height="40"
                fill="rgba(8, 12, 16, 0.9)"
                stroke="var(--border-subtle)"
                strokeWidth="1"
                rx="2"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="8.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.12em"
              >
                TRACKING DATA
              </text>
            </g>

            {/* Arrow 1 */}
            <line x1="-160" y1="0" x2="-90" y2="0" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
            <polygon points="-90,0 -96,-3 -96,3" fill="rgba(255, 255, 255, 0.5)" />

            {/* Flow Stage 2: CONJUNCTION INFORMATION */}
            <g transform="translate(0, 0)">
              <rect
                x="-85"
                y="-20"
                width="170"
                height="40"
                fill="rgba(8, 12, 16, 0.9)"
                stroke="var(--border-subtle)"
                strokeWidth="1"
                rx="2"
              />
              <text
                x="0"
                y="-2"
                textAnchor="middle"
                fill="var(--text-primary)"
                fontSize="8"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
              >
                CONJUNCTION
              </text>
              <text
                x="0"
                y="10"
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
              >
                INFORMATION (CDM)
              </text>
            </g>

            {/* Arrow 2 */}
            <line x1="90" y1="0" x2="160" y2="0" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
            <polygon points="160,0 154,-3 154,3" fill="rgba(255, 255, 255, 0.5)" />

            {/* Flow Stage 3: RISK ASSESSMENT */}
            <g transform="translate(240, 0)">
              <rect
                x="-75"
                y="-20"
                width="150"
                height="40"
                fill="rgba(10, 14, 20, 0.9)"
                stroke="rgba(248, 113, 113, 0.45)"
                strokeWidth="1"
                rx="2"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="#f87171"
                fontSize="8.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.12em"
                fontWeight="600"
              >
                RISK ASSESSMENT
              </text>
            </g>
          </g>
        )}

        {/* Phase 5: Sequential Observation Series (CDM 01 → CDM 05) */}
        {phase === 5 && (
          <g transform={`translate(${cx}, ${cy + 30})`}>
            {/* Timeline Axis Line */}
            <line
              x1="-360"
              y1="0"
              x2="360"
              y2="0"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
            />

            {/* 5 CDM Time Steps */}
            {[
              { id: 'CDM 01', timeLabel: 'T-72h', x: -280, covSize: 22 },
              { id: 'CDM 02', timeLabel: 'T-48h', x: -140, covSize: 18 },
              { id: 'CDM 03', timeLabel: 'T-24h', x: 0, covSize: 14 },
              { id: 'CDM 04', timeLabel: 'T-12h', x: 140, covSize: 10 },
              { id: 'CDM 05', timeLabel: 'T-2h', x: 280, covSize: 6 },
            ].map((cdm, idx) => {
              const isLatest = idx === 4;

              return (
                <g key={cdm.id} transform={`translate(${cdm.x}, 0)`}>
                  {/* Vertical timeline tick */}
                  <line x1="0" y1="-30" x2="0" y2="30" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />

                  {/* Uncertainty Ellipsoid Projection Indicator (shrinking as TCA nears) */}
                  <ellipse
                    cx="0"
                    cy="0"
                    rx={cdm.covSize}
                    ry={cdm.covSize * 0.6}
                    fill="none"
                    stroke={isLatest ? 'rgba(52, 211, 153, 0.7)' : 'rgba(56, 189, 248, 0.4)'}
                    strokeWidth="0.75"
                    strokeDasharray="2 3"
                    transform="rotate(-15 0 0)"
                  />

                  {/* Core observation node */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isLatest ? 3.5 : 2.5}
                    fill={isLatest ? 'var(--accent-emerald)' : '#ffffff'}
                  />

                  {/* CDM Label Badge */}
                  <rect
                    x="-32"
                    y="-48"
                    width="64"
                    height="20"
                    fill="rgba(8, 12, 16, 0.9)"
                    stroke={isLatest ? 'rgba(52, 211, 153, 0.5)' : 'var(--border-subtle)'}
                    strokeWidth="0.8"
                    rx="2"
                  />
                  <text
                    x="0"
                    y="-35"
                    textAnchor="middle"
                    fill={isLatest ? '#34d399' : 'var(--text-primary)'}
                    fontSize="7.5"
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.08em"
                    fontWeight={isLatest ? '600' : '400'}
                  >
                    {cdm.id}
                  </text>

                  {/* Time offset indicator */}
                  <text
                    x="0"
                    y="44"
                    textAnchor="middle"
                    fill="var(--text-tertiary)"
                    fontSize="7"
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.08em"
                  >
                    {cdm.timeLabel}
                  </text>
                </g>
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
};
