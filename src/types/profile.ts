export type Skill = {
  name: string;
  badgeUrl: string;
};

export type SkillGroup = {
  category: string;
  items: Skill[];
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
  issuer: string;
  accent: "blue" | "amber" | "cyan";
};
