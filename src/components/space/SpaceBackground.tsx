import React from 'react';
import { SpaceAtmosphere } from '../../types/story';
import { useParallax } from '../../hooks/useParallax';
import { StarFieldCanvas } from './StarFieldCanvas';
import { OrbitalGridLayer } from './OrbitalGridLayer';
import { EarthVisual } from './EarthVisual';
import { OrbitalSatellitesLayer } from './OrbitalSatellitesLayer';
import { CosmicVignette } from './CosmicVignette';

interface SpaceBackgroundProps {
  atmosphere?: SpaceAtmosphere;
  showOrbitalGrid?: boolean;
  phase?: number;
  isTransitioning?: boolean;
  showEarth?: boolean;
}

export const SpaceBackground: React.FC<SpaceBackgroundProps> = ({
  atmosphere = 'deep-space',
  showOrbitalGrid = true,
  phase = 6,
  isTransitioning = false,
  showEarth = true,
}) => {
  const { x: parallaxX, y: parallaxY } = useParallax(0.04);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Dynamic Starfield Canvas with Depth & Parallax */}
      <StarFieldCanvas
        atmosphere={atmosphere}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
      />

      {/* Earth Visual Celestial Body */}
      {showEarth && (
        <EarthVisual
          phase={phase}
          parallaxX={parallaxX}
          parallaxY={parallaxY}
          isTransitioning={isTransitioning}
        />
      )}

      {/* Orbital Astrodynamic Vectors & Grid Plane */}
      {showOrbitalGrid && (
        <OrbitalGridLayer
          atmosphere={atmosphere}
          parallaxX={parallaxX}
          parallaxY={parallaxY}
        />
      )}

      {/* Active Satellite Trajectories & Objects */}
      <OrbitalSatellitesLayer
        phase={phase}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
      />

      {/* Edge contrast framing */}
      <CosmicVignette />
    </div>
  );
};
