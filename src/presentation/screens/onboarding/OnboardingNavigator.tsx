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
        headerShown: true,
        headerBackVisible: false,
      }}
    >
      <Stack.Screen
        name="Step1"
        component={Step1UserInfo}
        options={{
          title: "Paso 1: Información personal",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#f8f8f8",
          },
          headerTintColor: "#333",
        }}
      />
      <Stack.Screen
        name="Step2"
        component={Step2Socials}
        options={{
          title: "Paso 2: Redes Sociales",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#f8f8f8",
          },
          headerTintColor: "#333",
        }}
      />
      <Stack.Screen
        name="Step3"
        component={Step3Interests}
        options={{
          title: "Paso 3: Intereses",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#f8f8f8",
          },
          headerTintColor: "#333",
        }}
      />
      <Stack.Screen
        name="Step4"
        component={Step4Preview}
        options={{
          title: "Paso 4: Vista previa",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#f8f8f8",
          },
          headerTintColor: "#333",
        }}
      />
    </Stack.Navigator>
  );
}

export default OnboardingNavigator;
