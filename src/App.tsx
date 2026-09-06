import React from 'react';
import { StoryProvider } from './hooks/useStoryState';
import { StoryLayout } from './layouts/StoryLayout';
import { FoundationM0Section } from './sections/FoundationM0Section';

export const App: React.FC = () => {
  return (
    <StoryProvider initialStageId="LANDING">
      <StoryLayout>
        <FoundationM0Section />
      </StoryLayout>
    </StoryProvider>
  );
};

export default App;
