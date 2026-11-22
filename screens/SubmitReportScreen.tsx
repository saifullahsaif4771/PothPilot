import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import Field from '../components/Field';
import FilterChip from '../components/FilterChip';
import ScreenHeader from '../components/ScreenHeader';
import { CATEGORIES, PASSABILITY_INFO, PASSABILITY_ORDER, VEHICLES } from '../constants/labels';
import { colors, radius, spacing } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { HazardCategory, HazardReport, Passability, Severity, VehicleType } from '../types';

const SEVERITIES: { value: Severity; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

// Free spots on the mock map roads, used for new reports.
const NEW_SPOTS = [
  { x: 20, y: 70 }, { x: 78, y: 45 }, { x: 35, y: 25 }, { x: 65, y: 80 },
  { x: 50, y: 10 }, { x: 20, y: 15 }, { x: 78, y: 12 },
];

export default function SubmitReportScreen() {
  const { reports, addReport, user, goBack, navigate } = useApp();
  const [category, setCategory] = useState<HazardCategory>('waterlogging');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState<Severity>('medium');
  const [description, setDescription] = useState('');
  const [observedAt, setObservedAt] = useState('Just now');
  const [photo, setPhoto] = useState(false);
  const [passability, setPassability] = useState<Record<VehicleType, Passability>>({
    motorcycle: 'caution', car: 'caution', cng: 'caution', bicycle: 'caution', pedestrian: 'caution',
  });
  const [errors, setErrors] = useState<{ location?: string; description?: string }>({});
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = () => {
    const next: { location?: string; description?: string } = {};
    if (location.trim().length < 3) next.location = 'Please enter the location.';
    if (description.trim().length < 5) next.description = 'Please describe the hazard.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const spot = NEW_SPOTS[reports.length % NEW_SPOTS.length];
    const id = `user-${Date.now()}`;
    const report: HazardReport = {
      id, category, location: location.trim(), description: description.trim(), severity,
      observedAt: observedAt.trim() || 'Just now',
      status: 'unverified', passability, confirmations: 0, disputes: 0,
      reportedBy: user && !user.isGuest ? user.name : 'You',
      mapX: spot.x, mapY: spot.y,
    };
    addReport(report);
    setSubmittedId(id);
  };

  if (submittedId) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Report submitted" />
        <View style={styles.success}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle}>Thank you!</Text>
          <Text style={styles.successText}>
            Your report was added to the local mock list as “Unverified”. Others can now confirm or dispute it.
          </Text>
          <AppButton title="View my report" onPress={() => navigate('HazardDetails', { reportId: submittedId })} style={styles.fullWidth} />
          <AppButton title="Back to home" variant="outline" onPress={() => navigate('Home')} style={styles.fullWidth} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Report a hazard" subtitle="Help other travellers" onBack={goBack} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Hazard category</Text>
        <View style={styles.wrap}>
          {CATEGORIES.map((c) => (
            <FilterChip key={c.type} label={c.label} icon={c.icon} selected={category === c.type} onPress={() => setCategory(c.type)} />
          ))}
        </View>

        <Field label="Location" value={location} onChangeText={setLocation} placeholder="e.g. Road 5, Dhanmondi" autoCapitalize="words" error={errors.location} />

        <Text style={styles.label}>Severity</Text>
        <View style={[styles.wrap, { marginBottom: 14 }]}>
          {SEVERITIES.map((s) => (
            <FilterChip key={s.value} label={s.label} selected={severity === s.value} onPress={() => setSeverity(s.value)} />
          ))}
        </View>

        <Field label="Description" value={description} onChangeText={setDescription} placeholder="What did you see?" multiline autoCapitalize="sentences" error={errors.description} />
        <Field label="Observation time" value={observedAt} onChangeText={setObservedAt} placeholder="e.g. Just now, 30 min ago" autoCapitalize="sentences" />

        <Text style={styles.label}>Passability by vehicle</Text>
        <View style={styles.card}>
          {VEHICLES.map((v) => (
            <View key={v.type} style={styles.vehicleBlock}>
              <Text style={styles.vehicleLabel}>{v.icon}  {v.label}</Text>
              <View style={styles.wrap}>
                {PASSABILITY_ORDER.map((p) => (
                  <FilterChip
                    key={p}
                    small
                    label={PASSABILITY_INFO[p].short}
                    selected={passability[v.type] === p}
                    onPress={() => setPassability((prev) => ({ ...prev, [v.type]: p }))}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>

        <AppButton
          title={photo ? 'Photo attached (simulated)' : 'Add photo (simulated)'}
          icon="📷"
          variant="outline"
          onPress={() => setPhoto((p) => !p)}
          style={{ marginTop: spacing.lg }}
        />
        <Text style={styles.note}>No real photo or GPS is used in this demo.</Text>

        <AppButton title="Submit report" onPress={handleSubmit} style={{ marginTop: spacing.lg }} />
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  label: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: 6 },
  card: { backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.md },
  vehicleBlock: { marginBottom: spacing.sm },
  vehicleLabel: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 4 },
  note: { fontSize: 12, color: colors.muted, marginTop: 6, textAlign: 'center' },
  success: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.md },
  successIcon: { fontSize: 56 },
  successTitle: { fontSize: 22, fontWeight: '800', color: colors.text },
  successText: { fontSize: 14, color: colors.muted, textAlign: 'center', lineHeight: 21, marginBottom: spacing.md },
  fullWidth: { alignSelf: 'stretch' },
});
