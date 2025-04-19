import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import styles from "@/presentation/screens/onboarding/styles";
import { Eye, EyeOff } from "lucide-react-native";

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
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureTextEntry;

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder={placeholder}
              style={[
                styles.input,
                styles.inputPass,
                error && styles.inputError,
                isPassword && { paddingRight: 40 },
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={isPassword && !showPassword}
              autoCapitalize="none"
            />
            {isPassword && (
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOff size={20} color={"black"} />
                ) : (
                  <Eye size={20} color={"black"} />
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
