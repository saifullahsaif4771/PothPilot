import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/theme';
import { ScreenName, TabName } from '../types';

const TABS: { name: TabName; label: string; icon: string }[] = [
  { name: 'Home', label: 'Map', icon: '🗺️' },
  { name: 'Reports', label: 'Reports', icon: '📋' },
  { name: 'RouteAssess', label: 'Route', icon: '🧭' },
  { name: 'Profile', label: 'Profile', icon: '👤' },
];

interface Props {
  active: ScreenName;
  onChange: (tab: TabName) => void;
}

export default function BottomNavigation({ active, onChange }: Props) {
  return (
    // SafeAreaView keeps the tabs above the gesture bar / navigation buttons.
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <View style={styles.bar}>
        {TABS.map((t) => {
          const selected = t.name === active;
          return (
            <Pressable key={t.name} style={styles.tab} onPress={() => onChange(t.name)}>
              <View style={[styles.indicator, selected && styles.indicatorOn]} />
              <Text style={[styles.icon, !selected && styles.iconOff]}>{t.icon}</Text>
              <Text style={[styles.label, selected && styles.labelOn]}>{t.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border },
  bar: { flexDirection: 'row', paddingBottom: 6 },
  tab: { flex: 1, alignItems: 'center', paddingBottom: 2 },
  indicator: { height: 3, width: 28, borderRadius: 2, backgroundColor: 'transparent', marginBottom: 6 },
  indicatorOn: { backgroundColor: colors.primary },
  icon: { fontSize: 20 },
  iconOff: { opacity: 0.55 },
  label: { fontSize: 11, color: colors.muted, marginTop: 2, fontWeight: '500' },
  labelOn: { color: colors.primary, fontWeight: '700' },
});
