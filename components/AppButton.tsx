import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';

interface Props {
  title: string;
  onPress: () => void;
  variant?: Variant;
  icon?: string;
  disabled?: boolean;
  small?: boolean;
  style?: StyleProp<ViewStyle>;
}

const VARIANTS: Record<Variant, { bg: string; border: string; text: string }> = {
  primary: { bg: colors.primary, border: colors.primary, text: '#FFFFFF' },
  secondary: { bg: colors.primaryLight, border: colors.primaryLight, text: colors.primaryDark },
  outline: { bg: colors.card, border: colors.border, text: colors.text },
  danger: { bg: colors.dangerLight, border: colors.dangerLight, text: colors.danger },
  ghost: { bg: 'transparent', border: 'transparent', text: colors.primary },
};

export default function AppButton({ title, onPress, variant = 'primary', icon, disabled, small, style }: Props) {
  const v = VARIANTS[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        small && styles.small,
        { backgroundColor: v.bg, borderColor: v.border, opacity: disabled ? 0.5 : pressed ? 0.8 : 1 },
        style,
      ]}
    >
      <Text style={[styles.text, small && styles.textSmall, { color: v.text }]}>
        {icon ? `${icon}  ${title}` : title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 13,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: { paddingVertical: 8, paddingHorizontal: spacing.md },
  text: { fontSize: 15, fontWeight: '600' },
  textSmall: { fontSize: 13 },
});
