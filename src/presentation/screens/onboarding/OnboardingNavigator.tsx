import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OmbordingStackParamList } from "@/presentation/navigations/types";

import Step1UserInfo from "./Step1UserInfo";
import Step2Socials from "./Step2Socials";
import Step3Interests from "./Step3Interests";
import Step4Preview from "./Step4Preview";

const Stack = createNativeStackNavigator<OmbordingStackParamList>();

function OnboardingNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Step1"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Step1" component={Step1UserInfo} />
      <Stack.Screen name="Step2" component={Step2Socials} />
      <Stack.Screen name="Step3" component={Step3Interests} />
      <Stack.Screen name="Step4" component={Step4Preview} />
    </Stack.Navigator>
  );
}

export default OnboardingNavigator;
