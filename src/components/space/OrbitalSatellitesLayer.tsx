import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface OrbitalSatellitesLayerProps {
  phase: number; // 1-2: hidden, 3+: visible
  parallaxX?: number;
  parallaxY?: number;
}

export const OrbitalSatellitesLayer: React.FC<OrbitalSatellitesLayerProps> = ({
  phase,
  parallaxX = 0,
  parallaxY = 0,
}) => {
  const isVisible = phase >= 3;
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animId: number;
    const update = () => {
      setTime(performance.now() * 0.001);
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Parametric equations for 2 realistic satellite trajectories
  // Satellite 1: Low Earth Orbit (LEO) Sun-Synchronous inclination
  // Parametric ellipse around viewport center (960, 580)
  const cx = 960;
  const cy = 600;

  // Orbit 1: Primary LEO (Semi-major: 560, Semi-minor: 180, Tilt: -18deg)
  const angle1 = time * 0.18; // Angular velocity (rad/s)
  const r1x = 560;
  const r1y = 190;
  const tilt1 = (-18 * Math.PI) / 180;
  const x1_raw = Math.cos(angle1) * r1x;
  const y1_raw = Math.sin(angle1) * r1y;
  const sat1_x = cx + (x1_raw * Math.cos(tilt1) - y1_raw * Math.sin(tilt1));
  const sat1_y = cy + (x1_raw * Math.sin(tilt1) + y1_raw * Math.cos(tilt1));

  // Orbit 2: Higher inclination polar orbit (Semi-major: 680, Semi-minor: 250, Tilt: 42deg)
  const angle2 = time * -0.12 + 2.0;
  const r2x = 640;
  const r2y = 230;
  const tilt2 = (38 * Math.PI) / 180;
  const x2_raw = Math.cos(angle2) * r2x;
  const y2_raw = Math.sin(angle2) * r2y;
  const sat2_x = cx + (x2_raw * Math.cos(tilt2) - y2_raw * Math.sin(tilt2));
  const sat2_y = cy + (x2_raw * Math.sin(tilt2) + y2_raw * Math.cos(tilt2));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 3,
        overflow: 'hidden',
        transform: `translate3d(${parallaxX * -10}px, ${parallaxY * -10}px, 0)`,
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
          <linearGradient id="satTrackGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="70%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="100%" stopColor="rgba(52, 211, 153, 0.4)" />
          </linearGradient>
        </defs>

        {/* Orbit Arc 1: Primary LEO Trajectory */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={r1x}
          ry={r1y}
          fill="none"
          stroke="rgba(255, 255, 255, 0.18)"
          strokeWidth="0.8"
          strokeDasharray="3 7"
          transform={`rotate(-18 ${cx} ${cy})`}
        />

        {/* Orbit Arc 2: Inclined Polar Trajectory */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={r2x}
          ry={r2y}
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="0.75"
          strokeDasharray="2 9"
          transform={`rotate(38 ${cx} ${cy})`}
        />

        {/* Orbit Arc 3: Outer High Altitude Envelope */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={780}
          ry={290}
          fill="none"
          stroke="rgba(255, 255, 255, 0.07)"
          strokeWidth="0.6"
          strokeDasharray="1 14"
          transform={`rotate(-8 ${cx} ${cy})`}
        />

        {/* Satellite 1 Marker & Identifier */}
        <g transform={`translate(${sat1_x}, ${sat1_y})`}>
          {/* Target Reticle */}
          <circle
            r="7"
            fill="none"
            stroke="rgba(52, 211, 153, 0.35)"
            strokeWidth="0.5"
            strokeDasharray="2 3"
          />
          {/* Core Satellite Node */}
          <circle
            r="2"
            fill="#ffffff"
            style={{
              filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.9))',
            }}
          />
          {/* Velocity Vector Line */}
          <line
            x1="0"
            y1="0"
            x2="-16"
            y2="5"
            stroke="rgba(52, 211, 153, 0.6)"
            strokeWidth="0.75"
          />
          {/* Telemetry Tag */}
          <text
            x="12"
            y="3"
            fill="rgba(255, 255, 255, 0.75)"
            fontSize="8"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
          >
            OBJ-25544 // LEO-A
          </text>
        </g>

        {/* Satellite 2 Marker & Identifier */}
        <g transform={`translate(${sat2_x}, ${sat2_y})`}>
          {/* Reticle */}
          <circle
            r="6"
            fill="none"
            stroke="rgba(56, 189, 248, 0.35)"
            strokeWidth="0.5"
          />
          {/* Node */}
          <circle
            r="1.8"
            fill="#e2e8f0"
            style={{
              filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))',
            }}
          />
          {/* Vector */}
          <line
            x1="0"
            y1="0"
            x2="14"
            y2="-10"
            stroke="rgba(56, 189, 248, 0.5)"
            strokeWidth="0.75"
          />
          {/* Telemetry Tag */}
          <text
            x="10"
            y="-6"
            fill="rgba(255, 255, 255, 0.65)"
            fontSize="8"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
          >
            OBJ-48210 // POLAR-B
          </text>
        </g>
      </svg>
    </motion.div>
  );
};
