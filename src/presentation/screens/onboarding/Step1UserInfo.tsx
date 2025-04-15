import { View, Text, TouchableOpacity } from "react-native";
import { Container, Title, Description } from "@/styles/GlobalStyles";
import React from "react";
import styles from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { OmbordingStackParamList } from "@/presentation/navigations/types";
import { OnboardingSteps } from "@/domain/enums/onboarding.enums";

const Step1UserInfo = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OmbordingStackParamList>>();

  return (
    <Container>
      <Title>Step1UserInfo</Title>
      <Text style={styles.title}>Welcome to the Onboarding Process!</Text>
      <Description>Please provide your information to get started.</Description>
      <Description>
        This is the first step in a multi-step onboarding process. You will be
        guided through each step to complete your profile.
      </Description>

      <TouchableOpacity
        onPress={() => navigation.navigate(OnboardingSteps.Step2)}
        style={styles.button}
      >
        <Text>Next</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Step1UserInfo;
