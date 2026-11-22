import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import FilterChip from '../components/FilterChip';
import HazardCard from '../components/HazardCard';
import ScreenHeader from '../components/ScreenHeader';
import VehicleSelector from '../components/VehicleSelector';
import { CATEGORIES } from '../constants/labels';
import { colors, spacing } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { HazardCategory } from '../types';

export default function ReportsScreen() {
  const { reports, vehicle, setVehicle, navigate } = useApp();
  const [filter, setFilter] = useState<HazardCategory | 'all'>('all');

  const data = filter === 'all' ? reports : reports.filter((r) => r.category === filter);

  const header = (
    <View style={styles.listHeader}>
      <VehicleSelector value={vehicle} onChange={setVehicle} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        <FilterChip label="All" selected={filter === 'all'} onPress={() => setFilter('all')} />
        {CATEGORIES.map((c) => (
          <FilterChip key={c.type} label={c.label} icon={c.icon} selected={filter === c.type} onPress={() => setFilter(c.type)} />
        ))}
      </ScrollView>
      <Text style={styles.count}>{data.length} report(s) · demo data</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Reports"
        subtitle="Community road reports"
        right={<AppButton title="＋ Report" small onPress={() => navigate('SubmitReport')} />}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={header}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListEmptyComponent={<Text style={styles.empty}>No reports in this category yet.</Text>}
        renderItem={({ item }) => (
          <HazardCard report={item} vehicle={vehicle} onPress={() => navigate('HazardDetails', { reportId: item.id })} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.lg },
  listHeader: { gap: spacing.md, marginBottom: spacing.md },
  chips: { gap: spacing.sm },
  count: { fontSize: 12, color: colors.muted },
  empty: { textAlign: 'center', color: colors.muted, marginTop: spacing.xl },
});
