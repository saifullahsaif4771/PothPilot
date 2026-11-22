import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import FilterChip from '../components/FilterChip';
import HazardCard from '../components/HazardCard';
import MockMap from '../components/MockMap';
import ScreenHeader from '../components/ScreenHeader';
import VehicleSelector from '../components/VehicleSelector';
import { CATEGORIES } from '../constants/labels';
import { colors, radius, spacing } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { HazardCategory } from '../types';

export default function HomeScreen() {
  const { vehicle, setVehicle, reports, navigate } = useApp();
  const [filter, setFilter] = useState<HazardCategory | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visible = filter === 'all' ? reports : reports.filter((r) => r.category === filter);
  const selected = visible.find((r) => r.id === selectedId) ?? null;
  const nearby = visible.slice(0, 3);

  return (
    <View style={styles.container}>
      <ScreenHeader title="PothPilot" subtitle="Dhaka · mock map with demo reports" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Demo data only. These are not live road conditions.</Text>
        </View>

        <Text style={styles.section}>Travelling by</Text>
        <VehicleSelector value={vehicle} onChange={setVehicle} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          <FilterChip label="All" selected={filter === 'all'} onPress={() => setFilter('all')} />
          {CATEGORIES.map((c) => (
            <FilterChip key={c.type} label={c.label} icon={c.icon} selected={filter === c.type} onPress={() => setFilter(c.type)} />
          ))}
        </ScrollView>

        <MockMap reports={visible} vehicle={vehicle} selectedId={selected?.id ?? null} onSelect={setSelectedId} />

        <Text style={styles.section}>Selected report</Text>
        {selected ? (
          <View style={{ gap: spacing.sm }}>
            <HazardCard report={selected} vehicle={vehicle} />
            <Text style={styles.desc} numberOfLines={2}>{selected.description}</Text>
            <AppButton title="View details" variant="secondary" onPress={() => navigate('HazardDetails', { reportId: selected.id })} />
          </View>
        ) : (
          <Text style={styles.hint}>Tap a marker on the map to preview a report.</Text>
        )}

        <View style={styles.actionRow}>
          <AppButton title="Assess a route" variant="outline" icon="🧭" style={{ flex: 1 }} onPress={() => navigate('RouteAssess')} />
        </View>

        <View style={styles.sectionRow}>
          <Text style={styles.section}>Nearby reports</Text>
          <Pressable onPress={() => navigate('Reports')}>
            <Text style={styles.link}>See all</Text>
          </Pressable>
        </View>
        <View style={{ gap: spacing.sm }}>
          {nearby.length === 0 ? <Text style={styles.hint}>No reports in this category.</Text> : null}
          {nearby.map((r) => (
            <HazardCard key={r.id} report={r} vehicle={vehicle} onPress={() => navigate('HazardDetails', { reportId: r.id })} />
          ))}
        </View>
        <View style={{ height: 70 }} />
      </ScrollView>

      <Pressable style={styles.fab} onPress={() => navigate('SubmitReport')}>
        <Text style={styles.fabText}>＋  Report hazard</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md },
  banner: { backgroundColor: colors.warningLight, borderRadius: radius.md, padding: spacing.sm },
  bannerText: { color: colors.warning, fontSize: 12, fontWeight: '600', textAlign: 'center' },
  section: { fontSize: 15, fontWeight: '700', color: colors.text },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  link: { color: colors.primary, fontWeight: '600', fontSize: 13 },
  chips: { gap: spacing.sm, paddingVertical: 2 },
  hint: { color: colors.muted, fontSize: 13 },
  desc: { color: colors.muted, fontSize: 13, lineHeight: 19 },
  actionRow: { flexDirection: 'row', gap: spacing.sm },
  fab: {
    position: 'absolute', right: spacing.lg, bottom: spacing.lg,
    backgroundColor: colors.primary, paddingVertical: 13, paddingHorizontal: 20,
    borderRadius: radius.pill, elevation: 4,
  },
  fabText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});
