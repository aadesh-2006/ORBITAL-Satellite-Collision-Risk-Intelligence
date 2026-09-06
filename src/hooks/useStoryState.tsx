import React, { createContext, useContext, useState, useCallback } from 'react';
import { StoryStageConfig, StoryStageId, SpaceAtmosphere } from '../types/story';
import { STORY_STAGES, STAGE_MAP } from '../data/storyStages';

export interface StoryContextType {
  currentStageId: StoryStageId;
  currentStage: StoryStageConfig;
  stageIndex: number;
  totalStages: number;
  atmosphere: SpaceAtmosphere;
  progress: number;
  goToStage: (id: StoryStageId) => void;
  nextStage: () => void;
  prevStage: () => void;
  isFirstStage: boolean;
  isLastStage: boolean;
}

const StoryContext = createContext<StoryContextType | null>(null);

export const StoryProvider: React.FC<{
  children: React.ReactNode;
  initialStageId?: StoryStageId;
}> = ({ children, initialStageId = 'LANDING' }) => {
  const [currentStageId, setCurrentStageId] = useState<StoryStageId>(initialStageId);

  const stageIndex = STORY_STAGES.findIndex((s) => s.id === currentStageId);
  const currentStage = STAGE_MAP[currentStageId] || STORY_STAGES[0];
  const totalStages = STORY_STAGES.length;
  const progress = totalStages > 1 ? stageIndex / (totalStages - 1) : 0;

  const goToStage = useCallback((id: StoryStageId) => {
    if (STAGE_MAP[id]) {
      setCurrentStageId(id);
    }
  }, []);

  const nextStage = useCallback(() => {
    if (stageIndex < totalStages - 1) {
      setCurrentStageId(STORY_STAGES[stageIndex + 1].id);
    }
  }, [stageIndex, totalStages]);

  const prevStage = useCallback(() => {
    if (stageIndex > 0) {
      setCurrentStageId(STORY_STAGES[stageIndex - 1].id);
    }
  }, [stageIndex]);

  return (
    <StoryContext.Provider
      value={{
        currentStageId,
        currentStage,
        stageIndex,
        totalStages,
        atmosphere: currentStage.atmosphere,
        progress,
        goToStage,
        nextStage,
        prevStage,
        isFirstStage: stageIndex === 0,
        isLastStage: stageIndex === totalStages - 1,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export function useStoryState(): StoryContextType {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStoryState must be used within a StoryProvider');
  }
  return context;
}
