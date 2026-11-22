import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PASSABILITY_INFO, STATUS_INFO } from '../constants/labels';
import { radius } from '../constants/theme';
import { Passability, VerificationStatus } from '../types';

// Generic coloured pill. The two components below reuse it.
export function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

export default function StatusBadge({ status }: { status: VerificationStatus }) {
  const info = STATUS_INFO[status];
  return <Badge label={info.label} color={info.color} bg={info.bg} />;
}

export function PassabilityBadge({ value }: { value: Passability }) {
  const info = PASSABILITY_INFO[value];
  return <Badge label={info.label} color={info.color} bg={info.bg} />;
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: radius.pill, alignSelf: 'flex-start' },
  text: { fontSize: 12, fontWeight: '600' },
});
