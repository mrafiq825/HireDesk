import type { ReactNode } from "react";
import type {
  BatchAnalysisResult,
  RoleRecommendation,
  CompareResumesResponse,
} from "./index";

// ============================================
// Auth & Layout Components
// ============================================

export interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export interface RedirectIfAuthenticatedProps {
  children: ReactNode;
  redirectTo?: string;
}

export interface NavbarProps {
  [key: string]: any;
}

export interface ResumeDetailsWrapperProps {
  resumeData?: any;
  isLoading?: boolean;
}

export interface PasswordStrengthProps {
  password?: string;
  [key: string]: any;
}

export interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ToastProps {
  toast?: any;
  message?: string;
  type?: "success" | "error" | "warning" | "info";
  onClose: (id: string) => void;
}

// ============================================
// Analysis Components
// ============================================

export interface SkillsProps {
  skills: string[];
}

export interface InsightMetric {
  label: string;
  value: number;
  color?: string;
  description?: string;
}

export interface ResumeScoreData {
  overall_score: number;
  technical_score: number;
  experience_score: number;
  education_score: number;
  communication_score: number;
  reasoning?: string;
  strengths?: string[];
  weaknesses?: string[];
  improvement_suggestions?: string[];
}

export interface PersonalityTraits {
  [key: string]: number;
}

export interface PersonalityData {
  traits?: PersonalityTraits | Record<string, number>;
  work_style?: string;
  leadership_potential?: number;
  team_player_score?: number;
  analysis?: string;
  [key: string]: any;
}

export interface CareerPathData {
  current_level: string;
  next_roles?: string[];
  timeline?: string;
  required_development?: string[];
  [key: string]: any;
}

export interface AdvancedAnalyticsProps {
  resumeScore?: any | null;
  personalityInsights?: any | null;
  careerPath?: any | null;
}

export interface AnalysisData {
  resumeData?: {
    personalInfo?: any;
    workExperience?: any[];
    education?: any[];
    skills?: string[];
    highlights?: string[];
  };
  roleRecommendations?: any[];
  questions?: any[];
  resumeScore?: any;
  personalityInsights?: any;
  careerPath?: any;
  bestFitRole?: string;
  fitStatus?: string;
  reasoning?: string;
}

export interface ResumeAnalysisDisplayProps {
  analysisData: AnalysisData;
  isLoading?: boolean;
}

export interface ResumeAnalysis {
  resumeData?: any;
  roleRecommendations?: any[];
  questions?: any[];
  resumeScore?: any;
  personalityInsights?: any;
  careerPath?: any;
  fitStatus?: string;
  reasoning?: string;
  bestFitRole?: string;
}

export interface AnalysisOverviewProps {
  analysis: ResumeAnalysis;
}

export interface RoleRecommendationsProps {
  recommendations: RoleRecommendation[];
}

// ============================================
// Resume Components
// ============================================

export interface IconProps {
  className?: string;
  [key: string]: any;
}

export interface ErrorData {
  message: string;
  type: string;
  category: string;
}

export interface ResumeUploadProps {
  onFileUpload?: (file: File) => void;
  isLoading?: boolean;
  onError?: (error: ErrorData | string) => void;
  isPremium?: boolean;
  onResumeUploaded?: () => void;
}

export interface ResumeDataInterface {
  personalInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
  workExperience?: Array<{
    title?: string;
    company?: string;
    duration?: string;
    description?: string[];
  }>;
  education?: Array<{
    degree?: string;
    institution?: string;
    year?: string;
    details?: string[];
  }>;
  skills?: string[];
  highlights?: string[];
}

// ============================================
// Batch & Comparison Components
// ============================================

export interface BatchResultCardProps {
  result: BatchAnalysisResult;
  index: number;
}

export interface ComparisonResultsDisplayProps {
  results: CompareResumesResponse;
  isLoading?: boolean;
}

// ============================================
// Toast & Modal Components
// ============================================

export interface ToastAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export interface ToastComponentProps {
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  show?: boolean;
  onClose: () => void;
  duration?: number;
  action?: ToastAction;
  actions?: ToastAction[];
}

export interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface RateLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  filesUploaded?: number;
  uploadLimit?: number;
}

export interface FeatureLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  currentCount: number;
  limit: number;
}
