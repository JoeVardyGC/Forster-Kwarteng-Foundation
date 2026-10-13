export type PageId = 
  | 'home' 
  | 'about' 
  | 'programs' 
  | 'impact' 
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

