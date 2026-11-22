import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import ScreenHeader from '../components/ScreenHeader';
import StatusBadge, { Badge, PassabilityBadge } from '../components/StatusBadge';
import { SEVERITY_INFO, VEHICLES, getCategory, getVehicle } from '../constants/labels';
import { colors, radius, spacing } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function HazardDetailsScreen({ reportId }: { reportId: string }) {
  const { reports, vehicle, vote, markCleared, goBack } = useApp();
  const [feedback, setFeedback] = useState('');

  const report = reports.find((r) => r.id === reportId);
  if (!report) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Report" onBack={goBack} />
        <Text style={styles.missing}>This report could not be found.</Text>
      </View>
    );
  }

  const category = getCategory(report.category);
  const severity = SEVERITY_INFO[report.severity];
  const v = getVehicle(vehicle);
  const total = report.confirmations + report.disputes;

  return (
    <View style={styles.container}>
      <ScreenHeader title={`${category.icon} ${category.label}`} subtitle={report.location} onBack={goBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.badges}>
          <StatusBadge status={report.status} />
          <Badge label={severity.label} color={severity.color} bg={severity.bg} />
        </View>

        <View style={styles.card}>
          <Row label="Location" value={report.location} />
          <Row label="Observed" value={report.observedAt} />
          <Row label="Reported by" value={report.reportedBy} />
          <Text style={styles.cardTitle}>Description</Text>
          <Text style={styles.body}>{report.description}</Text>
        </View>

        <View style={[styles.card, styles.highlight]}>
          <Text style={styles.cardTitle}>For your vehicle: {v.icon} {v.label}</Text>
          <PassabilityBadge value={report.passability[vehicle]} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Passability by vehicle</Text>
          {VEHICLES.map((item) => (
            <View key={item.type} style={[styles.vRow, item.type === vehicle && styles.vRowActive]}>
              <Text style={styles.vLabel}>{item.icon}  {item.label}</Text>
              <PassabilityBadge value={report.passability[item.type]} />
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Community confirmation</Text>
          <Text style={styles.body}>
            👍 {report.confirmations} confirmed   ·   👎 {report.disputes} disputed
          </Text>
          <View style={styles.bar}>
            {total === 0 ? (
              <View style={{ flex: 1, backgroundColor: colors.border }} />
            ) : (
              <>
                <View style={{ flex: report.confirmations, backgroundColor: colors.success }} />
                <View style={{ flex: report.disputes, backgroundColor: colors.danger }} />
              </>
            )}
          </View>
          {total === 0 ? <Text style={styles.small}>No community votes yet.</Text> : null}
        </View>

        {feedback ? (
          <View style={styles.feedback}>
            <Text style={styles.feedbackText}>{feedback}</Text>
          </View>
        ) : null}

        <View style={styles.actions}>
          <AppButton title="Confirm" icon="👍" onPress={() => setFeedback(vote(report.id, 'confirm'))} />
          <AppButton title="Dispute" icon="👎" variant="danger" onPress={() => setFeedback(vote(report.id, 'dispute'))} />
          <AppButton title="Mark as cleared" icon="✅" variant="secondary" onPress={() => setFeedback(markCleared(report.id))} />
        </View>
        <Text style={styles.small}>Demo only: changes stay on this device until the app restarts.</Text>
      </ScrollView>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md },
  missing: { padding: spacing.xl, textAlign: 'center', color: colors.muted },
  badges: { flexDirection: 'row', gap: spacing.sm },
  card: { backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, gap: spacing.sm },
  highlight: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  cardTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  body: { fontSize: 14, color: colors.text, lineHeight: 21 },
  small: { fontSize: 12, color: colors.muted },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  rowLabel: { fontSize: 13, color: colors.muted },
  rowValue: { fontSize: 13, color: colors.text, fontWeight: '600', flexShrink: 1, textAlign: 'right' },
  vRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 8, borderRadius: radius.sm },
  vRowActive: { backgroundColor: colors.primaryLight },
  vLabel: { fontSize: 14, color: colors.text },
  bar: { flexDirection: 'row', height: 8, borderRadius: 4, overflow: 'hidden' },
  feedback: { backgroundColor: colors.successLight, borderRadius: radius.md, padding: spacing.md },
  feedbackText: { color: colors.success, fontWeight: '600', fontSize: 13 },
  actions: { gap: spacing.sm },
});
