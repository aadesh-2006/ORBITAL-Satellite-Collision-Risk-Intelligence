import React from 'react';
import { SpaceAtmosphere } from '../../types/story';

interface OrbitalGridLayerProps {
  atmosphere?: SpaceAtmosphere;
  parallaxX?: number;
  parallaxY?: number;
}

export const OrbitalGridLayer: React.FC<OrbitalGridLayerProps> = ({
  atmosphere = 'deep-space',
  parallaxX = 0,
  parallaxY = 0,
}) => {
  // Atmosphere determines visibility of orbital grid
  const isOrbitalActive = atmosphere !== 'deep-space';
  const gridOpacity =
    atmosphere === 'deep-space' ? 0.03 :
    atmosphere === 'orbital' ? 0.12 :
    atmosphere === 'trajectories' ? 0.16 :
    atmosphere === 'analytical' ? 0.2 : 0.14;

  const transformStyle = {
    transform: `translate3d(${parallaxX * -8}px, ${parallaxY * -8}px, 0)`,
    transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
    opacity: isOrbitalActive ? gridOpacity : 0.04,
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={transformStyle}
      >
        <defs>
          <radialGradient id="orbitalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Central reference orbital ellipse (Low Earth Orbit / Geostationary projection) */}
        <ellipse
          cx="960"
          cy="540"
          rx="720"
          ry="260"
          fill="none"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
          strokeDasharray="4 8"
          transform="rotate(-15 960 540)"
        />

        <ellipse
          cx="960"
          cy="540"
          rx="540"
          ry="190"
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="0.8"
          transform="rotate(-15 960 540)"
        />

        <ellipse
          cx="960"
          cy="540"
          rx="380"
          ry="130"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="0.6"
          strokeDasharray="2 6"
          transform="rotate(-15 960 540)"
        />

        {/* Polar inclination axis */}
        <line
          x1="620"
          y1="80"
          x2="1300"
          y2="1000"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="0.8"
          strokeDasharray="3 9"
        />

        {/* Equatorial plane tangent */}
        <line
          x1="200"
          y1="540"
          x2="1720"
          y2="540"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="0.6"
          strokeDasharray="1 12"
        />

        {/* Subtle radial reference rings */}
        <circle
          cx="960"
          cy="540"
          r="480"
          fill="none"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="0.5"
        />
        <circle
          cx="960"
          cy="540"
          r="750"
          fill="none"
          stroke="rgba(255, 255, 255, 0.04)"
          strokeWidth="0.5"
          strokeDasharray="1 16"
        />
      </svg>
    </div>
  );
};
