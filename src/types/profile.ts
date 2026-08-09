export type SkillGroup = {
  category: string;
  items: string[];
  note?: string;
};

export type Education = {
  name: string;
  period?: string;
  subject?: string;
  hours?: string;
  description: string;
  project?: {
    name: string;
    href?: string;
  };
};

export type Certification = {
  name: string;
};
