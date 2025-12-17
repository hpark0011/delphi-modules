export interface Question {
  id: string;
  question: string;
}

export interface Socials {
  x?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  website?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  github?: string | null;
  medium?: string | null;
  substack?: string | null;
  extras?: string[];
}

export interface Profile {
  name: string;
  headline: string | null;
  imageUrl: string | null;
  bio: string | null;
  questions: Question[];
  socials: Socials;
}

export interface Organization {
  iconUrl: string | null;
  name: string;
}

export interface CloneOptions {
  customWarning?: string | null;
}
