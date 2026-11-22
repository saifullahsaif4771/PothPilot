import { HazardReport, Passability, RiskLevel, RouteOption, VehicleType } from '../types';
import { PASSABILITY_INFO, getVehicle } from '../constants/labels';

// Predefined mock routes. Each lists the mock reports that lie along it.
interface BaseRoute {
  id: string;
  name: string;
  distanceKm: number;
  baseMinutes: number; // time for a motorcycle with no hazards
  hazardIds: string[];
}

const BASE_ROUTES: BaseRoute[] = [
  { id: 'route-a', name: 'Via Mirpur Road', distanceKm: 7.8, baseMinutes: 26, hazardIds: ['r1', 'r7', 'r2'] },
  { id: 'route-b', name: 'Via Farmgate & Satmasjid Road', distanceKm: 9.6, baseMinutes: 32, hazardIds: ['r5', 'r10'] },
  { id: 'route-c', name: 'Via Mohammadpur & Beribadh', distanceKm: 12.5, baseMinutes: 41, hazardIds: ['r4', 'r8'] },
];

const SPEED_FACTOR: Record<VehicleType, number> = {
  motorcycle: 1, car: 1.1, cng: 1.3, bicycle: 2, pedestrian: 5,
};
const DELAY_MIN: Record<Passability, number> = {
  passable: 0, caution: 4, not_recommended: 10, impassable: 20,
};
const WEIGHT: Record<Passability, number> = {
  passable: 0, caution: 1, not_recommended: 3, impassable: 5,
};
const RISK_RANK: Record<RiskLevel, number> = { low: 0, medium: 1, high: 2 };

export function buildRouteOptions(vehicle: VehicleType, reports: HazardReport[]): RouteOption[] {
  const vehicleLabel = getVehicle(vehicle).label;

  const options = BASE_ROUTES.map((base) => {
    // Cleared reports no longer count.
    const active = base.hazardIds
      .map((id) => reports.find((r) => r.id === id))
      .filter((r): r is HazardReport => r !== undefined && r.status !== 'cleared');

    let score = 0;
    let delay = 0;
    let hasImpassable = false;
    const counts: Record<Passability, number> = { passable: 0, caution: 0, not_recommended: 0, impassable: 0 };

    active.forEach((r) => {
      const p = r.passability[vehicle];
      score += WEIGHT[p];
      delay += DELAY_MIN[p];
      counts[p] += 1;
      if (p === 'impassable') hasImpassable = true;
    });

    const risk: RiskLevel = hasImpassable || score >= 6 ? 'high' : score >= 3 ? 'medium' : 'low';
    const parts: string[] = [];
    (['impassable', 'not_recommended', 'caution'] as Passability[]).forEach((p) => {
      if (counts[p] > 0) parts.push(`${counts[p]} ${PASSABILITY_INFO[p].label.toLowerCase()}`);
    });

    return {
      id: base.id,
      name: base.name,
      distanceKm: base.distanceKm,
      minutes: Math.round(base.baseMinutes * SPEED_FACTOR[vehicle] + delay),
      hazardCount: active.length,
      hazardSummary: parts.length > 0 ? parts.join(', ') : 'No problem reports for your vehicle',
      risk,
      recommended: false,
      explanation: '',
    };
  });

  // Lowest risk first, then shortest time.
  options.sort((a, b) => RISK_RANK[a.risk] - RISK_RANK[b.risk] || a.minutes - b.minutes);

  return options.map((o, index) => {
    let explanation: string;
    if (index === 0) {
      explanation = `Recommended: lowest reported risk for ${vehicleLabel} among these options, based on ${o.hazardCount} active community report(s).`;
    } else if (o.risk === 'high') {
      explanation = `Higher risk: reports along this route are impassable or add up to a high risk for ${vehicleLabel}.`;
    } else {
      explanation = `Usable, but another route has a better risk-and-time balance for ${vehicleLabel}.`;
    }
    return { ...o, recommended: index === 0, explanation };
  });
}
