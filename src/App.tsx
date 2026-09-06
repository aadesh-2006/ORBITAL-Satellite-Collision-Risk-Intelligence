import React, { useState, useCallback } from 'react';
import { StoryProvider, useStoryState } from './hooks/useStoryState';
import { StoryLayout } from './layouts/StoryLayout';
import { LandingM1Section } from './sections/LandingM1Section';
import { ProblemM2Section } from './sections/ProblemM2Section';
import { CurrentSolutionM3Section } from './sections/CurrentSolutionM3Section';
import { OurThinkingM4Section } from './sections/OurThinkingM4Section';
import { OurPlanM5Section } from './sections/OurPlanM5Section';
import { OurApproachM6Section } from './sections/OurApproachM6Section';
import { ModelM7Section } from './sections/ModelM7Section';
import { PredictionM8Section } from './sections/PredictionM8Section';
import { FinalSystemM9Section } from './sections/FinalSystemM9Section';
import { ClosingM10Section } from './sections/ClosingM10Section';
import { PresentationMode } from './presentation/PresentationMode';

interface StoryAppContentProps {
  onReturnToPresentation: () => void;
}

const StoryAppContent: React.FC<StoryAppContentProps> = ({ onReturnToPresentation }) => {
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
      case 'MODEL':
        return <ModelM7Section />;
      case 'PREDICTION':
        return <PredictionM8Section />;
      case 'FINAL_SYSTEM':
        return <FinalSystemM9Section />;
      case 'CLOSING':
      default:
        return <ClosingM10Section />;
    }
  };

  return (
    <>
      {/* Floating button to switch back to Presentation Mode */}
      <button
        onClick={onReturnToPresentation}
        style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          zIndex: 100,
          background: 'rgba(52, 211, 153, 0.12)',
          border: '1px solid rgba(52, 211, 153, 0.4)',
          color: '#34d399',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontFamily: 'monospace',
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(52, 211, 153, 0.22)';
          e.currentTarget.style.borderColor = '#34d399';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(52, 211, 153, 0.12)';
          e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.4)';
        }}
      >
        <span>◀</span>
        <span>KEYNOTE PRESENTATION MODE</span>
      </button>

      <StoryLayout
        phase={currentStageId === 'LANDING' ? landingPhase : 6}
        isTransitioning={isTransitioning}
      >
        {renderSection()}
      </StoryLayout>
    </>
  );
};

export const App: React.FC = () => {
  // Presentation Mode is default for high-impact 5-7 min college presentation
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(true);

  if (isPresentationMode) {
    return (
      <PresentationMode
        onToggleDetailedMode={() => setIsPresentationMode(false)}
      />
    );
  }

  return (
    <StoryProvider initialStageId="LANDING">
      <StoryAppContent onReturnToPresentation={() => setIsPresentationMode(true)} />
    </StoryProvider>
  );
};

export default App;
