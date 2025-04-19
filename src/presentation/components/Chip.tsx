import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

type ChipProps = {
  label: string;
  onRemove?: () => void;
};

export const Chip = ({ label, onRemove }: ChipProps) => {
  return (
    <View style={styles.chip}>
      <Text style={styles.text}>{label}</Text>
      {onRemove && (
        <TouchableOpacity onPress={onRemove}>
          <Text style={styles.remove}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    backgroundColor: "#E0E7FF",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  text: {
    color: "#1E40AF",
    fontWeight: "400",
    marginRight: 6,
    fontSize: 20,
  },
  remove: {
    color: "#1E3A8A",
    fontSize: 16,
    fontWeight: "bold",
  },
});
