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

export type EisenhowerMatrixModel = {
  do: ModelItem[];
  schedule: ModelItem[];
  delegate: ModelItem[];
  delete: ModelItem[];
};

export type ParetoPrincipleModel = {
  vitalFew: ModelItem[];
  usefulMany: ModelItem[];
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

export const initialEisenhowerMatrixData: EisenhowerMatrixModel = {
  do: [
    { id: 'd1', content: 'Finish project report' },
  ],
  schedule: [
    { id: 's1', content: 'Plan next quarter goals' },
  ],
  delegate: [
    { id: 'dl1', content: 'Book flights for conference' },
  ],
  delete: [
    { id: 'dt1', content: 'Scroll social media' },
  ],
};

export const initialParetoPrincipleData: ParetoPrincipleModel = {
  vitalFew: [
    { id: 'vf1', content: 'Top 20% of customers generating 80% of revenue.' },
  ],
  usefulMany: [
    { id: 'um1', content: 'Remaining 80% of customers.' },
  ],
};


export const modelInfo: { [key: string]: { name: string; description: string } } = {
  swot: {
    name: 'SWOT Analysis',
    description: 'Identify strengths, weaknesses, opportunities, and threats to make strategic decisions.',
  },
  'eisenhower-matrix': {
    name: 'Eisenhower Matrix',
    description: 'Prioritize tasks by urgency and importance to focus on what matters.',
  },
  'pareto-principle': {
    name: 'Pareto Principle (80/20 Rule)',
    description: 'Identify the 20% of inputs that create 80% of the results.',
  },
  'business-model-canvas': {
    name: 'Business Model Canvas',
    description: 'Visualize and develop new or existing business models.',
  },
};
