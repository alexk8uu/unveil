import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OmbordingStackParamList } from "@/presentation/navigations/types";
import { OnboardingSteps } from "@/domain/enums/onboarding.enums";

const Step3Interests = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OmbordingStackParamList>>();

  return (
    <View style={styles.container}>
      <Text>Step 3 Interests</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate(OnboardingSteps.Step4)}
        style={styles.button}
      >
        <Text>Next Step 4</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Step3Interests;
