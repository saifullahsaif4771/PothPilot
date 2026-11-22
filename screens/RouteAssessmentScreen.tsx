import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import Field from '../components/Field';
import ScreenHeader from '../components/ScreenHeader';
import { Badge } from '../components/StatusBadge';
import VehicleSelector from '../components/VehicleSelector';
import { RISK_INFO } from '../constants/labels';
import { colors, radius, spacing } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { buildRouteOptions } from '../utils/routes';

export default function RouteAssessmentScreen() {
  const { vehicle, setVehicle, reports } = useApp();
  const [start, setStart] = useState('Mirpur 10');
  const [destination, setDestination] = useState('Dhanmondi 27');
  const [error, setError] = useState('');
  const [assessing, setAssessing] = useState(false);
  const [assessed, setAssessed] = useState(false);

  // Fake "calculating" delay so the button feels real.
  useEffect(() => {
    if (!assessing) return;
    const timer = setTimeout(() => {
      setAssessing(false);
      setAssessed(true);
    }, 700);
    return () => clearTimeout(timer);
  }, [assessing]);

  // Recomputed whenever the vehicle or the reports change.
  const options = useMemo(() => (assessed ? buildRouteOptions(vehicle, reports) : []), [assessed, vehicle, reports]);

  const handleAssess = () => {
    if (start.trim().length < 2 || destination.trim().length < 2) {
      setError('Please enter both a starting point and a destination.');
      return;
    }
    setError('');
    setAssessed(false);
    setAssessing(true);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Route assessment" subtitle="Compare routes by reported hazards" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Field label="Starting location" value={start} onChangeText={setStart} placeholder="e.g. Mirpur 10" autoCapitalize="words" />
        <Field label="Destination" value={destination} onChangeText={setDestination} placeholder="e.g. Dhanmondi 27" autoCapitalize="words" />
        <Text style={styles.label}>Vehicle</Text>
        <VehicleSelector value={vehicle} onChange={setVehicle} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <AppButton title={assessing ? 'Assessing…' : 'Assess route'} icon="🧭" onPress={handleAssess} disabled={assessing} style={{ marginTop: spacing.lg }} />

        {assessed ? (
          <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
            <Text style={styles.heading}>{start.trim()} → {destination.trim()}</Text>
            <Text style={styles.mockNote}>Mock results for demonstration. Routes are predefined, not calculated from a real map.</Text>
            {options.map((o) => {
              const risk = RISK_INFO[o.risk];
              return (
                <View key={o.id} style={[styles.card, o.recommended && styles.recommended]}>
                  <View style={styles.cardTop}>
                    <Text style={styles.routeName}>{o.name}</Text>
                    {o.recommended ? <Badge label="Recommended" color="#FFFFFF" bg={colors.primary} /> : null}
                  </View>
                  <View style={styles.stats}>
                    <Stat label="Distance" value={`${o.distanceKm} km`} />
                    <Stat label="Est. time" value={`${o.minutes} min`} />
                    <Stat label="Hazards" value={String(o.hazardCount)} />
                  </View>
                  <View style={styles.riskRow}>
                    <Badge label={risk.label} color={risk.color} bg={risk.bg} />
                    <View style={[styles.riskDot, { backgroundColor: risk.color }]} />
                  </View>
                  <Text style={styles.summary}>{o.hazardSummary}</Text>
                  <Text style={styles.explain}>{o.explanation}</Text>
                </View>
              );
            })}
            <View style={styles.disclaimer}>
              <Text style={styles.disclaimerText}>
                Route assessments are based on community reports and do not guarantee road safety. Always
                check the road yourself.
              </Text>
            </View>
          </View>
        ) : null}
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  label: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6 },
  error: { color: colors.danger, fontSize: 12, marginTop: spacing.sm },
  heading: { fontSize: 16, fontWeight: '700', color: colors.text },
  mockNote: { fontSize: 12, color: colors.muted, marginTop: -6 },
  card: { backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, gap: spacing.sm },
  recommended: { borderColor: colors.primary, borderWidth: 2 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  routeName: { fontSize: 15, fontWeight: '700', color: colors.text, flex: 1 },
  stats: { flexDirection: 'row', backgroundColor: colors.background, borderRadius: radius.md, paddingVertical: spacing.sm },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 15, fontWeight: '700', color: colors.text },
  statLabel: { fontSize: 11, color: colors.muted, marginTop: 2 },
  riskRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  riskDot: { width: 8, height: 8, borderRadius: 4 },
  summary: { fontSize: 13, color: colors.text, fontWeight: '500' },
  explain: { fontSize: 13, color: colors.muted, lineHeight: 19 },
  disclaimer: { backgroundColor: colors.warningLight, borderRadius: radius.md, padding: spacing.md },
  disclaimerText: { color: colors.warning, fontSize: 12, lineHeight: 18, fontWeight: '500' },
});
