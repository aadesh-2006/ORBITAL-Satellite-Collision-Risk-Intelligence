export interface PresentationScreenMeta {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  timeEstimate: string;
}

export const PRESENTATION_SCREENS: PresentationScreenMeta[] = [
  {
    id: 1,
    code: '01',
    title: 'ORBITAL',
    subtitle: 'Deep Learning for Satellite Conjunction Risk Prediction',
    timeEstimate: '15–20 sec',
  },
  {
    id: 2,
    code: '02',
    title: 'THE PROBLEM',
    subtitle: 'Close Approach & Orbital Conjunction Risk in Low Earth Orbit',
    timeEstimate: '40–50 sec',
  },
  {
    id: 3,
    code: '03',
    title: 'CURRENT APPROACH',
    subtitle: 'Conjunction Data Messages & Sequential Baselines (LSTM / GRU)',
    timeEstimate: '40–50 sec',
  },
  {
    id: 4,
    code: '04',
    title: 'OUR IDEA',
    subtitle: 'Temporal Attention for Multi-Observation Encounter Evolution',
    timeEstimate: '50–60 sec',
  },
  {
    id: 5,
    code: '05',
    title: 'DATA & EXPERIMENT',
    subtitle: 'ESA Collision Avoidance Dataset & Controlled Benchmark Setup',
    timeEstimate: '45–50 sec',
  },
  {
    id: 6,
    code: '06',
    title: 'PROPOSED MODEL',
    subtitle: 'Temporal Transformer Architecture & End-to-End Pipeline',
    timeEstimate: '45–60 sec',
  },
  {
    id: 7,
    code: '07',
    title: 'EXPECTED OUTPUT',
    subtitle: 'Simulated Risk Intelligence & Operational Decision Support Demo',
    timeEstimate: '~60 sec',
  },
  {
    id: 8,
    code: '08',
    title: 'CONCLUSION',
    subtitle: 'From Historical Observations to Intelligent Collision-Risk Prediction',
    timeEstimate: '20–30 sec',
  },
];
