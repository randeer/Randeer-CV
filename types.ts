export interface Experience {
  date: string;
  title: string;
  company: string;
  location: string;
  points: string[];
}

export interface Project {
    title: string;
    points: string[];
    technologies: string[];
}

export type Certification = string;