import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import HazardCard from '../components/HazardCard';
import ScreenHeader from '../components/ScreenHeader';
import { Badge } from '../components/StatusBadge';
import { colors, radius, spacing } from '../constants/theme';
import { useApp } from '../context/AppContext';

type Section = 'reports' | 'settings' | 'about' | null;

export default function ProfileScreen() {
  const { user, reports, vehicle, logout, navigate } = useApp();
  const [open, setOpen] = useState<Section>(null);
  const [alerts, setAlerts] = useState(true);
  const [showStale, setShowStale] = useState(true);

  const isGuest = !user || user.isGuest;
  const name = isGuest ? 'Guest' : user.name;
  const myReports = reports.filter((r) => r.reportedBy === 'You' || (!isGuest && r.reportedBy === user.name));
  const toggle = (s: Section) => setOpen((prev) => (prev === s ? null : s));

  return (
    <View style={styles.container}>
      <ScreenHeader title="Profile" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{isGuest ? 'Browsing without an account' : user.email}</Text>
          </View>
          {isGuest ? (
            <Badge label="Guest" color={colors.warning} bg={colors.warningLight} />
          ) : (
            <Badge label="Signed in" color={colors.success} bg={colors.successLight} />
          )}
        </View>

        <MenuRow title="My reports" detail={`${myReports.length}`} onPress={() => toggle('reports')} />
        {open === 'reports' ? (
          <View style={styles.panel}>
            {myReports.length === 0 ? (
              <Text style={styles.muted}>Reports you submit will appear here.</Text>
            ) : (
              myReports.map((r) => (
                <HazardCard key={r.id} report={r} vehicle={vehicle} onPress={() => navigate('HazardDetails', { reportId: r.id })} />
              ))
            )}
          </View>
        ) : null}

        <MenuRow title="Settings" onPress={() => toggle('settings')} />
        {open === 'settings' ? (
          <View style={styles.panel}>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Hazard alerts (simulated)</Text>
              <Switch value={alerts} onValueChange={setAlerts} trackColor={{ true: colors.primary }} />
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Show stale reports (simulated)</Text>
              <Switch value={showStale} onValueChange={setShowStale} trackColor={{ true: colors.primary }} />
            </View>
          </View>
        ) : null}

        <MenuRow title="About PothPilot" onPress={() => toggle('about')} />
        {open === 'about' ? (
          <View style={styles.panel}>
            <Text style={styles.aboutTitle}>PothPilot: A Vehicle-Aware, Community-Driven Road Navigation System for Bangladesh</Text>
            <Text style={styles.muted}>
              University midterm UI prototype for Mobile Application Development (React Native & Expo). All data is
              local mock data. There is no backend, GPS, or real map.
            </Text>
          </View>
        ) : null}

        <View style={{ gap: spacing.sm, marginTop: spacing.lg }}>
          {isGuest ? <AppButton title="Create account" onPress={() => navigate('Register')} /> : null}
          <AppButton title={isGuest ? 'Back to welcome' : 'Logout'} variant="danger" onPress={logout} />
        </View>
      </ScrollView>
    </View>
  );
}

function MenuRow({ title, detail, onPress }: { title: string; detail?: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.menuRow}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuDetail}>{detail ? `${detail}  ›` : '›'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.sm },
  profileCard: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.card,
    borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginBottom: spacing.sm,
  },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFFFFF', fontSize: 22, fontWeight: '700' },
  name: { fontSize: 17, fontWeight: '700', color: colors.text },
  email: { fontSize: 12, color: colors.muted, marginTop: 2 },
  menuRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.card,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, paddingVertical: 14, paddingHorizontal: spacing.lg,
  },
  menuTitle: { fontSize: 15, fontWeight: '600', color: colors.text },
  menuDetail: { fontSize: 14, color: colors.muted },
  panel: { gap: spacing.sm, paddingHorizontal: 4, paddingBottom: spacing.sm },
  muted: { fontSize: 13, color: colors.muted, lineHeight: 19 },
  aboutTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  switchLabel: { fontSize: 14, color: colors.text, flex: 1 },
});
