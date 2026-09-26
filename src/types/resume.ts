export interface PersonalInfo {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github?: string;
  portfolio?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
  bullets: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights?: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  link?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  bullets: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
}

export interface CustomSection {
  id: string;
  sectionTitle: string;
  items: CustomSectionItem[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experiences: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  customSections?: CustomSection[];
}

export type TemplateId = 
  | 'harvard'        // Classic Academic / Ivy League Single-Column ATS
  | 'modern-tech'    // Tech / Engineering with accent badges & sleek layout
  | 'executive-slate'// High-level management, subtle gray borders & clean hierarchy
  | 'nordic-compact' // Compact, high information density for 1-page efficiency
  | 'corporate-pro'  // Navy/indigo accented corporate header & structured dividers
  | 'creative-serif' // Sophisticated editorial typography for design / marketing / product

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  tagline: string;
  atsScoreRating: string;
  fontFamily: 'sans' | 'serif' | 'mono';
  previewColor: string;
  description: string;
}

export interface JobConnector {
  platform: 'naukri' | 'indeed' | 'linkedin' | 'custom';
  jobTitle: string;
  company: string;
  location: string;
  experienceLevel: string;
  jobUrl?: string;
  rawDescription: string;
  extractedKeywords: string[];
}

export interface AtsAuditResult {
  score: number;
  matchGrade: 'Excellent' | 'Good' | 'Needs Improvement' | 'Critical Issues';
  summaryFeedback: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  scoreBreakdown?: {
    keywords: number;
    skillsCoverage: number;
    experienceAlignment: number;
    impactMetrics: number;
  };
  suggestedSkillsToAdd?: string[];
  metricsCheck: {
    hasQuantifiableResults: boolean;
    quantifiableCount: number;
    feedback: string;
  };
  formattingCompliance: {
    singleColumnStandard: boolean;
    standardHeadings: boolean;
    noUnparseableGraphics: boolean;
    readabilityScore: number; // 0-100
  };
  recommendedImprovements: Array<{
    section: string;
    suggestion: string;
    reason: string;
    sampleFix?: string;
  }>;
  tailoredSummary?: string;
  suggestedBulletEnhancements?: Array<{
    experienceId: string;
    originalBullet: string;
    improvedBullet: string;
    keywordsAdded: string[];
    reason: string;
  }>;
}

export interface CoverLetterData {
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress?: string;
  date: string;
  salutation: string;
  subject: string;
  openingParagraph: string;
  bodyParagraphs: string[];
  closingParagraph: string;
  signoff: string;
  candidateName: string;
  candidateTitle: string;
  candidateContact: string;
}
