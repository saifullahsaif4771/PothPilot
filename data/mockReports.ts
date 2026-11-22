import { HazardReport, Passability, VehicleType } from '../types';

// Short codes keep the table below readable.
const P: Passability = 'passable';
const C: Passability = 'caution';
const N: Passability = 'not_recommended';
const X: Passability = 'impassable';

// Order: motorcycle, car, cng, bicycle, pedestrian
function pass(m: Passability, c: Passability, t: Passability, b: Passability, w: Passability) {
  const result: Record<VehicleType, Passability> = {
    motorcycle: m,
    car: c,
    cng: t,
    bicycle: b,
    pedestrian: w,
  };
  return result;
}

// ALL DATA BELOW IS MOCK DATA. It does not describe real road conditions.
export const MOCK_REPORTS: HazardReport[] = [
  {
    id: 'r1', category: 'waterlogging', location: 'Mirpur 10 Roundabout, Mirpur',
    description: 'Knee-deep water after heavy rain. Drains are blocked and water is spreading across both lanes.',
    severity: 'high', observedAt: '2 hours ago', status: 'confirmed',
    passability: pass(N, X, X, X, C), confirmations: 14, disputes: 1, reportedBy: 'Rafi A.', mapX: 50, mapY: 25,
  },
  {
    id: 'r2', category: 'pothole', location: 'Road 27, Dhanmondi',
    description: 'Cluster of deep potholes near the Road 27 junction. Hard to see at night.',
    severity: 'medium', observedAt: 'Yesterday', status: 'confirmed',
    passability: pass(C, C, C, N, C), confirmations: 9, disputes: 0, reportedBy: 'Nusrat J.', mapX: 20, mapY: 55,
  },
  {
    id: 'r3', category: 'mud', location: 'Sector 10, Uttara',
    description: 'Construction trucks left thick mud across the road. Slippery for two-wheelers.',
    severity: 'medium', observedAt: '5 hours ago', status: 'unverified',
    passability: pass(N, C, N, X, C), confirmations: 1, disputes: 0, reportedBy: 'Tanvir H.', mapX: 78, mapY: 80,
  },
  {
    id: 'r4', category: 'damaged_road', location: 'Town Hall Road, Mohammadpur',
    description: 'Road surface has collapsed along the left side. Only a narrow strip is usable.',
    severity: 'high', observedAt: '1 day ago', status: 'confirmed',
    passability: pass(N, N, N, X, C), confirmations: 11, disputes: 2, reportedBy: 'Sabbir K.', mapX: 35, mapY: 80,
  },
  {
    id: 'r5', category: 'road_closure', location: 'Under Farmgate Flyover, Farmgate',
    description: 'Road closed for metro rail work. Vehicles are being diverted. Pedestrians can use the footpath.',
    severity: 'high', observedAt: '3 hours ago', status: 'confirmed',
    passability: pass(X, X, X, X, P), confirmations: 20, disputes: 0, reportedBy: 'Mahin R.', mapX: 78, mapY: 25,
  },
  {
    id: 'r6', category: 'waterlogging', location: 'Road 11, Banani',
    description: 'Water collecting near the lake side. Some users say it has already drained.',
    severity: 'medium', observedAt: '4 hours ago', status: 'disputed',
    passability: pass(C, N, N, N, C), confirmations: 3, disputes: 4, reportedBy: 'Farhana S.', mapX: 65, mapY: 55,
  },
  {
    id: 'r7', category: 'pothole', location: 'Section 2, Mirpur',
    description: 'Single pothole near the bus stop. Report is several days old.',
    severity: 'low', observedAt: '5 days ago', status: 'stale',
    passability: pass(P, C, C, C, P), confirmations: 2, disputes: 0, reportedBy: 'Imran Z.', mapX: 20, mapY: 38,
  },
  {
    id: 'r8', category: 'mud', location: 'Beribadh Road, Mohammadpur',
    description: 'Muddy stretch beside the embankment after yesterday\u2019s rain.',
    severity: 'medium', observedAt: 'Yesterday', status: 'unverified',
    passability: pass(N, C, N, X, C), confirmations: 0, disputes: 0, reportedBy: 'Lamia T.', mapX: 50, mapY: 70,
  },
  {
    id: 'r9', category: 'damaged_road', location: 'Rajlakshmi, Uttara',
    description: 'Cracked and uneven asphalt. Slow down but vehicles can pass.',
    severity: 'low', observedAt: '2 days ago', status: 'confirmed',
    passability: pass(C, P, C, C, P), confirmations: 6, disputes: 0, reportedBy: 'Shuvo D.', mapX: 78, mapY: 62,
  },
  {
    id: 'r10', category: 'waterlogging', location: 'Satmasjid Road, Dhanmondi',
    description: 'Water level rising near the lake junction. Several vehicles stalled.',
    severity: 'high', observedAt: '1 hour ago', status: 'confirmed',
    passability: pass(N, X, X, X, C), confirmations: 12, disputes: 1, reportedBy: 'Arif M.', mapX: 35, mapY: 55,
  },
  {
    id: 'r11', category: 'road_closure', location: 'Kemal Ataturk Avenue, Banani',
    description: 'One lane closed for utility work. Heavy vehicles cannot get through.',
    severity: 'medium', observedAt: '6 hours ago', status: 'unverified',
    passability: pass(C, X, X, C, P), confirmations: 1, disputes: 0, reportedBy: 'Joya P.', mapX: 50, mapY: 40,
  },
];
