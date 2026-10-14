export type PageId = 
  | 'home' 
  | 'about' 
  | 'programs' 
  | 'program-article'
  | 'transparency' 
  | 'donate' 
  | 'get-involved' 
  | 'contact';

export type Currency = 'GHS' | 'USD';

export interface CoreValue {
  id: number;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
}

export interface ProgramPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  impactMetric: string;
  iconName: string;
  image: string;
  keyInitiatives: string[];
  goals: string[];
}

export interface BeneficiaryStory {
  id: string;
  name: string;
  role: string;
  location: string;
  program: string;
  story: string;
  quote: string;
  image: string;
  outcome: string;
}

export interface DonationTier {
  id: string;
  amountGHS: number;
  amountUSD: number;
  label: string;
  impactDescription: string;
  popular?: boolean;
}

export interface FinancialMetric {
  category: string;
  percentage: number;
  amount: string;
  color: string;
  description: string;
}

export interface FoundationProgram {
  id: string;
  title: string;
  description: string;
  image: string;
  linkText?: string;
}

export interface ProgramPhase {
  phase: string;
  title: string;
  description: string;
}

export interface ProgramImpactStat {
  value: string;
  label: string;
  description: string;
}

export interface ProgramBeneficiaryQuote {
  quote: string;
  author: string;
  role: string;
  location?: string;
  image: string;
  outcome: string;
}

export interface ProgramGalleryItem {
  url: string;
  caption: string;
  credit?: string;
}

export interface ProgramVideoInfo {
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
  description: string;
}

export interface ProgramDonationTier {
  amountGHS: number;
  amountUSD: number;
  label: string;
  impact: string;
  popular?: boolean;
}

export interface ProgramArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  publishedDate: string;
  location: string;
  summary: string;
  coverImage: string;
  coverImageCaption: string;
  impactStats: ProgramImpactStat[];
  challenge: {
    headline: string;
    body: string[];
    statHighlight?: { number: string; text: string };
  };
  intervention: {
    title: string;
    description: string;
    phases: ProgramPhase[];
  };
  beneficiaryQuote: ProgramBeneficiaryQuote;
  video: ProgramVideoInfo;
  gallery: ProgramGalleryItem[];
  sdgBadges: { number: string; title: string; color: string }[];
  donationTiers: ProgramDonationTier[];
  relatedProgramIds: string[];
}

export interface UpcomingProjectEvent {
  id: string;
  title: string;
  category: string;
  targetDate: string;
  formattedDate: string;
  time: string;
  location: string;
  summary: string;
  image: string;
  status: 'Upcoming' | 'In Progress' | 'Featured';
  highlightMetric?: {
    value: string;
    label: string;
  };
  tags: string[];
}


