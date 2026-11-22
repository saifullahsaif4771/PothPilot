# PothPilot – Midterm Feature List & Acceptance Criteria

All data is mock data. No backend.

| # | Implemented feature | Screen | What the user can do | Testable acceptance criteria |
|---|---------------------|--------|----------------------|------------------------------|
| 1 | Welcome & entry options | Welcome | Choose Sign in, Create account, or Continue as guest | Three buttons are visible; each opens Login, Register, or Home (as guest) |
| 2 | Simulated sign in | Login | Enter email and password, log in, go to Register, or continue as guest | Invalid email or password under 6 characters shows an error; valid input opens Home |
| 3 | Simulated registration | Register | Fill name, email, password, confirm password | Empty name, bad email, short password, or mismatched passwords each show an error; valid input opens Home |
| 4 | Mock map with hazards | Home | See roads, junctions, labels, current-location dot, and coloured hazard markers | Map is not blank; 11 markers are visible; marker colour matches passability for the selected vehicle |
| 5 | Report preview from map | Home | Tap a marker to preview a report | Tapping a marker highlights it and shows a card plus "View details" button |
| 6 | Hazard filters | Home, Reports | Filter by category | Selecting "Pothole" shows only pothole markers/cards; "All" restores everything |
| 7 | Vehicle selection | Home, Reports, Route | Switch between Motorcycle, Car, CNG, Bicycle, Walking | Selected vehicle is highlighted; the passability badge on each card and the marker colours change immediately |
| 8 | Hazard reports list | Reports | Scroll all reports, filter, open a report | Each card shows category, location, severity, observed time, verification status, passability for the selected vehicle; tapping opens details |
| 9 | Hazard details | Hazard details | Read full information | Shows description, severity, time, status, passability for all 5 vehicles, and confirm/dispute counts |
| 10 | Confirm / Dispute / Mark as cleared | Hazard details | Vote on or clear a report | Confirm raises the confirmed count by 1 and shows feedback; Dispute raises the disputed count; repeating the same vote shows "already"; Mark as cleared sets status to Cleared |
| 11 | Submit a report | Submit report | Choose category, location, severity, description, time, per-vehicle passability, optional simulated photo | Empty location or description shows an error; valid submission shows a success screen |
| 12 | New report appears in lists | Submit report → Reports / Home | Return home after submitting | The new report appears at the top of Reports with status "Unverified" and as a new map marker |
| 13 | Route assessment | Route | Enter start, destination, vehicle; tap Assess route | Empty fields show an error; otherwise 3 route options appear with distance, time, hazard count, hazard summary, risk level, and an explanation for the recommended route |
| 14 | Route results react to vehicle | Route | Change vehicle after assessing | Risk levels, times, and the recommended route update |
| 15 | Safety disclaimer | Route | Read the notice | Text states that assessments are based on community reports and do not guarantee road safety |
| 16 | Profile | Profile | See guest/signed-in status, My reports, Settings, About, Logout | Guest shows "Guest" badge; submitted reports appear under My reports; Logout returns to Welcome |
| 17 | Navigation | All | Move between screens | Bottom tabs switch between Map, Reports, Route, Profile; "Report hazard" button opens Submit; back arrow and Android back button work |

## Modules

- **Authentication (simulated):** Welcome, Login, Register
- **Map & discovery:** Home, MockMap, filters
- **Reports:** Reports list, Hazard details, Submit report
- **Vehicle awareness:** VehicleSelector, passability data
- **Route assessment:** Route screen, `utils/routes.ts`
- **Profile:** Profile screen

## Technology used

- `useState`: forms, filters, selected marker, feedback messages
- `useEffect`: Android back button listener (App.tsx), fake "assessing" delay (Route screen)
- `useMemo`: route options recomputed when vehicle or reports change
- Context API: shared state (`AppContext`)
- Props: all components in `components/`
- TypeScript interfaces: `types/index.ts`
