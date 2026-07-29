/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QRLocation {
  id: string;
  office_name: string;
  office_code: string;
  qr_token: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface SQDRatings {
  sqd0: number | 'N/A'; // Nasiyahan ako sa serbisyo...
  sqd1: number | 'N/A'; // Makatwiran ang oras...
  sqd2: number | 'N/A'; // Ang opisina ay sumusunod...
  sqd3: number | 'N/A'; // Ang mga hakbang sa pagproseso...
  sqd4: number | 'N/A'; // Mabilis at madali akong nakahanap ng impormasyon...
  sqd5: number | 'N/A'; // Nagbayad ako ng makatwirang halaga...
  sqd6: number | 'N/A'; // Pakiramdam ko ay patas ang opisina...
  sqd7: number | 'N/A'; // Magalang akong trato ng mga tauhan...
  sqd8: number | 'N/A'; // Nakuha ko ang kinakailangan ko...
}

export interface FeedbackRatings {
  promptness: number;  // 1-5
  courtesy: number;    // 1-5
  efficiency: number;  // 1-5
  cleanliness: number; // 1-5
}

export interface Feedback {
  id: string;
  rating: number; // Average computed from detailed ratings
  category: 'complaint' | 'suggestion' | 'compliment' | 'inquiry';
  comments: string;
  citizen_name?: string;
  citizen_contact?: string;
  created_at: string;
  
  // CSM Client Demographics
  client_type?: 'Mamamayan' | 'Negosyo' | 'Gobyerno' | string;
  gender?: 'Lalaki' | 'Babae' | string;
  age?: number | string;
  region?: string;
  service_type?: string;

  // Citizen's Charter (CC) Awareness
  cc1?: string; // 1-4
  cc2?: string; // 1-5
  cc3?: string; // 1-4

  // Service Quality Dimensions (SQD0 - SQD8)
  sqd_ratings?: SQDRatings;
  suggestions?: string;
  email?: string;

  // QR-related metadata
  qr_location_id?: string;
  office_source: string; // Pre-filled or manual office name
  officer_name?: string;
  device_info: string;
  ip_address: string;
  ratings: FeedbackRatings;
}

export interface OfficeAnalytics {
  officeName: string;
  count: number;
  percentageOfTotal: number; // e.g. 25.5 (%)
  averageRating: number;     // 1.00 - 5.00
  satisfiedCount: number;
  satisfiedPercentage: number;
  neutralCount: number;
  neutralPercentage: number;
  unsatisfiedCount: number;
  unsatisfiedPercentage: number;
  sqdMeans: {
    sqd0: number; // Overall Satisfaction
    sqd1: number; // Promptness / Time
    sqd2: number; // Reasonable Requirements
    sqd3: number; // Processing Steps
    sqd4: number; // Info Accessibility
    sqd5: number; // Value / Fees
    sqd6: number; // Fairness / Equal Treatment
    sqd7: number; // Staff Courtesy
    sqd8: number; // Outcome
  };
  byCategory: {
    compliment: number;
    suggestion: number;
    complaint: number;
    inquiry: number;
  };
}

export interface AnalyticsSummary {
  totalScans: number;
  totalSubmissions: number;
  conversionRate: number; // percentage
  averageRating: number;
  byOffice: {
    [office: string]: {
      count: number;
      percentageOfTotal?: number;
      averageRating: number;
      satisfiedCount?: number;
      satisfiedPercentage?: number;
      neutralCount?: number;
      neutralPercentage?: number;
      unsatisfiedCount?: number;
      unsatisfiedPercentage?: number;
      sqdMeans?: {
        sqd0: number;
        sqd1: number;
        sqd2: number;
        sqd3: number;
        sqd4: number;
        sqd5: number;
        sqd6: number;
        sqd7: number;
        sqd8: number;
      };
      byCategory?: {
        compliment: number;
        suggestion: number;
        complaint: number;
        inquiry: number;
      };
    }
  };
  byCategory: {
    complaint: number;
    suggestion: number;
    compliment: number;
    inquiry: number;
  };
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  sqdAverages?: {
    sqd0: number;
    sqd1: number;
    sqd2: number;
    sqd3: number;
    sqd4: number;
    sqd5: number;
    sqd6: number;
    sqd7: number;
    sqd8: number;
  };
  cc1Distribution?: {
    [key: string]: number;
  };
  hourlyTrends: {
    [hour: string]: number; // "08:00", etc.
  };
  trends: {
    date: string;
    count: number;
  }[];
}
