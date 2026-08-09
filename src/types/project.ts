export type ProjectStatus = "정리 중" | "예정";

export type ProjectDetailSection = {
  id: string;
  title: string;
  content: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectMetric = {
  index?: string;
  label: string;
  value: string;
  unit?: string;
  description?: string;
};

export type ProjectFeature = {
  label: string;
  reason: string;
};

export type ProjectTechnology = {
  name: string;
  reason?: string;
  responsibility?: string;
};

export type ProjectFlow = {
  label: string;
  steps: string[];
};

export type ProjectArchitecture = {
  flows: ProjectFlow[];
  orchestration: {
    description: string;
    sequence: string[];
  };
};

export type ProjectDataLayer = {
  name: "Bronze" | "Silver" | "Gold";
  responsibilities: string[];
};

export type ProjectDataModeling = {
  facts: string[];
  dimensions: string[];
  serving: string[];
};

export type ProjectOperation = {
  index?: string;
  label: string;
  title?: string;
  description: string;
  flows?: ProjectFlow[];
};

export type ProjectTroubleshooting = {
  index?: string;
  title: string;
  problem: string;
  cause: string;
  decision?: string;
  solution: string;
  result: string;
  image?: ProjectMedia;
  comparison?: ProjectMediaComparison;
};

export type ProjectMedia = {
  src: string;
  alt: string;
  label: string;
  description?: string;
};

export type ProjectMediaComparison = {
  before: ProjectMedia;
  after: ProjectMedia;
};

export type ProjectDecision = {
  title: string;
  contextLabel: string;
  context: string;
  decision: string;
  effect: string;
};

export type ProjectValidation = {
  index: string;
  label: string;
  question: string;
  value: string;
  unit?: string;
  description: string;
  limitation?: string;
  image?: ProjectMedia;
  comparison?: ProjectMediaComparison;
  indexTest?: {
    test: string;
    before: string;
    after: string;
    beforePlan: string;
    afterPlan: string;
    indexName: string;
  };
};

export type ProjectLimitation = {
  index: string;
  title: string;
  limitation: string;
  next: string;
};

export type ProjectCaseStudy = {
  problem: string[];
  goal: string;
  goalItems: { label: string; description: string }[];
  dataFlowDescription: string[];
  architectureImage: ProjectMedia;
  decisions: ProjectDecision[];
  operationsImages: ProjectMedia[];
  validations: ProjectValidation[];
  limitations: ProjectLimitation[];
  conclusion: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  featuredSummary?: string;
  status: ProjectStatus;
  featured: boolean;
  featuredOrder?: number;
  subtitle?: string;
  projectType?: string;
  scope?: string;
  scopeDescription?: string;
  features?: ProjectFeature[];
  metrics?: ProjectMetric[];
  coreTechnologies?: string[];
  technologies?: ProjectTechnology[];
  architecture?: ProjectArchitecture;
  dataLayers?: ProjectDataLayer[];
  dataModeling?: ProjectDataModeling;
  operations?: ProjectOperation[];
  troubleshooting?: ProjectTroubleshooting[];
  caseStudy?: ProjectCaseStudy;
  details: ProjectDetailSection[];
  relatedLinks: ProjectLink[];
};
