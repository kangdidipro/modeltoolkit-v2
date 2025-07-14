
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

export type BusinessModelCanvasModel = {
  keyPartners: ModelItem[];
  keyActivities: ModelItem[];
  keyResources: ModelItem[];
  valuePropositions: ModelItem[];
  customerRelationships: ModelItem[];
  channels: ModelItem[];
  customerSegments: ModelItem[];
  costStructure: ModelItem[];
  revenueStreams: ModelItem[];
};

export type MaslowsHierarchyModel = {
  physiological: ModelItem[];
  safety: ModelItem[];
  loveAndBelonging: ModelItem[];
  esteem: ModelItem[];
  selfActualization: ModelItem[];
};

export type JohariWindowModel = {
  open: ModelItem[];
  blind: ModelItem[];
  hidden: ModelItem[];
  unknown: ModelItem[];
};

export type BostonMatrixModel = {
  stars: ModelItem[];
  questionMarks: ModelItem[];
  cashCows: ModelItem[];
  dogs: ModelItem[];
};

export type PortersFiveForcesModel = {
  threatOfNewEntrants: ModelItem[];
  bargainingPowerOfBuyers: ModelItem[];
  bargainingPowerOfSuppliers: ModelItem[];
  threatOfSubstitutes: ModelItem[];
  rivalryAmongCompetitors: ModelItem[];
};

export type AidaModel = {
  awareness: ModelItem[];
  interest: ModelItem[];
  desire: ModelItem[];
  action: ModelItem[];
};

export type TuckmansStagesModel = {
  forming: ModelItem[];
  storming: ModelItem[];
  norming: ModelItem[];
  performing: ModelItem[];
  adjourning: ModelItem[];
};

export type Mckinsey7sFrameworkModel = {
  strategy: ModelItem[];
  structure: ModelItem[];
  systems: ModelItem[];
  sharedValues: ModelItem[];
  style: ModelItem[];
  staff: ModelItem[];
  skills: ModelItem[];
};

export type AdkarModel = {
  awareness: ModelItem[];
  desire: ModelItem[];
  knowledge: ModelItem[];
  ability: ModelItem[];
  reinforcement: ModelItem[];
};

export type GanttChartModel = {
  tasks: ModelItem[];
};

export type FishboneDiagramModel = {
  effect: string;
  people: ModelItem[];
  process: ModelItem[];
  equipment: ModelItem[];
  materials: ModelItem[];
  environment: ModelItem[];
  management: ModelItem[];
};

export type RaciRole = 'R' | 'A' | 'C' | 'I';

export type RaciAssignment = {
  personId: string;
  role: RaciRole;
}

export type RaciTask = {
  id: string;
  description: string;
  assignments: RaciAssignment[];
};

export type RaciPerson = {
  id: string;
  name: string;
}

