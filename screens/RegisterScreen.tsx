import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import Field from '../components/Field';
import ScreenHeader from '../components/ScreenHeader';
import { colors, spacing } from '../constants/theme';
import { useApp } from '../context/AppContext';

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
}

export default function RegisterScreen() {
  const { goBack, signIn } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const handleRegister = () => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = 'Please enter your name.';
    if (!email.includes('@')) next.email = 'Enter a valid email address.';
    if (password.length < 6) next.password = 'Password must be at least 6 characters.';
    if (confirm !== password) next.confirm = 'Passwords do not match.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    signIn({ name: name.trim(), email, isGuest: false });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Create account" onBack={goBack} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.intro}>Accounts are simulated. Nothing is sent or stored online.</Text>
        <Field label="Name" value={name} onChangeText={setName} placeholder="Your name" autoCapitalize="words" error={errors.name} />
        <Field label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" error={errors.email} />
        <Field label="Password" value={password} onChangeText={setPassword} placeholder="At least 6 characters" secureTextEntry error={errors.password} />
        <Field label="Confirm password" value={confirm} onChangeText={setConfirm} placeholder="Repeat password" secureTextEntry error={errors.confirm} />
        <AppButton title="Register" onPress={handleRegister} />
        <View style={styles.links}>
          <AppButton title="I already have an account" variant="ghost" onPress={goBack} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  intro: { color: colors.muted, marginBottom: spacing.lg, fontSize: 14 },
  links: { marginTop: spacing.md },
});
