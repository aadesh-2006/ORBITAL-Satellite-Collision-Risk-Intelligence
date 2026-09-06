import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PRESENTATION_SCREENS } from './presentationData';
import { PresentationHUD } from './PresentationHUD';
import { PresentationScreen } from './PresentationScreen';
import { SpaceBackground } from '../components/space/SpaceBackground';
import { SpaceAtmosphere } from '../types/story';
import {
  Screen1Title,
  Screen2Problem,
  Screen3CurrentApproach,
  Screen4OurIdea,
  Screen5DataExperiment,
  Screen6ProposedModel,
  Screen7SimulatedDemo,
  Screen8Conclusion,
} from './PresentationScreens';

interface PresentationModeProps {
  onToggleDetailedMode?: () => void;
}

const SCREEN_ATMOSPHERES: Record<number, SpaceAtmosphere> = {
  1: 'deep-space',
  2: 'risk',
  3: 'analytical',
  4: 'attention',
  5: 'analytical',
  6: 'attention',
  7: 'risk',
  8: 'orbital',
};

export const PresentationMode: React.FC<PresentationModeProps> = ({
  onToggleDetailedMode,
}) => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const totalScreens = PRESENTATION_SCREENS.length;

  const handleNextScreen = useCallback(() => {
    setCurrentScreen((prev) => (prev < totalScreens ? prev + 1 : 1));
  }, [totalScreens]);

  const handlePrevScreen = useCallback(() => {
    setCurrentScreen((prev) => (prev > 1 ? prev - 1 : totalScreens));
  }, [totalScreens]);

  const handleGoToScreen = useCallback((screenId: number) => {
    if (screenId >= 1 && screenId <= totalScreens) {
      setCurrentScreen(screenId);
    }
  }, [totalScreens]);

  // Global Presentation Keyboard Navigation (1 keypress = 1 major screen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if inside an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleNextScreen();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevScreen();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentScreen(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentScreen(totalScreens);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextScreen, handlePrevScreen, totalScreens]);

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 1:
        return <Screen1Title />;
      case 2:
        return <Screen2Problem />;
      case 3:
        return <Screen3CurrentApproach />;
      case 4:
        return <Screen4OurIdea />;
      case 5:
        return <Screen5DataExperiment />;
      case 6:
        return <Screen6ProposedModel />;
      case 7:
        return <Screen7SimulatedDemo />;
      case 8:
      default:
        return <Screen8Conclusion />;
    }
  };

  const currentAtmosphere = SCREEN_ATMOSPHERES[currentScreen] || 'deep-space';

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
        atmosphere={currentAtmosphere}
        phase={currentScreen === 1 ? 1 : 6}
        isTransitioning={false}
      />

      {/* Persistent Clean Presentation HUD */}
      <PresentationHUD
        currentScreen={currentScreen}
        totalScreens={totalScreens}
        onGoToScreen={handleGoToScreen}
        onToggleDetailedMode={onToggleDetailedMode}
      />

      {/* Main Screen Content Viewport */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1360px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '64px 32px 64px 32px',
          boxSizing: 'border-box',
          overflowY: 'auto',
        }}
      >
        <AnimatePresence mode="wait">
          <PresentationScreen key={currentScreen}>
            {renderCurrentScreen()}
          </PresentationScreen>
        </AnimatePresence>
      </main>
    </div>
  );
};