export type RaciMatrixModel = {
  tasks: RaciTask[];
  people: RaciPerson[];
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

export const initialBusinessModelCanvasData: BusinessModelCanvasModel = {
  keyPartners: [{ id: 'kp1', content: 'Strategic Alliances' }],
  keyActivities: [{ id: 'ka1', content: 'Problem Solving' }],
  keyResources: [{ id: 'kr1', content: 'Intellectual Property' }],
  valuePropositions: [{ id: 'vp1', content: 'Newness' }],
  customerRelationships: [{ id: 'cr1', content: 'Personal Assistance' }],
  channels: [{ id: 'ch1', content: 'Sales Force' }],
  customerSegments: [{ id: 'cs1', content: 'Mass Market' }],
  costStructure: [{ id: 'cst1', content: 'Fixed Costs' }],
  revenueStreams: [{ id: 'rs1', content: 'Asset Sale' }],
};

export const initialMaslowsHierarchyData: MaslowsHierarchyModel = {
  physiological: [{ id: 'ph1', content: 'Breathing, food, water' }],
  safety: [{ id: 'sa1', content: 'Employment, resources, health' }],
  loveAndBelonging: [{ id: 'lb1', content: 'Friendship, family, intimacy' }],
  esteem: [{ id: 'es1', content: 'Self-esteem, confidence, achievement' }],
  selfActualization: [{ id: 'se1', content: 'Morality, creativity, problem solving' }],
};

export const initialJohariWindowData: JohariWindowModel = {
  open: [{ id: 'jw1', content: 'Friendly' }],
  blind: [{ id: 'jw2', content: 'Talks too much' }],
  hidden: [{ id: 'jw3', content: 'Fear of failure' }],
  unknown: [{ id: 'jw4', content: 'Hidden talents' }],
};

export const initialBostonMatrixData: BostonMatrixModel = {
  stars: [{ id: 'bm1', content: 'Product A' }],
  questionMarks: [{ id: 'bm2', content: 'New Venture B' }],
  cashCows: [{ id: 'bm3', content: 'Mature Product C' }],
  dogs: [{ id: 'bm4', content: 'Old Product D' }],
};

export const initialPortersFiveForcesData: PortersFiveForcesModel = {
  threatOfNewEntrants: [{ id: 'pff1', content: 'Economies of scale' }],
  bargainingPowerOfBuyers: [{ id: 'pff2', content: 'Buyer concentration' }],
  bargainingPowerOfSuppliers: [{ id: 'pff3', content: 'Supplier concentration' }],
  threatOfSubstitutes: [{ id: 'pff4', content: 'Switching costs' }],
  rivalryAmongCompetitors: [{ id: 'pff5', content: 'Industry growth rate' }],
};

export const initialAidaModelData: AidaModel = {
  awareness: [{ id: 'aida1', content: 'Run social media ad campaign' }],
  interest: [{ id: 'aida2', content: 'Create engaging blog post' }],
  desire: [{ id: 'aida3', content: 'Showcase customer testimonials' }],
  action: [{ id: 'aida4', content: 'Offer a limited-time discount' }],
};

export const initialTuckmansStagesData: TuckmansStagesModel = {
  forming: [{ id: 'ts1', content: 'Team members get to know each other.' }],
  storming: [{ id: 'ts2', content: 'Disagreements and conflicts arise.' }],
  norming: [{ id: 'ts3', content: 'The team establishes norms and roles.' }],
  performing: [{ id: 'ts4', content: 'The team works cohesively and effectively.' }],
  adjourning: [{ id: 'ts5', content: 'The project ends and the team disbands.' }],
};

export const initialMckinsey7sFrameworkData: Mckinsey7sFrameworkModel = {
  strategy: [{ id: 's1', content: 'Our competitive strategy' }],
  structure: [{ id: 's2', content: 'How we are organized' }],
  systems: [{ id: 's3', content: 'Key business systems' }],
  sharedValues: [{ id: 'sv1', content: 'Core values of the company' }],
  style: [{ id: 's4', content: 'Management style' }],
  staff: [{ id: 's5', content: 'Employee capabilities' }],
  skills: [{ id: 's6', content: 'Core competencies' }],
};

export const initialAdkarModelData: AdkarModel = {
  awareness: [{ id: 'adkar1', content: 'Communicate the business reasons for change.' }],
  desire: [{ id: 'adkar2', content: 'Address personal motivations for the change.' }],
  knowledge: [{ id: 'adkar3', content: 'Provide training and education on new skills.' }],
  ability: [{ id: 'adkar4', content: 'Offer coaching and practice sessions.' }],
  reinforcement: [{ id: 'adkar5', content: 'Recognize and reward successful change adoption.' }],
};

export const initialGanttChartData: GanttChartModel = {
  tasks: [{ id: 'gantt1', content: 'Define project scope' }],
};

export const initialFishboneDiagramData: FishboneDiagramModel = {
  effect: "Low customer satisfaction",
  people: [{ id: 'fb-p1', content: 'Lack of training' }],
  process: [{ id: 'fb-pr1', content: 'Complicated checkout process' }],
  equipment: [{ id: 'fb-e1', content: 'Outdated software' }],
  materials: [{ id: 'fb-m1', content: 'Poor quality a-d-s' }],
  environment: [{ id: 'fb-en1', content: 'Noisy call center' }],
  management: [{ id: 'fb-ma1', content: 'Unclear quality standards' }],
};

export const initialRaciMatrixData: RaciMatrixModel = {
  people: [
    { id: 'person-1', name: 'Alice' },
    { id: 'person-2', name: 'Bob' },
    { id: 'person-3', name: 'Charlie' },
  ],
  tasks: [
    { 
      id: 'task-1', 
      description: 'Develop Feature X', 
      assignments: [
        { personId: 'person-1', role: 'A' },
        { personId: 'person-2', role: 'R' },
        { personId: 'person-3', role: 'C' },
      ]
    },
    { 
      id: 'task-2', 
      description: 'Test Feature X', 
      assignments: [
        { personId: 'person-1', role: 'I' },
        { personId: 'person-3', role: 'R' },
      ]
    },
  ]
};


export const modelInfo: { [key: string]: { name: string; description: string } } = {
  'eisenhower-matrix': {
    name: 'Eisenhower Matrix',
    description: 'Prioritize tasks by urgency and importance to focus on what matters.',
  },
  swot: {
    name: 'SWOT Analysis',
    description: 'Identify strengths, weaknesses, opportunities, and threats to make strategic decisions.',
  },
  'pareto-principle': {
    name: 'Pareto Principle (80/20 Rule)',
    description: 'Identify the 20% of inputs that create 80% of the results.',
  },
  'business-model-canvas': {
    name: 'Business Model Canvas',
    description: 'Visualize and develop new or existing business models.',
  },
  'maslows-hierarchy': {
    name: 'Maslow\'s Hierarchy of Needs',
    description: 'Understand human motivation by fulfilling hierarchical needs.',
  },
  'johari-window': {
    name: 'Johari Window',
    description: 'A tool for understanding and improving self-awareness and mutual understanding between individuals within a group.',
  },
  'boston-matrix': {
    name: 'Boston Matrix',
    description: 'Analyze product portfolio based on market share and growth rate.',
  },
  'porters-five-forces': {
    name: 'Porter\'s Five Forces',
    description: 'Analyze the competitive environment of an industry.',
  },
  'aida-model': {
    name: 'AIDA Model',
    description: 'A model that describes the steps a customer goes through in the process of purchasing a product.',
  },
  'tuckmans-stages': {
    name: 'Tuckman\'s Stages',
    description: 'A model of group development.',
  },
  'mckinsey-7s-framework': {
    name: 'McKinsey 7S Framework',
    description: 'A model for organizational analysis and effectiveness.',
  },
  'adkar-model': {
    name: 'ADKAR Model',
    description: 'A goal-oriented change management model.',
  },
  'gantt-chart': {
    name: 'Gantt Chart',
    description: 'A type of bar chart that illustrates a project schedule.',
  },
  'fishbone-diagram': {
    name: 'Fishbone Diagram',
    description: 'A cause-and-effect diagram that helps to identify the root causes of a problem.',
  },
  'raci-matrix': {
    name: 'RACI Matrix',
    description: 'A responsibility assignment chart that maps out every task, milestone or key decision involved in completing a project.',
  },
  'scamper-model': {
    name: 'SCAMPER Model',
    description: 'A creative thinking technique that helps to generate ideas for new products and services.',
  },
  'diffusion-of-innovations': {
    name: 'Diffusion of Innovations',
    description: 'A theory that seeks to explain how, why, and at what rate new ideas and technology spread.',
  },
  'flow-model': {
    name: 'Flow Model',
    description: 'A model describing the mental state of being fully immersed in an activity.',
  },
  'change-management': {
    name: 'Change Management',
    description: 'Models for managing the process of change in an organization.',
  },
  'communication-model': {
    name: 'Communication Model',
    description: 'Models to explain the process of communication.',
  },
};

    