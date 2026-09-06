/**
 * Story Stages and Navigation Types
 */

export type StoryStageId =
  | 'LANDING'
  | 'PROBLEM'
  | 'CONJUNCTION'
  | 'CURRENT_SOLUTION'
  | 'OUR_THINKING'
  | 'OUR_PLAN'
  | 'OUR_APPROACH'
  | 'DATA'
  | 'MODEL'
  | 'PREDICTION'
  | 'FINAL_SYSTEM'
  | 'CLOSING';

export type SpaceAtmosphere =
  | 'deep-space'      // Sparse, pristine deep cosmos
  | 'orbital'         // Subtle orbital coordinate grid and plane indicators
  | 'trajectories'    // Orbital paths and velocity vectors
  | 'analytical'      // Data density, matrix projections
  | 'attention'       // Neural attention, focus arcs
  | 'risk';           // Conjunction probability fields

export interface StoryStageConfig {
  id: StoryStageId;
  order: number;
  label: string;
  code: string;
  title: string;
  subtitle: string;
  atmosphere: SpaceAtmosphere;
  orbitalAltitudeKm: number;
  inclinationDeg: number;
}

export interface TelemetryState {
  epochTime: string;
  activeSatellitesTracked: number;
  conjunctionsAnalyzed: number;
  simulatedTimeStep: string;
  fps: number;
}
