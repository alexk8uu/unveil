import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/presentation/navigations/types";
import OnboardingNavigator from "@/presentation/screens/onboarding/OnboardingNavigator";
import DashboardScreen from "@/presentation/screens/dashboard/DashboardScreen";
import OfferDetailScreen from "@/presentation/screens/dashboard/OfferDetailScreen";
import CurriculumScreen from "@/presentation/screens/dashboard/CurriculumScreen";
import { getUserFromStorage } from "@/data/storage/userStorage";
import { useUserStore } from "@/store/useUserStore";
import {
  SCREEN_NAMES,
  ScreenName,
} from "@/presentation/navigations/screenNames";
import WelcomeScreen from "@/presentation/screens/welcome/WelcomeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<ScreenName | null>(null);

  useEffect(() => {
    const checkStoredUser = async () => {
      const user = await getUserFromStorage();

      if (user) {
        useUserStore.getState().updateUser(user);
        setInitialRoute(SCREEN_NAMES.Welcome);
      } else {
        setInitialRoute(SCREEN_NAMES.Onboarding);
      }
    };
    checkStoredUser();
  }, []);

  if (!initialRoute) return null; // o mostrar Splash/Loader

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={SCREEN_NAMES.Welcome} component={WelcomeScreen} />
        <Stack.Screen
          name={SCREEN_NAMES.Onboarding}
          component={OnboardingNavigator}
        />
        <Stack.Screen
          name={SCREEN_NAMES.Dashboard}
          component={DashboardScreen}
        />
        <Stack.Screen
          name={SCREEN_NAMES.OfferDetail}
          component={OfferDetailScreen}
        />
        <Stack.Screen
          name={SCREEN_NAMES.CurriculumView}
          component={CurriculumScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
