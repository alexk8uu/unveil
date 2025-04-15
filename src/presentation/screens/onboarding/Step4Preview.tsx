import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/presentation/navigations/types";
import { DashboardRoutes } from "@/domain/enums/dashboard.enums";

const Step4Preview = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text>Step 3 Interests</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate(DashboardRoutes.Dashboard)}
        style={styles.button}
      >
        <Text>Ir al Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Step4Preview;
