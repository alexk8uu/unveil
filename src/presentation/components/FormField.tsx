// src/presentation/components/FormField.tsx

import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import styles from "@/presentation/screens/onboarding/styles";

type FormFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error?: string;
  secureTextEntry?: boolean;
  placeholder?: string;
};

export function FormField<T extends FieldValues>({
  label,
  name,
  control,
  error,
  secureTextEntry = false,
  placeholder,
}: FormFieldProps<T>) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            style={[styles.input, error && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
          />
        )}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
