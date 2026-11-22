import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius } from '../constants/theme';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: string;
  small?: boolean;
}

export default function FilterChip({ label, selected, onPress, icon, small }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, small && styles.small, selected && styles.selected]}
    >
      <Text style={[styles.text, small && styles.textSmall, selected && styles.textSelected]}>
        {icon ? `${icon} ${label}` : label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  small: { paddingHorizontal: 10, paddingVertical: 6 },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
  text: { fontSize: 13, color: colors.text, fontWeight: '500' },
  textSmall: { fontSize: 12 },
  textSelected: { color: '#FFFFFF' },
});
