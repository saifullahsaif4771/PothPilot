import React, { createContext, useContext, useState } from 'react';
import { MOCK_REPORTS } from '../data/mockReports';
import { HazardReport, Route, ScreenName, User, VehicleType, VoteType } from '../types';

const TAB_SCREENS: ScreenName[] = ['Home', 'Reports', 'RouteAssess', 'Profile'];

interface AppContextValue {
  // auth (simulated)
  user: User | null;
  signIn: (user: User) => void;
  logout: () => void;
  // selected vehicle
  vehicle: VehicleType;
  setVehicle: (v: VehicleType) => void;
  // reports
  reports: HazardReport[];
  addReport: (report: HazardReport) => void;
  vote: (id: string, type: VoteType) => string;
  markCleared: (id: string) => string;
  // navigation
  route: Route;
  canGoBack: boolean;
  navigate: (name: ScreenName, params?: Route['params']) => void;
  goBack: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [vehicle, setVehicle] = useState<VehicleType>('motorcycle');
  const [reports, setReports] = useState<HazardReport[]>(MOCK_REPORTS);
  const [stack, setStack] = useState<Route[]>([{ name: 'Welcome' }]);

  const route = stack[stack.length - 1];

  // Tab screens replace the stack; other screens are pushed on top.
  const navigate = (name: ScreenName, params?: Route['params']) => {
    if (TAB_SCREENS.includes(name)) {
      setStack([{ name }]);
    } else {
      setStack((prev) => [...prev, { name, params }]);
    }
  };

  const goBack = () => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const signIn = (u: User) => {
    setUser(u);
    setStack([{ name: 'Home' }]);
  };

  const logout = () => {
    setUser(null);
    setStack([{ name: 'Welcome' }]);
  };

  const addReport = (report: HazardReport) => {
    setReports((prev) => [report, ...prev]);
  };

  const updateReport = (id: string, changes: Partial<HazardReport>) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, ...changes } : r)));
  };

  // Returns a feedback message to show in the UI.
  const vote = (id: string, type: VoteType): string => {
    const r = reports.find((x) => x.id === id);
    if (!r) return 'Report not found.';
    if (r.myVote === type) {
      return type === 'confirm' ? 'You already confirmed this report.' : 'You already disputed this report.';
    }
    let confirmations = r.confirmations;
    let disputes = r.disputes;
    if (r.myVote === 'confirm') confirmations -= 1;
    if (r.myVote === 'dispute') disputes -= 1;
    if (type === 'confirm') confirmations += 1;
    else disputes += 1;

    const status =
      confirmations > disputes ? 'confirmed' : disputes > confirmations ? 'disputed' : r.status;
    updateReport(id, { confirmations, disputes, status, myVote: type });
    return type === 'confirm'
      ? 'Thanks! You confirmed this report.'
      : 'Thanks! You disputed this report.';
  };

  const markCleared = (id: string): string => {
    const r = reports.find((x) => x.id === id);
    if (!r) return 'Report not found.';
    if (r.status === 'cleared') return 'This report is already marked as cleared.';
    updateReport(id, { status: 'cleared' });
    return 'Marked as cleared. Thanks for keeping the map up to date.';
  };

  const value: AppContextValue = {
    user, signIn, logout, vehicle, setVehicle, reports, addReport, vote, markCleared,
    route, canGoBack: stack.length > 1, navigate, goBack,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
