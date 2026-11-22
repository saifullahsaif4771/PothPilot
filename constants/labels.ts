import {
  HazardCategory,
  Passability,
  RiskLevel,
  Severity,
  VehicleType,
  VerificationStatus,
} from '../types';

export const VEHICLES: { type: VehicleType; label: string; icon: string }[] = [
  { type: 'motorcycle', label: 'Motorcycle', icon: '🏍️' },
  { type: 'car', label: 'Car', icon: '🚗' },
  { type: 'cng', label: 'CNG', icon: '🛺' },
  { type: 'bicycle', label: 'Bicycle', icon: '🚲' },
  { type: 'pedestrian', label: 'Walking', icon: '🚶' },
];

export function getVehicle(type: VehicleType) {
  return VEHICLES.find((v) => v.type === type) ?? VEHICLES[0];
}

export const CATEGORIES: { type: HazardCategory; label: string; icon: string }[] = [
  { type: 'waterlogging', label: 'Waterlogging', icon: '🌊' },
  { type: 'pothole', label: 'Pothole', icon: '🕳️' },
  { type: 'mud', label: 'Mud', icon: '🟤' },
  { type: 'damaged_road', label: 'Damaged road', icon: '🚧' },
  { type: 'road_closure', label: 'Road closure', icon: '⛔' },
];

export function getCategory(type: HazardCategory) {
  return CATEGORIES.find((c) => c.type === type) ?? CATEGORIES[0];
}

export const PASSABILITY_ORDER: Passability[] = [
  'passable',
  'caution',
  'not_recommended',
  'impassable',
];

export const PASSABILITY_INFO: Record<
  Passability,
  { label: string; short: string; color: string; bg: string }
> = {
  passable: { label: 'Passable', short: 'OK', color: '#15803D', bg: '#DCFCE7' },
  caution: { label: 'Passable with caution', short: 'Caution', color: '#B45309', bg: '#FEF3C7' },
  not_recommended: { label: 'Not recommended', short: 'Avoid', color: '#C2410C', bg: '#FFEDD5' },
  impassable: { label: 'Impassable', short: 'Blocked', color: '#B91C1C', bg: '#FEE2E2' },
};

export const STATUS_INFO: Record<VerificationStatus, { label: string; color: string; bg: string }> = {
  unverified: { label: 'Unverified', color: '#4B5563', bg: '#F3F4F6' },
  confirmed: { label: 'Confirmed', color: '#1D4ED8', bg: '#DBEAFE' },
  disputed: { label: 'Disputed', color: '#B91C1C', bg: '#FEE2E2' },
  stale: { label: 'Stale', color: '#92400E', bg: '#FEF3C7' },
  cleared: { label: 'Cleared', color: '#0B6E5C', bg: '#E3F3EF' },
};

export const SEVERITY_INFO: Record<Severity, { label: string; color: string; bg: string }> = {
  low: { label: 'Low severity', color: '#15803D', bg: '#DCFCE7' },
  medium: { label: 'Medium severity', color: '#B45309', bg: '#FEF3C7' },
  high: { label: 'High severity', color: '#B91C1C', bg: '#FEE2E2' },
};

export const RISK_INFO: Record<RiskLevel, { label: string; color: string; bg: string }> = {
  low: { label: 'Low risk', color: '#15803D', bg: '#DCFCE7' },
  medium: { label: 'Medium risk', color: '#B45309', bg: '#FEF3C7' },
  high: { label: 'High risk', color: '#B91C1C', bg: '#FEE2E2' },
};
