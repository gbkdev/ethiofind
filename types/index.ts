export type VerificationStatus =
  | 'researched'
  | 'community_submitted'
  | 'needs_review'
  | 'broken';

export type WebsiteStatus = 'active' | 'inactive' | 'broken' | 'archived';

export type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'changes_requested';

export interface ResearchSource {
  /** Human-readable name of the source used to confirm this listing */
  name: string;
  /** URL of the source, when available */
  url?: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  description?: string;
  /** Computed at read time from the website table — never hand-maintained */
  count?: number;
}

export interface Website {
  slug: string;
  name: string;
  url: string;
  category: string;
  organization: string;
  description: string;
  longDescription?: string;
  tags: string[];
  region: string;
  city: string;
  status: WebsiteStatus;
  verification: VerificationStatus;
  featured: boolean;
  /** Internal research/source record — required for every researched listing */
  source: ResearchSource;
  socialLinks?: Record<string, string>;
  contactEmail?: string;
  contactPhone?: string;
}

export interface Review {
  id: string;
  websiteSlug: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: string;
}

export interface Submission {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  region?: string;
  city?: string;
  organization?: string;
  tags?: string;
  submittedBy?: string;
  status: SubmissionStatus;
  createdAt: string;
}

export interface Report {
  id: string;
  websiteSlug: string;
  reason: string;
  details?: string;
  status: 'open' | 'reviewing' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  region?: string;
  researchedOnly?: boolean;
  sort?: 'relevance' | 'popular' | 'newest';
}
