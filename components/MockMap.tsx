import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PASSABILITY_INFO, PASSABILITY_ORDER, getCategory, getVehicle } from '../constants/labels';
import { colors, radius } from '../constants/theme';
import { HazardReport, VehicleType } from '../types';

// The "map" is only styled Views placed with percentage positions.
const H_ROADS = [
  { y: 25, label: 'Mirpur Road' },
  { y: 55, label: 'Satmasjid Road' },
  { y: 80, label: 'Rokeya Sarani' },
];
const V_ROADS = [
  { x: 20, label: 'Manik Mia Ave' },
  { x: 50, label: 'Airport Road' },
  { x: 78, label: 'Ring Road' },
];

interface Props {
  reports: HazardReport[];
  vehicle: VehicleType;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function MockMap({ reports, vehicle, selectedId, onSelect }: Props) {
  const v = getVehicle(vehicle);
  return (
    <View>
      <View style={styles.map}>
        {/* land blocks */}
        <View style={[styles.block, styles.park, { left: '27%', top: '30%', width: '18%', height: '19%' }]} />
        <View style={[styles.block, styles.water, { left: '56%', top: '60%', width: '16%', height: '15%' }]} />
        <View style={[styles.block, { left: '3%', top: '60%', width: '12%', height: '15%' }]} />
        <View style={[styles.block, { left: '83%', top: '30%', width: '13%', height: '20%' }]} />
        <View style={[styles.block, { left: '54%', top: '5%', width: '20%', height: '13%' }]} />
        <Text style={[styles.areaLabel, { left: '29%', top: '36%' }]}>Park</Text>
        <Text style={[styles.areaLabel, { left: '58%', top: '65%' }]}>Lake</Text>

        {/* roads */}
        {H_ROADS.map((r) => (
          <View key={r.label} style={[styles.hRoad, { top: `${r.y}%` }]}>
            <View style={styles.centerH} />
          </View>
        ))}
        {V_ROADS.map((r) => (
          <View key={r.label} style={[styles.vRoad, { left: `${r.x}%` }]}>
            <View style={styles.centerV} />
          </View>
        ))}

        {/* intersections */}
        {H_ROADS.map((h) =>
          V_ROADS.map((vr) => (
            <View key={`${h.y}-${vr.x}`} style={[styles.junction, { left: `${vr.x}%`, top: `${h.y}%` }]} />
          )),
        )}

        {/* road labels */}
        {H_ROADS.map((r) => (
          <Text key={r.label} style={[styles.roadLabel, { left: 6, top: `${r.y}%` }]}>{r.label}</Text>
        ))}
        {V_ROADS.map((r) => (
          <Text key={r.label} style={[styles.vLabel, { left: `${r.x}%`, bottom: 4 }]}>{r.label}</Text>
        ))}

        {/* current location */}
        <View style={[styles.me, { left: '50%', top: '55%' }]}>
          <View style={styles.meHalo} />
          <View style={styles.meDot} />
        </View>

        {/* hazard markers */}
        {reports.map((r) => {
          const selected = r.id === selectedId;
          return (
            <Pressable
              key={r.id}
              onPress={() => onSelect(r.id)}
              style={[
                styles.marker,
                {
                  left: `${r.mapX}%`,
                  top: `${r.mapY}%`,
                  backgroundColor: PASSABILITY_INFO[r.passability[vehicle]].color,
                  opacity: r.status === 'cleared' ? 0.4 : 1,
                },
                selected && styles.markerSelected,
              ]}
            >
              <Text style={styles.markerIcon}>{getCategory(r.category).icon}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>{v.icon} Marker colour for {v.label}:</Text>
        <View style={styles.legendRow}>
          {PASSABILITY_ORDER.map((p) => (
            <View key={p} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: PASSABILITY_INFO[p].color }]} />
              <Text style={styles.legendText}>{PASSABILITY_INFO[p].short}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 320,
    backgroundColor: '#E8EEF3',
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  block: { position: 'absolute', backgroundColor: '#DCE4EA', borderRadius: 6 },
  park: { backgroundColor: '#CFE8D5' },
  water: { backgroundColor: '#BBD9EE' },
  areaLabel: { position: 'absolute', fontSize: 10, color: '#6B7280' },
  hRoad: { position: 'absolute', left: 0, right: 0, height: 14, marginTop: -7, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  centerH: { height: 2, backgroundColor: '#E5E7EB' },
  vRoad: { position: 'absolute', top: 0, bottom: 0, width: 14, marginLeft: -7, backgroundColor: '#FFFFFF', alignItems: 'center' },
  centerV: { width: 2, flex: 1, backgroundColor: '#E5E7EB' },
  junction: { position: 'absolute', width: 18, height: 18, marginLeft: -9, marginTop: -9, borderRadius: 9, backgroundColor: '#FFFFFF' },
  roadLabel: { position: 'absolute', marginTop: -22, fontSize: 10, fontWeight: '600', color: '#4B5563' },
  vLabel: { position: 'absolute', width: 90, marginLeft: -45, textAlign: 'center', fontSize: 9, fontWeight: '600', color: '#4B5563' },
  me: { position: 'absolute', width: 36, height: 36, marginLeft: -18, marginTop: -18, alignItems: 'center', justifyContent: 'center' },
  meHalo: { position: 'absolute', width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(29,78,216,0.2)' },
  meDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#1D4ED8', borderWidth: 3, borderColor: '#FFFFFF' },
  marker: {
    position: 'absolute', width: 32, height: 32, marginLeft: -16, marginTop: -16,
    borderRadius: 16, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#FFFFFF',
  },
  markerSelected: { width: 38, height: 38, marginLeft: -19, marginTop: -19, borderRadius: 19, borderColor: '#111827', zIndex: 10 },
  markerIcon: { fontSize: 15 },
  legend: { marginTop: 8 },
  legendTitle: { fontSize: 12, color: colors.muted, marginBottom: 4 },
  legendRow: { flexDirection: 'row', gap: 14 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, color: colors.text },
});
