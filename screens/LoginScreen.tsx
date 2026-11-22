import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import Field from '../components/Field';
import ScreenHeader from '../components/ScreenHeader';
import { colors, spacing } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function LoginScreen() {
  const { navigate, goBack, signIn } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleLogin = () => {
    const next: { email?: string; password?: string } = {};
    if (!email.includes('@')) next.email = 'Enter a valid email address.';
    if (password.length < 6) next.password = 'Password must be at least 6 characters.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Simulated login: any valid-looking email/password works.
    signIn({ name: email.split('@')[0], email, isGuest: false });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Sign in" onBack={goBack} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.intro}>Welcome back. Sign-in is simulated on this device.</Text>
        <Field label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" error={errors.email} />
        <Field label="Password" value={password} onChangeText={setPassword} placeholder="At least 6 characters" secureTextEntry error={errors.password} />
        <AppButton title="Login" onPress={handleLogin} />
        <View style={styles.links}>
          <AppButton title="Create an account" variant="ghost" onPress={() => navigate('Register')} />
          <AppButton
            title="Continue as guest"
            variant="ghost"
            onPress={() => signIn({ name: 'Guest', email: '', isGuest: true })}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  intro: { color: colors.muted, marginBottom: spacing.lg, fontSize: 14 },
  links: { marginTop: spacing.md, gap: 4 },
});
