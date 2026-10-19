export interface Profile {
  fullName: string;
  headline: string | null;
  bio: string | null;
  avatarUrl: string | null;
  resumeUrl: string | null;
  email: string | null;
  location: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  emailUrl: string | null;
}

export interface Education {
  id: string;
  institution: string;
  degree: string | null;
  fieldOfStudy: string | null;
  gpa: number | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
}

export interface WorkExperience {
  id: string;
  companyName: string;
  companyLogoUrl: string | null;
  role: string;
  employmentType: string | null;
  location: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
}

export interface OrganizationExperience {
  id: string;
  organizationName: string;
  role: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
}

export interface Skill {
  id: string;
  name: string;
  category: 'HARD' | 'SOFT';
  proficiencyLevel: string | null;
  iconUrl: string | null;
}

export interface ProjectSkill {
  skill: Skill;
}

export interface ProjectImage {
  id: string;
  imageUrl: string;
  caption: string | null;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  fullDescription: string | null;
  thumbnailUrl: string | null;
  demoUrl: string | null;
  repositoryUrl: string | null;
  isFeatured: boolean;
  skills: ProjectSkill[];
  images: ProjectImage[];
}

export interface Certification {
  id: string;
  title: string;
  issuingOrganization: string;
  credentialUrl: string | null;
  imageUrl: string | null;
  issueDate: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface PortfolioData {
  profile: Profile | null;
  education: Education[];
  workExperience: WorkExperience[];
  projects: Project[];
  organizationExperience: OrganizationExperience[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
}