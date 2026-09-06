import React, { useEffect, useState } from 'react';

interface ConjunctionVisualizerProps {
  phase: number; // 1 to 7
  parallaxX?: number;
  parallaxY?: number;
}

interface OrbitalParticle {
  id: number;
  rx: number;
  ry: number;
  tiltDeg: number;
  speed: number;
  phaseOffset: number;
  size: number;
  opacity: number;
}

export const ConjunctionVisualizer: React.FC<ConjunctionVisualizerProps> = ({
  phase,
  parallaxX = 0,
  parallaxY = 0,
}) => {
  const [time, setTime] = useState(0);

  // RAF loop for smooth physics motion
  useEffect(() => {
    let animId: number;
    const loop = () => {
      setTime(performance.now() * 0.001);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Background constellation of orbital objects (harmless orbital traffic)
  const [backgroundObjects] = useState<OrbitalParticle[]>(() => {
    const items: OrbitalParticle[] = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        rx: 480 + (i % 5) * 70 + Math.random() * 40,
        ry: 160 + (i % 4) * 35 + Math.random() * 20,
        tiltDeg: -30 + (i * 14) % 90,
        speed: 0.05 + (i % 3) * 0.04 + Math.random() * 0.02,
        phaseOffset: (i * Math.PI * 2) / count,
        size: 1.2 + (i % 3) * 0.6,
        opacity: 0.25 + (i % 4) * 0.12,
      });
    }
    return items;
  });

  const cx = 960;
  const cy = 540;

  // Closest approach kinematics for Object A and Object B
  // Object A trajectory (approaching from upper left to center)
  // Object B trajectory (approaching from lower right to center)
  // In Phase 4+, motion oscillates smoothly around the closest approach point (TCA)
  const isCloseApproachActive = phase >= 4;
  const isFocusOnTwo = phase >= 3;

  // Kinetic parametric calculation for Object A & B
  // Base progress from -1 (approach) to 0 (TCA) to +1 (separation)
  // If phase >= 4, slow time dilation near encounter
  const timeScale = isCloseApproachActive ? 0.25 : 0.45;
  const encounterCycle = Math.sin(time * timeScale); // oscillates between -1 and 1

  // Object A coordinates
  // Path A: Arc from (-420, -180) to (+380, +160), with closest approach at (cx - 18, cy - 14)
  const satA_x = cx + encounterCycle * 260 - 18;
  const satA_y = cy + encounterCycle * 140 - 14;

  // Object B coordinates
  // Path B: Arc from (+360, -190) to (-380, +180), with closest approach at (cx + 18, cy + 14)
  const satB_x = cx - encounterCycle * 240 + 18;
  const satB_y = cy + encounterCycle * 150 + 14;

  // Distance between A and B in pixels (scaled)
  const dx = satA_x - satB_x;
  const dy = satA_y - satB_y;
  const pixelDistance = Math.sqrt(dx * dx + dy * dy);
  const isAtClosestApproach = pixelDistance < 55;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 4,
        transform: `translate3d(${parallaxX * -12}px, ${parallaxY * -12}px, 0)`,
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
          <filter id="reticleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Phase 1 & 2: Ambient Background Orbital Traffic */}
        <g
          style={{
            opacity: phase >= 3 ? 0.12 : 0.65,
            transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {backgroundObjects.map((obj) => {
            const angle = time * obj.speed + obj.phaseOffset;
            const tiltRad = (obj.tiltDeg * Math.PI) / 180;
            const rawX = Math.cos(angle) * obj.rx;
            const rawY = Math.sin(angle) * obj.ry;
            const px = cx + (rawX * Math.cos(tiltRad) - rawY * Math.sin(tiltRad));
            const py = cy + (rawX * Math.sin(tiltRad) + rawY * Math.cos(tiltRad));

            return (
              <g key={obj.id}>
                {/* Orbital trace ellipse */}
                <ellipse
                  cx={cx}
                  cy={cy}
                  rx={obj.rx}
                  ry={obj.ry}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="0.5"
                  strokeDasharray="1 8"
                  transform={`rotate(${obj.tiltDeg} ${cx} ${cy})`}
                />
                {/* Object particle */}
                <circle
                  cx={px}
                  cy={py}
                  r={obj.size}
                  fill={`rgba(200, 220, 240, ${obj.opacity})`}
                />
              </g>
            );
          })}
        </g>

        {/* Phase 3+: Converging Trajectories for Object A and Object B */}
        {isFocusOnTwo && (
          <g>
            {/* Trajectory Guide Track for Object A */}
            <line
              x1={cx - 360}
              y1={cy - 200}
              x2={cx + 340}
              y2={cy + 180}
              stroke="rgba(56, 189, 248, 0.3)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />

            {/* Trajectory Guide Track for Object B */}
            <line
              x1={cx + 340}
              y1={cy - 210}
              x2={cx - 350}
              y2={cy + 220}
              stroke="rgba(52, 211, 153, 0.3)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />

            {/* Convergence Intersection Crosshair / Close Approach Zone */}
            {phase >= 4 && (
              <g transform={`translate(${cx}, ${cy})`}>
                {/* Outer targeting circle */}
                <circle
                  r={isAtClosestApproach ? 42 : 36}
                  fill="none"
                  stroke={isAtClosestApproach ? 'rgba(248, 113, 113, 0.45)' : 'rgba(255, 255, 255, 0.18)'}
                  strokeWidth="0.75"
                  strokeDasharray="3 4"
                  style={{
                    transition: 'all 0.5s ease',
                  }}
                />
                {/* Inner target brackets */}
                <line x1="-12" y1="0" x2="-4" y2="0" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
                <line x1="4" y1="0" x2="12" y2="0" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
                <line x1="0" y1="-12" x2="0" y2="-4" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
                <line x1="0" y1="4" x2="0" y2="12" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />

                {/* TCA Tag */}
                <text
                  x="18"
                  y="-18"
                  fill={isAtClosestApproach ? 'var(--accent-ruby)' : 'var(--text-secondary)'}
                  fontSize="9"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.1em"
                  fontWeight="500"
                >
                  TCA ENCOUNTER ZONE
                </text>
              </g>
            )}

            {/* Object A Node & Tracking Marker */}
            <g transform={`translate(${satA_x}, ${satA_y})`}>
              <circle
                r="9"
                fill="none"
                stroke="rgba(56, 189, 248, 0.6)"
                strokeWidth="0.75"
              />
              <circle
                r="3"
                fill="#38bdf8"
                style={{ filter: 'drop-shadow(0 0 6px #38bdf8)' }}
              />
              <line x1="0" y1="0" x2="-20" y2="-10" stroke="rgba(56, 189, 248, 0.7)" strokeWidth="1" />
              <text
                x="-24"
                y="-14"
                textAnchor="end"
                fill="#38bdf8"
                fontSize="9"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
              >
                OBJECT A
              </text>
            </g>

            {/* Object B Node & Tracking Marker */}
            <g transform={`translate(${satB_x}, ${satB_y})`}>
              <circle
                r="9"
                fill="none"
                stroke="rgba(52, 211, 153, 0.6)"
                strokeWidth="0.75"
              />
              <circle
                r="3"
                fill="#34d399"
                style={{ filter: 'drop-shadow(0 0 6px #34d399)' }}
              />
              <line x1="0" y1="0" x2="20" y2="-10" stroke="rgba(52, 211, 153, 0.7)" strokeWidth="1" />
              <text
                x="24"
                y="-14"
                fill="#34d399"
                fontSize="9"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
              >
                OBJECT B
              </text>
            </g>

            {/* Phase 5+: Miss Distance Visual Separation Line & Measurement Brackets */}
            {phase >= 5 && (
              <g>
                {/* Direct separation distance vector line */}
                <line
                  x1={satA_x}
                  y1={satA_y}
                  x2={satB_x}
                  y2={satB_y}
                  stroke="rgba(248, 113, 113, 0.85)"
                  strokeWidth="1.2"
                  strokeDasharray="2 3"
                />

                {/* Perpendicular tick at Object A */}
                <line
                  x1={satA_x - (dy / pixelDistance) * 8}
                  y1={satA_y + (dx / pixelDistance) * 8}
                  x2={satA_x + (dy / pixelDistance) * 8}
                  y2={satA_y - (dx / pixelDistance) * 8}
                  stroke="rgba(248, 113, 113, 0.9)"
                  strokeWidth="1"
                />

                {/* Perpendicular tick at Object B */}
                <line
                  x1={satB_x - (dy / pixelDistance) * 8}
                  y1={satB_y + (dx / pixelDistance) * 8}
                  x2={satB_x + (dy / pixelDistance) * 8}
                  y2={satB_y - (dx / pixelDistance) * 8}
                  stroke="rgba(248, 113, 113, 0.9)"
                  strokeWidth="1"
                />

                {/* Measurement Tag */}
                <g transform={`translate(${(satA_x + satB_x) / 2}, ${(satA_y + satB_y) / 2 - 18})`}>
                  <rect
                    x="-65"
                    y="-12"
                    width="130"
                    height="20"
                    fill="rgba(8, 10, 12, 0.85)"
                    stroke="rgba(248, 113, 113, 0.4)"
                    strokeWidth="0.8"
                    rx="1"
                  />
                  <text
                    x="0"
                    y="2"
                    textAnchor="middle"
                    fill="#f87171"
                    fontSize="9"
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.1em"
                    fontWeight="500"
                  >
                    MISS DISTANCE: 742 m
                  </text>
                </g>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
