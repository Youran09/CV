export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string[];
}

export interface Skill {
  id: string;
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Resume {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  template: string;
  color: string;
}

export type TemplateType = 'modern' | 'classic' | 'minimal' | 'professional' | 'creative';