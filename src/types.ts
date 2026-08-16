export type Experience = {
  title: string;
  date: string;
  range: string;
  company: string;
  link: string;
  skills: string[];
  content: string;
};

export type ProjectLink = {
  name: string;
  url: string;
};

export type Project = {
  slug: string;
  name: string;
  date: string;
  range: string;
  skills: string[];
  tags: string[];
  images: string[];
  shortDescription: string;
  links: ProjectLink[];
  content: string;
  archived?: boolean;
};

export type SocialLinks = {
  name: string;
  link: string;
};
