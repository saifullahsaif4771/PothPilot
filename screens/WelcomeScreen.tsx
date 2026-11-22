import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import { colors, radius, spacing } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function WelcomeScreen() {
  const { navigate, signIn } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.logo}>
          <Text style={styles.logoLetter}>P</Text>
          <View style={styles.logoRoad} />
        </View>
        <Text style={styles.appName}>PothPilot</Text>
        <Text style={styles.tagline}>Vehicle-aware road navigation for Bangladesh</Text>
        <Text style={styles.description}>
          See community-reported potholes, waterlogging, mud and closures, and find out whether a road is
          passable for your motorcycle, car, CNG, bicycle or on foot.
        </Text>
      </View>

      <View style={styles.actions}>
        <AppButton title="Sign in" onPress={() => navigate('Login')} />
        <AppButton title="Create account" variant="outline" onPress={() => navigate('Register')} />
        <AppButton
          title="Continue as guest"
          variant="ghost"
          onPress={() => signIn({ name: 'Guest', email: '', isGuest: true })}
        />
        <Text style={styles.note}>Demo app: all reports shown are mock data, not live road conditions.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.card, paddingHorizontal: spacing.xl, paddingVertical: spacing.xl, justifyContent: 'space-between' },
  hero: { alignItems: 'center' },
  logo: {
    width: 88, height: 88, borderRadius: 22, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  logoLetter: { fontSize: 48, fontWeight: '800', color: '#FFFFFF', marginTop: -6 },
  logoRoad: { position: 'absolute', bottom: 12, width: 44, height: 4, borderRadius: 2, backgroundColor: '#F59E0B' },
  appName: { fontSize: 32, fontWeight: '800', color: colors.text, marginTop: spacing.lg },
  tagline: { fontSize: 15, color: colors.primary, fontWeight: '600', marginTop: 4, textAlign: 'center' },
  description: { fontSize: 14, color: colors.muted, textAlign: 'center', lineHeight: 21, marginTop: spacing.lg },
  actions: { gap: spacing.md },
  note: { fontSize: 12, color: colors.muted, textAlign: 'center', marginTop: spacing.sm, borderRadius: radius.sm },
});
