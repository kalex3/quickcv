export interface WorkExp {
  company: string | null;
  title: string | null;
  date: string | null;
  desc: string | null;
}

export interface Details {
  name?: string | null;
  about?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  website?: string | null;
  github?: string | null;
  linkedin?: string | null;
  role?: string | null;
}

export interface Shown {
  email: boolean;
  phone: boolean;
  location: boolean;
  website: boolean;
  github: boolean;
  linkedin: boolean;
}

export type ContactKey = keyof Shown;

export type LinkKey = Exclude<ContactKey, "location">;

export type Clickable = Record<LinkKey, boolean>;

export interface Education {
  institution: string | null;
  date: string | null;
  qualification: string | null;
}

export interface Project {
  name: string | null;
  desc: string | null;
  link: string | null;
}

export interface Skill {
  name: string | null;
  icon: string | null;
}

export interface State {
  details: Details;
  shown: Shown;
  clickable: Clickable;
  workExp: WorkExp[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
}

export type ListsData = "workExp" | "education" | "projects" | "skills";
