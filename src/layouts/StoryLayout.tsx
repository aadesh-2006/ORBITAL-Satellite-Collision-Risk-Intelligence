import React from 'react';
import { SpaceBackground } from '../components/space/SpaceBackground';
import { TelemetryHUD } from '../components/ui/TelemetryHUD';
import { useStoryState } from '../hooks/useStoryState';

interface StoryLayoutProps {
  children: React.ReactNode;
  phase?: number;
  isTransitioning?: boolean;
}

export const StoryLayout: React.FC<StoryLayoutProps> = ({
  children,
  phase = 6,
  isTransitioning = false,
}) => {
  const { atmosphere } = useStoryState();

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Starfield, Parallax, Earth & Orbital System */}
      <SpaceBackground
        atmosphere={atmosphere}
        phase={phase}
        isTransitioning={isTransitioning}
      />

      {/* Persistent Aerospace Telemetry & HUD */}
      <TelemetryHUD />

      {/* Main Story Content Viewport */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1280px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
        }}
      >
        {children}
      </main>
    </div>
  );
};
