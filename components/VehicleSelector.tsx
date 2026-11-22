import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { VEHICLES } from '../constants/labels';
import { colors, radius } from '../constants/theme';
import { VehicleType } from '../types';

interface Props {
  value: VehicleType;
  onChange: (v: VehicleType) => void;
}

export default function VehicleSelector({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {VEHICLES.map((v) => {
        const selected = v.type === value;
        return (
          <Pressable
            key={v.type}
            onPress={() => onChange(v.type)}
            style={[styles.item, selected && styles.itemSelected]}
          >
            <Text style={styles.icon}>{v.icon}</Text>
            <Text style={[styles.label, selected && styles.labelSelected]} numberOfLines={1}>
              {v.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 6 },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemSelected: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  icon: { fontSize: 22 },
  label: { fontSize: 10.5, color: colors.muted, marginTop: 2, fontWeight: '500' },
  labelSelected: { color: colors.primaryDark, fontWeight: '700' },
});
