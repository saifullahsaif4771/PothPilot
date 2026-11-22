export type VehicleType = 'motorcycle' | 'car' | 'cng' | 'bicycle' | 'pedestrian';
export type Passability = 'passable' | 'caution' | 'not_recommended' | 'impassable';
export type HazardCategory = 'waterlogging' | 'pothole' | 'mud' | 'damaged_road' | 'road_closure';
export type VerificationStatus = 'unverified' | 'confirmed' | 'disputed' | 'stale' | 'cleared';
export type Severity = 'low' | 'medium' | 'high';
export type RiskLevel = 'low' | 'medium' | 'high';
export type VoteType = 'confirm' | 'dispute';

export interface HazardReport {
  id: string;
  category: HazardCategory;
  location: string;
  description: string;
  severity: Severity;
  observedAt: string; // free text such as "2 hours ago"
  status: VerificationStatus;
  passability: Record<VehicleType, Passability>;
  confirmations: number;
  disputes: number;
  reportedBy: string;
  mapX: number; // position on the mock map, 0-100 (%)
  mapY: number;
  myVote?: VoteType;
}

export interface RouteOption {
  id: string;
  name: string;
  distanceKm: number;
  minutes: number;
  hazardCount: number;
  hazardSummary: string;
  risk: RiskLevel;
  recommended: boolean;
  explanation: string;
}

export interface User {
  name: string;
  email: string;
  isGuest: boolean;
}

export type TabName = 'Home' | 'Reports' | 'RouteAssess' | 'Profile';
export type ScreenName =
  | TabName
  | 'Welcome'
  | 'Login'
  | 'Register'
  | 'HazardDetails'
  | 'SubmitReport';

export interface Route {
  name: ScreenName;
  params?: { reportId?: string };
}
