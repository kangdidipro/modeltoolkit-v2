export type ModelItem = {
  id: string;
  content: string;
};

export type SwotModel = {
  strengths: ModelItem[];
  weaknesses: ModelItem[];
  opportunities: ModelItem[];
  threats: ModelItem[];
};

export const initialSwotData: SwotModel = {
  strengths: [
    { id: 's1', content: 'Strong brand recognition' },
    { id: 's2', content: 'Experienced team' },
  ],
  weaknesses: [
    { id: 'w1', content: 'High operating costs' },
  ],
  opportunities: [
    { id: 'o1', content: 'Emerging markets' },
    { id: 'o2', content: 'New technology adoption' },
  ],
  threats: [
    { id: 't1', content: 'Intense competition' },
  ],
};

export const modelInfo: { [key: string]: { name: string; description: string } } = {
  swot: {
    name: 'SWOT Analysis',
    description: 'Identify strengths, weaknesses, opportunities, and threats to make strategic decisions.',
  },
  'business-model-canvas': {
    name: 'Business Model Canvas',
    description: 'Visualize and develop new or existing business models.',
  },
  'eisenhower-matrix': {
    name: 'Eisenhower Matrix',
    description: 'Prioritize tasks by urgency and importance.',
  },
};
