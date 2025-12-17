export interface Project {
  id: string;
  title: string;
  description: string;
  liveLink?: string;
  repoLink: string;
  techStack: string[];
  imageUrl: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  link: string;
  date?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}