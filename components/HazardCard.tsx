import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SEVERITY_INFO, getCategory, getVehicle } from '../constants/labels';
import { colors, radius, spacing } from '../constants/theme';
import { HazardReport, VehicleType } from '../types';
import StatusBadge, { Badge, PassabilityBadge } from './StatusBadge';

interface Props {
  report: HazardReport;
  vehicle: VehicleType;
  onPress?: () => void;
}

export default function HazardCard({ report, vehicle, onPress }: Props) {
  const category = getCategory(report.category);
  const v = getVehicle(vehicle);
  const severity = SEVERITY_INFO[report.severity];

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}>
      <View style={styles.topRow}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>{category.icon}</Text>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.category}>{category.label}</Text>
          <Text style={styles.location} numberOfLines={1}>{report.location}</Text>
        </View>
        <StatusBadge status={report.status} />
      </View>

      <View style={styles.metaRow}>
        <Badge label={severity.label} color={severity.color} bg={severity.bg} />
        <Text style={styles.time}>Observed {report.observedAt}</Text>
      </View>

      <View style={styles.passRow}>
        <Text style={styles.passLabel}>{v.icon} For {v.label}:</Text>
        <PassabilityBadge value={report.passability[vehicle]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconBox: {
    width: 40, height: 40, borderRadius: radius.md,
    backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center',
  },
  icon: { fontSize: 20 },
  titleBox: { flex: 1 },
  category: { fontSize: 15, fontWeight: '700', color: colors.text },
  location: { fontSize: 13, color: colors.muted, marginTop: 1 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  time: { fontSize: 12, color: colors.muted },
  passRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 2 },
  passLabel: { fontSize: 13, color: colors.text, fontWeight: '500' },
});
