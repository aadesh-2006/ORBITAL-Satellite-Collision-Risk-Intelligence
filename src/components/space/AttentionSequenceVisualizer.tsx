import React, { useEffect, useState } from 'react';

interface AttentionSequenceVisualizerProps {
  phase: number; // 1 to 8
  parallaxX?: number;
  parallaxY?: number;
}

export const AttentionSequenceVisualizer: React.FC<AttentionSequenceVisualizerProps> = ({
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

  // Pulse oscillation
  const pulse = Math.sin(time * 3) * 0.5 + 0.5;

  const cdmNodes = [
    { id: 'CDM 01', timeOffset: 'T-72h', x: -280, weight: 0.2, color: 'var(--text-tertiary)' },
    { id: 'CDM 02', timeOffset: 'T-48h', x: -140, weight: 0.35, color: 'var(--text-secondary)' },
    { id: 'CDM 03', timeOffset: 'T-24h', x: 0, weight: 0.5, color: 'var(--accent-cyan)' },
    { id: 'CDM 04', timeOffset: 'T-12h', x: 140, weight: 0.75, color: 'var(--accent-emerald)' },
    { id: 'CDM 05', timeOffset: 'T-2h', x: 280, weight: 1.0, color: '#ffffff' },
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
          <filter id="attentionGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Phase 1 & 2: Sequence & Snapshot vs Sequence */}
        {(phase === 1 || phase === 2) && (
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

            {cdmNodes.map((node, idx) => {
              const isOnlySnapshot = phase === 2 && idx < 4;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, 0)`}
                  style={{
                    opacity: isOnlySnapshot ? 0.2 : 1,
                    transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <line x1="0" y1="-24" x2="0" y2="24" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />
                  <circle cx="0" cy="0" r={idx === 4 ? 4 : 3} fill={idx === 4 ? '#ffffff' : 'var(--text-secondary)'} />

                  <rect
                    x="-32"
                    y="-44"
                    width="64"
                    height="22"
                    fill="rgba(8, 12, 16, 0.9)"
                    stroke={idx === 4 ? 'rgba(255, 255, 255, 0.4)' : 'var(--border-subtle)'}
                    strokeWidth="0.8"
                    rx="2"
                  />
                  <text
                    x="0"
                    y="-30"
                    textAnchor="middle"
                    fill={idx === 4 ? '#ffffff' : 'var(--text-primary)'}
                    fontSize="7.5"
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.08em"
                    fontWeight="500"
                  >
                    {node.id}
                  </text>
                  <text
                    x="0"
                    y="38"
                    textAnchor="middle"
                    fill="var(--text-tertiary)"
                    fontSize="7"
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.08em"
                  >
                    {node.timeOffset}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* Phase 3: Sequence Modeling Transformation */}
        {phase === 3 && (
          <g transform={`translate(${cx}, ${cy - 20})`}>
            {/* Input sequence boxes flowing into model */}
            {cdmNodes.map((node) => (
              <g key={node.id} transform={`translate(${node.x}, 0)`}>
                <rect
                  x="-28"
                  y="-18"
                  width="56"
                  height="26"
                  fill="rgba(8, 12, 16, 0.9)"
                  stroke="var(--border-subtle)"
                  strokeWidth="0.8"
                  rx="2"
                />
                <text
                  x="0"
                  y="-2"
                  textAnchor="middle"
                  fill="var(--text-primary)"
                  fontSize="7"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                >
                  {node.id}
                </text>

                {/* Flow arrows into temporal sequence block */}
                <line x1="0" y1="8" x2="0" y2="60" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeDasharray="2 3" />
              </g>
            ))}

            {/* Intermediate: TEMPORAL SEQUENCE */}
            <g transform="translate(0, 80)">
              <rect
                x="-160"
                y="-15"
                width="320"
                height="30"
                fill="rgba(10, 14, 20, 0.9)"
                stroke="rgba(56, 189, 248, 0.35)"
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
                letterSpacing="0.14em"
                fontWeight="500"
              >
                TEMPORAL SEQUENCE INPUT
              </text>
            </g>

            {/* Flow to MODEL */}
            <line x1="0" y1="95" x2="0" y2="135" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />

            {/* MODEL block */}
            <g transform="translate(0, 155)">
              <rect
                x="-90"
                y="-16"
                width="180"
                height="32"
                fill="rgba(12, 16, 24, 0.95)"
                stroke="rgba(52, 211, 153, 0.45)"
                strokeWidth="1"
                rx="2"
              />
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fill="#34d399"
                fontSize="8.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.14em"
                fontWeight="600"
              >
                SEQUENCE MODEL
              </text>
            </g>
          </g>
        )}

        {/* Phase 4: LSTM / GRU Sequential Recurrence */}
        {phase === 4 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {cdmNodes.map((node, idx) => (
              <g key={node.id} transform={`translate(${node.x}, 0)`}>
                {/* Node Box */}
                <rect
                  x="-32"
                  y="-20"
                  width="64"
                  height="40"
                  fill="rgba(8, 12, 16, 0.9)"
                  stroke="rgba(56, 189, 248, 0.4)"
                  strokeWidth="1"
                  rx="2"
                />
                <text
                  x="0"
                  y="-4"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="7.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                  fontWeight="500"
                >
                  {node.id}
                </text>
                <text
                  x="0"
                  y="10"
                  textAnchor="middle"
                  fill="var(--accent-cyan)"
                  fontSize="6.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.06em"
                >
                  {node.timeOffset}
                </text>

                {/* Recurrent Sequential Arrow to next step */}
                {idx < cdmNodes.length - 1 && (
                  <g>
                    <line
                      x1="32"
                      y1="0"
                      x2="108"
                      y2="0"
                      stroke="rgba(56, 189, 248, 0.6)"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    <polygon
                      points="108,0 102,-3 102,3"
                      fill="rgba(56, 189, 248, 0.8)"
                    />
                    <text
                      x="70"
                      y="-8"
                      textAnchor="middle"
                      fill="var(--text-tertiary)"
                      fontSize="6"
                      fontFamily="var(--font-mono)"
                    >
                      h{idx + 1}
                    </text>
                  </g>
                )}
              </g>
            ))}

            {/* Sequential Recurrent Annotation */}
            <g transform="translate(0, 60)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
              >
                STEP-BY-STEP RECURRENT INFORMATION PASSING
              </text>
            </g>
          </g>
        )}

        {/* Phase 5: Variable Importance / Attention Weights Concept */}
        {phase === 5 && (
          <g transform={`translate(${cx}, ${cy})`}>
            <line
              x1="-360"
              y1="0"
              x2="360"
              y2="0"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
            />

            {cdmNodes.map((node, idx) => {
              const nodeGlowSize = 8 + node.weight * 16;
              const barHeight = node.weight * 50;

              return (
                <g key={node.id} transform={`translate(${node.x}, 0)`}>
                  {/* Vertical importance bar */}
                  <rect
                    x="-6"
                    y={-barHeight - 30}
                    width="12"
                    height={barHeight}
                    fill={node.color}
                    opacity={0.35 + node.weight * 0.4}
                    rx="1"
                  />

                  {/* Node Circle */}
                  <circle
                    cx="0"
                    cy="0"
                    r={3 + node.weight * 2}
                    fill={node.color}
                    style={{
                      filter: node.weight > 0.7 ? 'drop-shadow(0 0 6px rgba(52, 211, 153, 0.8))' : 'none',
                    }}
                  />

                  {/* Target ring for high importance */}
                  {node.weight > 0.7 && (
                    <circle
                      cx="0"
                      cy="0"
                      r={nodeGlowSize + pulse * 2}
                      fill="none"
                      stroke={node.color}
                      strokeWidth="0.75"
                      strokeDasharray="2 3"
                    />
                  )}

                  <text
                    x="0"
                    y="-barHeight - 38"
                    textAnchor="middle"
                    fill={node.color}
                    fontSize="7"
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.08em"
                    fontWeight="500"
                  >
                    {node.id}
                  </text>

                  <text
                    x="0"
                    y="24"
                    textAnchor="middle"
                    fill="var(--text-tertiary)"
                    fontSize="6.5"
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.06em"
                  >
                    {idx < 2 ? 'LOW' : idx === 2 ? 'MEDIUM' : 'HIGH'}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* Phase 6: Direct Associative Attention Connections */}
        {phase === 6 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Central Attention Hub */}
            <g transform="translate(0, 90)">
              <rect
                x="-90"
                y="-18"
                width="180"
                height="36"
                fill="rgba(12, 16, 24, 0.95)"
                stroke="rgba(52, 211, 153, 0.6)"
                strokeWidth="1.2"
                rx="2"
              />
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fill="#34d399"
                fontSize="9"
                fontFamily="var(--font-mono)"
                letterSpacing="0.18em"
                fontWeight="600"
              >
                ATTENTION
              </text>
            </g>

            {/* Direct associative arcs from each CDM node to Attention Hub */}
            {cdmNodes.map((node) => (
              <g key={node.id}>
                <path
                  d={`M ${node.x} -20 Q ${node.x * 0.4} 30 0 72`}
                  fill="none"
                  stroke={node.weight > 0.6 ? 'rgba(52, 211, 153, 0.7)' : 'rgba(56, 189, 248, 0.35)'}
                  strokeWidth={node.weight * 1.8}
                  strokeDasharray="3 3"
                />

                <g transform={`translate(${node.x}, -20)`}>
                  <rect
                    x="-26"
                    y="-12"
                    width="52"
                    height="24"
                    fill="rgba(8, 12, 16, 0.9)"
                    stroke="var(--border-subtle)"
                    strokeWidth="0.8"
                    rx="2"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize="7"
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.08em"
                  >
                    {node.id}
                  </text>
                </g>
              </g>
            ))}
          </g>
        )}

        {/* Phase 7 & 8: Conceptual Transformer Pipeline */}
        {(phase === 7 || phase === 8) && (
          <g transform={`translate(${cx}, ${cy - 10})`}>
            {/* Stage 1: CDM SEQUENCE */}
            <g transform="translate(-320, 0)">
              <rect
                x="-65"
                y="-18"
                width="130"
                height="36"
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
                fontSize="7"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
              >
                CDM SEQUENCE
              </text>
            </g>

            {/* Connector 1 */}
            <line x1="-255" y1="0" x2="-215" y2="0" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" strokeDasharray="2 3" />

            {/* Stage 2: EMBEDDING */}
            <g transform="translate(-160, 0)">
              <rect
                x="-55"
                y="-18"
                width="110"
                height="36"
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
                fontSize="7"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
              >
                EMBEDDING
              </text>
            </g>

            {/* Connector 2 */}
            <line x1="-105" y1="0" x2="-65" y2="0" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" strokeDasharray="2 3" />

            {/* Stage 3: ATTENTION */}
            <g transform="translate(0, 0)">
              <rect
                x="-65"
                y="-20"
                width="130"
                height="40"
                fill="rgba(10, 16, 24, 0.95)"
                stroke="rgba(56, 189, 248, 0.5)"
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
                letterSpacing="0.12em"
                fontWeight="500"
              >
                ATTENTION
              </text>
            </g>

            {/* Connector 3 */}
            <line x1="65" y1="0" x2="105" y2="0" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" strokeDasharray="2 3" />

            {/* Stage 4: TRANSFORMER */}
            <g transform="translate(160, 0)">
              <rect
                x="-55"
                y="-20"
                width="110"
                height="40"
                fill="rgba(12, 18, 26, 0.95)"
                stroke="rgba(52, 211, 153, 0.6)"
                strokeWidth="1.2"
                rx="2"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="#34d399"
                fontSize="8"
                fontFamily="var(--font-mono)"
                letterSpacing="0.14em"
                fontWeight="600"
              >
                TRANSFORMER
              </text>
            </g>

            {/* Connector 4 */}
            <line x1="215" y1="0" x2="255" y2="0" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" strokeDasharray="2 3" />

            {/* Stage 5: RISK REPRESENTATION */}
            <g transform="translate(320, 0)">
              <rect
                x="-65"
                y="-18"
                width="130"
                height="36"
                fill="rgba(8, 12, 16, 0.9)"
                stroke="rgba(248, 113, 113, 0.45)"
                strokeWidth="0.8"
                rx="2"
              />
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fill="#f87171"
                fontSize="6.8"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
              >
                RISK REPRESENTATION
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
