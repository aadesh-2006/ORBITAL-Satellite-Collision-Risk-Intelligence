import React, { useState } from 'react';

interface ModelArchitectureVisualizerProps {
  phase: number; // 1 to 10
  parallaxX?: number;
  parallaxY?: number;
}

export const ModelArchitectureVisualizer: React.FC<ModelArchitectureVisualizerProps> = ({
  phase,
  parallaxX = 0,
  parallaxY = 0,
}) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const cx = 960;
  const cy = 490;

  const nodes = [
    { id: 't1', label: 'e₁', xLabel: 'x₁', zLabel: 'z₁', x: -280, timeTag: 'T-72h' },
    { id: 't2', label: 'e₂', xLabel: 'x₂', zLabel: 'z₂', x: -140, timeTag: 'T-48h' },
    { id: 't3', label: 'e₃', xLabel: 'x₃', zLabel: 'z₃', x: 0, timeTag: 'T-24h' },
    { id: 't4', label: 'e₄', xLabel: 'x₄', zLabel: 'z₄', x: 140, timeTag: 'T-12h' },
    { id: 't5', label: 'e₅', xLabel: 'x₅', zLabel: 'z₅', x: 280, timeTag: 'T-2h' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: phase === 4 ? 'auto' : 'none',
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
          <linearGradient id="attentionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.7)" />
            <stop offset="50%" stopColor="rgba(52, 211, 153, 0.85)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.9)" />
          </linearGradient>

          <filter id="archGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Phase 1: Enter the Model (Temporal Feature Matrix to Model Representation) */}
        {phase === 1 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Matrix Frame */}
            <rect
              x="-160"
              y="-80"
              width="320"
              height="160"
              fill="rgba(10, 16, 24, 0.95)"
              stroke="rgba(56, 189, 248, 0.6)"
              strokeWidth="1.2"
              rx="2"
            />
            <text
              x="0"
              y="-48"
              textAnchor="middle"
              fill="var(--accent-cyan)"
              fontSize="8"
              fontFamily="var(--font-mono)"
              letterSpacing="0.14em"
              fontWeight="600"
            >
              MODEL INPUT REPRESENTATION
            </text>
            <text
              x="0"
              y="-12"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="14"
              fontFamily="var(--font-mono)"
              letterSpacing="0.08em"
            >
              X ∈ ℝ^(T × F)
            </text>
            <text
              x="0"
              y="22"
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontSize="7.5"
              fontFamily="var(--font-mono)"
              letterSpacing="0.08em"
            >
              T = TEMPORAL OBSERVATIONS &nbsp;|&nbsp; F = CDM FEATURES
            </text>
            <text
              x="0"
              y="48"
              textAnchor="middle"
              fill="var(--text-tertiary)"
              fontSize="6.8"
              fontFamily="var(--font-mono)"
            >
              [ PROPOSED ARCHITECTURE INPUT ]
            </text>
          </g>
        )}

        {/* Phase 2: Feature Projection (x_t -> e_t) */}
        {phase === 2 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Input Row: Raw vectors x_1 ... x_5 */}
            <g transform="translate(0, -70)">
              {nodes.map((node) => (
                <g key={node.id} transform={`translate(${node.x}, 0)`}>
                  <rect
                    x="-30"
                    y="-16"
                    width="60"
                    height="32"
                    fill="rgba(8, 12, 16, 0.9)"
                    stroke="var(--border-subtle)"
                    strokeWidth="0.8"
                    rx="2"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize="8.5"
                    fontFamily="var(--font-mono)"
                    fontWeight="500"
                  >
                    {node.xLabel}
                  </text>
                </g>
              ))}
            </g>

            {/* Projection Block (Dense Linear Layer) */}
            <g transform="translate(0, 0)">
              <rect
                x="-340"
                y="-15"
                width="680"
                height="30"
                fill="rgba(10, 16, 24, 0.95)"
                stroke="rgba(56, 189, 248, 0.5)"
                strokeWidth="1.2"
                rx="2"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="var(--accent-cyan)"
                fontSize="8"
                fontFamily="var(--font-mono)"
                letterSpacing="0.16em"
                fontWeight="600"
              >
                FEATURE PROJECTION (LEARNED EMBEDDING LAYER)
              </text>
            </g>

            {/* Downward flow connectors */}
            {nodes.map((node) => (
              <g key={node.id}>
                <line x1={node.x} y1="-54" x2={node.x} y2="-15" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeDasharray="2 3" />
                <line x1={node.x} y1="15" x2={node.x} y2="54" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="0.8" />
                <polygon points={`${node.x},54 ${node.x - 2.5},49 ${node.x + 2.5},49`} fill="rgba(56, 189, 248, 0.8)" />
              </g>
            ))}

            {/* Output Row: Embeddings e_1 ... e_5 */}
            <g transform="translate(0, 70)">
              {nodes.map((node) => (
                <g key={node.id} transform={`translate(${node.x}, 0)`}>
                  <rect
                    x="-30"
                    y="-16"
                    width="60"
                    height="32"
                    fill="rgba(12, 18, 26, 0.95)"
                    stroke="rgba(52, 211, 153, 0.5)"
                    strokeWidth="1"
                    rx="2"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill="#34d399"
                    fontSize="8.5"
                    fontFamily="var(--font-mono)"
                    fontWeight="600"
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </g>
          </g>
        )}

        {/* Phase 3: Temporal & Positional Information */}
        {phase === 3 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {nodes.map((node, idx) => (
              <g key={node.id} transform={`translate(${node.x}, 0)`}>
                {/* Embedding e_i */}
                <g transform="translate(0, -50)">
                  <rect
                    x="-32"
                    y="-16"
                    width="64"
                    height="32"
                    fill="rgba(8, 12, 16, 0.9)"
                    stroke="var(--border-subtle)"
                    strokeWidth="0.8"
                    rx="2"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill="#38bdf8"
                    fontSize="8"
                    fontFamily="var(--font-mono)"
                    fontWeight="500"
                  >
                    {node.label}
                  </text>
                </g>

                {/* Plus operator */}
                <text x="0" y="-18" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9" fontFamily="var(--font-mono)">
                  +
                </text>

                {/* Positional / Time Encoding Block */}
                <g transform="translate(0, 0)">
                  <rect
                    x="-32"
                    y="-14"
                    width="64"
                    height="28"
                    fill="rgba(10, 14, 20, 0.9)"
                    stroke="rgba(251, 191, 36, 0.4)"
                    strokeWidth="0.8"
                    rx="2"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill="var(--accent-amber)"
                    fontSize="7"
                    fontFamily="var(--font-mono)"
                    fontWeight="500"
                  >
                    P{idx + 1} ({node.timeTag})
                  </text>
                </g>

                {/* Equals arrow */}
                <line x1="0" y1="14" x2="0" y2="44" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
                <polygon points="0,44 -2.5,39 2.5,39" fill="rgba(255, 255, 255, 0.5)" />

                {/* Combined Temporal Representation */}
                <g transform="translate(0, 62)">
                  <rect
                    x="-34"
                    y="-16"
                    width="68"
                    height="32"
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
                    fontWeight="600"
                  >
                    {node.label} + P{idx + 1}
                  </text>
                </g>
              </g>
            ))}

            <g transform="translate(0, 115)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="6.8"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
              >
                TEMPORAL / POSITIONAL ENCODING [ PROPOSED DESIGN ]
              </text>
            </g>
          </g>
        )}

        {/* Phase 4: Self-Attention (Visual Centerpiece with Interactive Hover) */}
        {phase === 4 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Attention Arc Connections */}
            {nodes.map((source, i) =>
              nodes.map((target, j) => {
                if (i >= j) return null;
                const isConnectedToHover =
                  hoveredNode === null || hoveredNode === i || hoveredNode === j;
                const arcHeight = Math.abs(i - j) * 35;

                return (
                  <path
                    key={`${source.id}-${target.id}`}
                    d={`M ${source.x} -10 Q ${(source.x + target.x) / 2} ${-10 - arcHeight} ${target.x} -10`}
                    fill="none"
                    stroke={
                      isConnectedToHover
                        ? (i >= 3 || j >= 3 ? 'rgba(52, 211, 153, 0.65)' : 'rgba(56, 189, 248, 0.4)')
                        : 'rgba(255, 255, 255, 0.06)'
                    }
                    strokeWidth={isConnectedToHover ? (i >= 3 || j >= 3 ? 1.8 : 1.2) : 0.6}
                    strokeDasharray={isConnectedToHover ? 'none' : '2 3'}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                );
              })
            )}

            {/* Interactive Observation Nodes */}
            {nodes.map((node, idx) => {
              const isHovered = hoveredNode === idx;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, 0)`}
                  onMouseEnter={() => setHoveredNode(idx)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx="0"
                    cy="-10"
                    r={isHovered ? 16 : 12}
                    fill="rgba(10, 16, 24, 0.95)"
                    stroke={isHovered ? '#ffffff' : idx >= 3 ? '#34d399' : '#38bdf8'}
                    strokeWidth={isHovered ? 2 : 1.2}
                    style={{ transition: 'all 0.25s ease' }}
                  />
                  <text
                    x="0"
                    y="-6"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="8.5"
                    fontFamily="var(--font-mono)"
                    fontWeight="600"
                  >
                    {node.label}
                  </text>

                  {/* Telemetry Tag below */}
                  <text
                    x="0"
                    y="22"
                    textAnchor="middle"
                    fill="var(--text-tertiary)"
                    fontSize="6.5"
                    fontFamily="var(--font-mono)"
                  >
                    {node.timeTag}
                  </text>
                </g>
              );
            })}

            <g transform="translate(0, 80)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="6.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
              >
                [ CONCEPTUAL VISUALIZATION — NOT LEARNED WEIGHTS ] • HOVER NODES TO HIGHLIGHT CONNECTIONS
              </text>
            </g>
          </g>
        )}

        {/* Phase 5: Transformer Encoder Internal Structure */}
        {phase === 5 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Outer Encoder Block Frame */}
            <rect
              x="-240"
              y="-110"
              width="480"
              height="220"
              fill="rgba(10, 14, 22, 0.95)"
              stroke="rgba(52, 211, 153, 0.55)"
              strokeWidth="1.2"
              rx="3"
            />
            <text
              x="0"
              y="-88"
              textAnchor="middle"
              fill="var(--accent-emerald)"
              fontSize="7.5"
              fontFamily="var(--font-mono)"
              letterSpacing="0.16em"
              fontWeight="600"
            >
              TRANSFORMER ENCODER BLOCK [ PROPOSED ARCHITECTURE ]
            </text>

            {/* Block 1: Multi-Head Self-Attention */}
            <g transform="translate(0, -50)">
              <rect
                x="-180"
                y="-14"
                width="360"
                height="28"
                fill="rgba(8, 12, 18, 0.9)"
                stroke="rgba(56, 189, 248, 0.4)"
                strokeWidth="0.8"
                rx="2"
              />
              <text x="0" y="4" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="500">
                MULTI-HEAD SELF-ATTENTION
              </text>
            </g>

            {/* Block 2: Add & Normalize 1 */}
            <g transform="translate(0, -10)">
              <rect
                x="-140"
                y="-12"
                width="280"
                height="24"
                fill="rgba(6, 9, 14, 0.9)"
                stroke="var(--border-subtle)"
                strokeWidth="0.8"
                rx="2"
              />
              <text x="0" y="3.5" textAnchor="middle" fill="var(--text-secondary)" fontSize="6.8" fontFamily="var(--font-mono)">
                ADD &amp; NORMALIZE (RESIDUAL CONNECTION)
              </text>
            </g>

            {/* Block 3: Feed-Forward Network */}
            <g transform="translate(0, 30)">
              <rect
                x="-180"
                y="-14"
                width="360"
                height="28"
                fill="rgba(8, 12, 18, 0.9)"
                stroke="rgba(52, 211, 153, 0.4)"
                strokeWidth="0.8"
                rx="2"
              />
              <text x="0" y="4" textAnchor="middle" fill="#34d399" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="500">
                FEED-FORWARD NETWORK (DENSE LAYERS)
              </text>
            </g>

            {/* Block 4: Add & Normalize 2 */}
            <g transform="translate(0, 70)">
              <rect
                x="-140"
                y="-12"
                width="280"
                height="24"
                fill="rgba(6, 9, 14, 0.9)"
                stroke="var(--border-subtle)"
                strokeWidth="0.8"
                rx="2"
              />
              <text x="0" y="3.5" textAnchor="middle" fill="var(--text-secondary)" fontSize="6.8" fontFamily="var(--font-mono)">
                ADD &amp; NORMALIZE
              </text>
            </g>
          </g>
        )}

        {/* Phase 6: Multi-Layer Temporal Reasoning (Encoder x N) */}
        {phase === 6 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {[
              { label: 'ENCODER LAYER 1', sub: 'Initial Temporal Attention', x: -220 },
              { label: 'ENCODER LAYER 2', sub: 'Contextual Feature Fusion', x: 0 },
              { label: 'ENCODER LAYER N', sub: 'Deep Astrodynamic Representation', x: 220, highlight: true },
            ].map((layer, idx) => (
              <g key={layer.label} transform={`translate(${layer.x}, 0)`}>
                <rect
                  x="-90"
                  y="-40"
                  width="180"
                  height="80"
                  fill="rgba(10, 16, 24, 0.95)"
                  stroke={layer.highlight ? 'rgba(52, 211, 153, 0.65)' : 'rgba(56, 189, 248, 0.45)'}
                  strokeWidth={1.2}
                  rx="2"
                />
                <text
                  x="0"
                  y="-14"
                  textAnchor="middle"
                  fill={layer.highlight ? '#34d399' : '#38bdf8'}
                  fontSize="7.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.1em"
                  fontWeight="600"
                >
                  {layer.label}
                </text>
                <text
                  x="0"
                  y="6"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="6.5"
                  fontFamily="var(--font-mono)"
                >
                  {layer.sub}
                </text>
                <text
                  x="0"
                  y="22"
                  textAnchor="middle"
                  fill="var(--text-tertiary)"
                  fontSize="5.8"
                  fontFamily="var(--font-mono)"
                >
                  [ MULTI-HEAD ATTENTION + FFN ]
                </text>

                {idx < 2 && (
                  <g>
                    <line x1="90" y1="0" x2="130" y2="0" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
                    <polygon points="130,0 125,-3 125,3" fill="rgba(255, 255, 255, 0.6)" />
                  </g>
                )}
              </g>
            ))}

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
                [ CONCEPTUAL STACK — ENCODER × N (LAYER COUNT TO BE SELECTED EXPERIMENTALLY) ]
              </text>
            </g>
          </g>
        )}

        {/* Phase 7: Temporal Aggregation (Sequence -> Global Representation) */}
        {phase === 7 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Top row: contextual representations z_1 ... z_5 */}
            <g transform="translate(0, -65)">
              {nodes.map((node) => (
                <g key={node.id} transform={`translate(${node.x}, 0)`}>
                  <rect
                    x="-28"
                    y="-15"
                    width="56"
                    height="30"
                    fill="rgba(8, 12, 16, 0.9)"
                    stroke="var(--border-subtle)"
                    strokeWidth="0.8"
                    rx="2"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="8"
                    fontFamily="var(--font-mono)"
                    fontWeight="500"
                  >
                    {node.zLabel}
                  </text>

                  {/* Converging line to aggregation hub */}
                  <line x1="0" y1="15" x2={-node.x * 0.7} y2="45" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="0.8" strokeDasharray="2 3" />
                </g>
              ))}
            </g>

            {/* Central Aggregation Block */}
            <g transform="translate(0, 0)">
              <rect
                x="-140"
                y="-15"
                width="280"
                height="30"
                fill="rgba(10, 16, 24, 0.95)"
                stroke="rgba(56, 189, 248, 0.55)"
                strokeWidth="1.2"
                rx="2"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="var(--accent-cyan)"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.14em"
                fontWeight="600"
              >
                TEMPORAL AGGREGATION
              </text>
            </g>

            <line x1="0" y1="15" x2="0" y2="45" stroke="rgba(52, 211, 153, 0.5)" strokeWidth="1" />
            <polygon points="0,45 -2.5,40 2.5,40" fill="rgba(52, 211, 153, 0.8)" />

            {/* Unified Conjunction Representation vector */}
            <g transform="translate(0, 65)">
              <rect
                x="-160"
                y="-18"
                width="320"
                height="36"
                fill="rgba(12, 18, 26, 0.95)"
                stroke="rgba(52, 211, 153, 0.65)"
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
                letterSpacing="0.12em"
                fontWeight="600"
              >
                CONJUNCTION REPRESENTATION
              </text>
            </g>

            <g transform="translate(0, 115)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="6.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
              >
                TEMPORAL AGGREGATION [ DESIGN TO BE EVALUATED: ATTENTION / MEAN POOLING ]
              </text>
            </g>
          </g>
        )}

        {/* Phase 8: Prediction Head & Model Output */}
        {phase === 8 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Step 1: Conjunction Representation */}
            <g transform="translate(-240, 0)">
              <rect
                x="-90"
                y="-20"
                width="180"
                height="40"
                fill="rgba(8, 12, 16, 0.9)"
                stroke="var(--border-subtle)"
                strokeWidth="0.8"
                rx="2"
              />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.08em">
                CONJUNCTION EMBEDDING
              </text>
            </g>

            <line x1="-150" y1="0" x2="-90" y2="0" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
            <polygon points="-90,0 -95,-3 -95,3" fill="rgba(255, 255, 255, 0.5)" />

            {/* Step 2: Dense Prediction Head */}
            <g transform="translate(0, 0)">
              <rect
                x="-85"
                y="-20"
                width="170"
                height="40"
                fill="rgba(10, 16, 24, 0.95)"
                stroke="rgba(56, 189, 248, 0.55)"
                strokeWidth="1.2"
                rx="2"
              />
              <text x="0" y="4" textAnchor="middle" fill="var(--accent-cyan)" fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.12em" fontWeight="600">
                PREDICTION HEAD
              </text>
            </g>

            <line x1="85" y1="0" x2="145" y2="0" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
            <polygon points="145,0 140,-3 140,3" fill="rgba(255, 255, 255, 0.5)" />

            {/* Step 3: Risk Prediction Output */}
            <g transform="translate(240, 0)">
              <rect
                x="-95"
                y="-20"
                width="190"
                height="40"
                fill="rgba(12, 18, 26, 0.95)"
                stroke="rgba(248, 113, 113, 0.55)"
                strokeWidth="1.2"
                rx="2"
              />
              <text x="0" y="-3" textAnchor="middle" fill="#f87171" fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.12em" fontWeight="600">
                RISK PREDICTION
              </text>
              <text x="0" y="10" textAnchor="middle" fill="var(--text-tertiary)" fontSize="6" fontFamily="var(--font-mono)">
                [ P(RISK) // PENDING TRAINING ]
              </text>
            </g>
          </g>
        )}

        {/* Phase 9: Baseline vs Proposed Dual-Track Benchmarking */}
        {phase === 9 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Common Input Sequence */}
            <g transform="translate(0, -65)">
              <rect
                x="-140"
                y="-15"
                width="280"
                height="30"
                fill="rgba(8, 12, 16, 0.9)"
                stroke="var(--border-subtle)"
                strokeWidth="0.8"
                rx="2"
              />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.1em">
                TEMPORAL SEQUENCE (SAME BENCHMARK DATA)
              </text>
            </g>

            {/* Split Connectors */}
            <line x1="0" y1="-50" x2="-160" y2="-18" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
            <line x1="0" y1="-50" x2="160" y2="-18" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />

            {/* Path A: LSTM / GRU Baseline */}
            <g transform="translate(-160, 10)">
              <rect
                x="-90"
                y="-25"
                width="180"
                height="50"
                fill="rgba(8, 12, 16, 0.95)"
                stroke="rgba(56, 189, 248, 0.4)"
                strokeWidth="1"
                rx="2"
              />
              <text x="0" y="-6" textAnchor="middle" fill="var(--accent-cyan)" fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.1em" fontWeight="600">
                PATH A: BASELINE
              </text>
              <text x="0" y="10" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="var(--font-mono)">
                LSTM / GRU RECURRENCE
              </text>
            </g>

            {/* Path B: Transformer / Attention Proposed */}
            <g transform="translate(160, 10)">
              <rect
                x="-100"
                y="-25"
                width="200"
                height="50"
                fill="rgba(10, 16, 24, 0.95)"
                stroke="rgba(52, 211, 153, 0.5)"
                strokeWidth="1"
                rx="2"
              />
              <text x="0" y="-6" textAnchor="middle" fill="var(--accent-emerald)" fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.1em" fontWeight="600">
                PATH B: PROPOSED
              </text>
              <text x="0" y="10" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="var(--font-mono)">
                TRANSFORMER ATTENTION
              </text>
            </g>

            {/* Bottom Evaluation Banner */}
            <g transform="translate(0, 75)">
              <text x="0" y="0" textAnchor="middle" fill="var(--text-tertiary)" fontSize="6.8" fontFamily="var(--font-mono)" letterSpacing="0.1em">
                CONTROLLED EVALUATION: DOES TEMPORAL ATTENTION IMPROVE RISK PREDICTION?
              </text>
            </g>
          </g>
        )}

        {/* Phase 10: Complete End-to-End Proposed Architecture Blueprint */}
        {phase === 10 && (
          <g transform={`translate(${cx}, ${cy})`}>
            {[
              { title: 'CDM SEQUENCE', sub: '103 Features (x_t)', x: -750, w: 210 },
              { title: 'PROJECTION', sub: 'Dense Latent (e_t)', x: -500, w: 210 },
              { title: 'POSITIONAL INFO', sub: 'Time-to-TCA (P_t)', x: -250, w: 210 },
              { title: 'TRANSFORMER × N', sub: 'Multi-Head Attention', x: 0, w: 240, highlight: true },
              { title: 'AGGREGATION', sub: 'Temporal Pooling', x: 250, w: 210 },
              { title: 'REPRESENTATION', sub: 'Conjunction Vector', x: 500, w: 210 },
              { title: 'PREDICTION HEAD', sub: 'P(risk) Probability', x: 750, w: 210 },
            ].map((blk, idx) => (
              <g key={blk.title} transform={`translate(${blk.x}, 0)`}>
                <rect
                  x={-blk.w / 2}
                  y="-55"
                  width={blk.w}
                  height="110"
                  fill="rgba(10, 16, 24, 0.95)"
                  stroke={blk.highlight ? '#34d399' : 'rgba(255, 255, 255, 0.22)'}
                  strokeWidth={blk.highlight ? 2.5 : 1.4}
                  rx="6"
                  filter={blk.highlight ? 'url(#archGlow)' : undefined}
                />
                <text
                  x="0"
                  y="-14"
                  textAnchor="middle"
                  fill={blk.highlight ? '#34d399' : '#ffffff'}
                  fontSize="16"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.06em"
                  fontWeight="700"
                >
                  {blk.title}
                </text>
                <text
                  x="0"
                  y="20"
                  textAnchor="middle"
                  fill={blk.highlight ? '#a7f3d0' : 'var(--text-secondary)'}
                  fontSize="13"
                  fontFamily="var(--font-mono)"
                  fontWeight="500"
                >
                  {blk.sub}
                </text>

                {idx < 6 && (
                  <g>
                    <line
                      x1={blk.w / 2 + 4}
                      y1="0"
                      x2={blk.w / 2 + 36}
                      y2="0"
                      stroke={blk.highlight ? '#34d399' : 'rgba(255, 255, 255, 0.45)'}
                      strokeWidth="2.5"
                    />
                    <polygon
                      points={`${blk.w / 2 + 36},0 ${blk.w / 2 + 28},-5 ${blk.w / 2 + 28},5`}
                      fill={blk.highlight ? '#34d399' : 'rgba(255, 255, 255, 0.55)'}
                    />
                  </g>
                )}
              </g>
            ))}

            <g transform="translate(0, 140)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="var(--accent-emerald)"
                fontSize="18"
                fontFamily="var(--font-mono)"
                letterSpacing="0.14em"
                fontWeight="600"
              >
                PROPOSED ARCHITECTURE // END-TO-END TEMPORAL REASONING PIPELINE
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
