import React, { useState, useCallback } from 'react';
import { StoryProvider, useStoryState } from './hooks/useStoryState';
import { StoryLayout } from './layouts/StoryLayout';
import { LandingM1Section } from './sections/LandingM1Section';
import { ProblemM2Section } from './sections/ProblemM2Section';
import { CurrentSolutionM3Section } from './sections/CurrentSolutionM3Section';
import { OurThinkingM4Section } from './sections/OurThinkingM4Section';
import { OurPlanM5Section } from './sections/OurPlanM5Section';
import { OurApproachM6Section } from './sections/OurApproachM6Section';
import { ModelM7Placeholder } from './sections/ModelM7Placeholder';

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

  const renderSection = () => {
    switch (currentStageId) {
      case 'LANDING':
        return (
          <LandingM1Section
            onPhaseChange={setLandingPhase}
            isTransitioning={isTransitioning}
            onEnterMission={handleEnterMission}
          />
        );
      case 'PROBLEM':
        return <ProblemM2Section />;
      case 'CONJUNCTION':
      case 'CURRENT_SOLUTION':
        return <CurrentSolutionM3Section />;
      case 'OUR_THINKING':
        return <OurThinkingM4Section />;
      case 'OUR_PLAN':
        return <OurPlanM5Section />;
      case 'OUR_APPROACH':
      case 'DATA':
        return <OurApproachM6Section />;
      default:
        return <ModelM7Placeholder />;
    }
  };

  return (
    <StoryLayout
      phase={currentStageId === 'LANDING' ? landingPhase : 6}
      isTransitioning={isTransitioning}
    >
      {renderSection()}
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
