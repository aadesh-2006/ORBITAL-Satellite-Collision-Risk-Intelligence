import React, { useState, useCallback } from 'react';
import { StoryProvider, useStoryState } from './hooks/useStoryState';
import { StoryLayout } from './layouts/StoryLayout';
import { LandingM1Section } from './sections/LandingM1Section';
import { ProblemM2Placeholder } from './sections/ProblemM2Placeholder';

const StoryAppContent: React.FC = () => {
  const { currentStageId, goToStage } = useStoryState();
  const [landingPhase, setLandingPhase] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleEnterMission = useCallback(() => {
    setIsTransitioning(true);
    // Smooth camera & scene dissolve transition into the next stage
    setTimeout(() => {
      goToStage('PROBLEM');
      setIsTransitioning(false);
    }, 1100);
  }, [goToStage]);

  return (
    <StoryLayout
      phase={currentStageId === 'LANDING' ? landingPhase : 6}
      isTransitioning={isTransitioning}
    >
      {currentStageId === 'LANDING' ? (
        <LandingM1Section
          onPhaseChange={setLandingPhase}
          isTransitioning={isTransitioning}
          onEnterMission={handleEnterMission}
        />
      ) : (
        <ProblemM2Placeholder />
      )}
    </StoryLayout>
  );
};

export const App: React.FC = () => {
  return (
    <StoryProvider initialStageId="LANDING">
      <StoryAppContent />
    </StoryProvider>
  );
};

export default App;
