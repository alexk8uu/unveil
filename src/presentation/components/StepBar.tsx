import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StepBarProps {
  currentStep: number;
}

export const StepBar: React.FC<StepBarProps> = ({ currentStep }) => {
  const steps = ["Info", "Redes", "Intereses", "Vista Previa"];

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <React.Fragment key={index}>
            <View style={styles.stepWrapper}>
              <View
                style={[
                  styles.circle,
                  isCompleted && styles.circleCompleted,
                  isActive && styles.circleActive,
                ]}
              >
                <Text style={styles.circleText}>{index + 1}</Text>
              </View>
              <Text
                style={[styles.stepLabel, isActive && styles.stepLabelActive]}
              >
                {step}
              </Text>
            </View>
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  isCompleted ? styles.lineCompleted : styles.lineDefault,
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    flexWrap: "wrap",
  },
  stepWrapper: {
    alignItems: "center",
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  circleCompleted: {
    backgroundColor: "#28a745",
  },
  circleActive: {
    backgroundColor: "#007BFF",
  },
  circleText: {
    color: "white",
    fontWeight: "bold",
  },
  stepLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#777",
  },
  stepLabelActive: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  line: {
    width: 24,
    height: 2,
    marginHorizontal: 4,
    backgroundColor: "#ccc",
  },
  lineCompleted: {
    backgroundColor: "#28a745",
  },
  lineDefault: {
    backgroundColor: "#ccc",
  },
});
