import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useUserStore } from "@/store/useUserStore";
import { saveUserToStorage } from "@/data/storage/userStorage";
import {
  Container,
  Button,
  ButtonText,
  buttonBack,
} from "@/styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/presentation/navigations/types";
import { SCREEN_NAMES } from "@/presentation/navigations/screenNames";
import { FullUserData } from "@/core/validators/userSchema";
import { generateSimpleId } from "@/core/utils/generateSimpleId";
import { UserLevel } from "@/domain/enums/user.enums";
import { StepBar } from "@/presentation/components/StepBar";
import { useCampaignStore } from "@/store/useCampaignStore";

const Step4Preview = () => {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);
  const resetCampaigns = useCampaignStore((state) => state.resetCampaigns);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleFinish = async () => {
    const userId = generateSimpleId(); // Generar un nuevo ID único para el usuario
    const userCreatedAt = new Date(); // Fecha de creación del usuario
    const userLevel = UserLevel.BEGINNER;

    const completeUser = {
      ...user,
      id: userId,
      level: userLevel,
      createdAt: userCreatedAt,
    } as FullUserData;

    console.log("Complete user data:", completeUser);

    try {
      // Actualizar el estado del usuario en el store
      updateUser(completeUser);
      // Reiniciar las campañas en el store
      resetCampaigns();
      // Guardar el usuario en el almacenamiento local
      await saveUserToStorage(completeUser);
      // Ir al Dashboard
      navigation.reset({
        index: 0,
        routes: [{ name: SCREEN_NAMES.Dashboard }],
      });
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <StepBar currentStep={3} />

      <ScrollView contentContainerStyle={localStyles.container}>
        <Text style={localStyles.title}>Vista Previa del Currículum</Text>

        {/* Datos personales */}
        <View style={localStyles.card}>
          <Text style={localStyles.cardTitle}>👤 Información Personal</Text>
          <Text style={localStyles.cardSubtitle}>Nombre: {user.fullName}</Text>
          <Text style={localStyles.cardSubtitle}>Ciudad: {user.city}</Text>
          <Text style={localStyles.cardSubtitle}>País: {user.country}</Text>
          <Text
            style={[localStyles.cardSubtitle, { textTransform: "capitalize" }]}
          >
            Nivel: {UserLevel.BEGINNER}
          </Text>
          <Text style={{ marginTop: 10, fontWeight: "600" }}>Intereses:</Text>
          <View style={localStyles.badgeContainer}>
            {user.interests?.map((i) => (
              <View style={localStyles.badgeInterest} key={i}>
                <Text style={localStyles.textBadge}>{i}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Campañas realizadas */}
        <View style={localStyles.card}>
          <Text style={localStyles.cardTitle}>📢 Campañas Realizadas</Text>
          <Text style={localStyles.placeholder}>
            ¡Completa tu primera campaña para empezar a construir tu currículum!
          </Text>
        </View>

        {/* Estadísticas clave */}
        <View style={localStyles.card}>
          <Text style={localStyles.cardTitle}>📈 Estadísticas Clave</Text>
          <Text>Campañas: 0</Text>
          <Text>Reseñas: N/A</Text>
          <Text>Nivel: Principiante</Text>
        </View>
      </ScrollView>
      <View>
        <Button onPress={handleFinish}>
          <ButtonText>Ir al Dashboard</ButtonText>
        </Button>
        <Button onPress={handleBack} style={buttonBack}>
          <ButtonText>Volver</ButtonText>
        </Button>
      </View>
    </Container>
  );
};

const localStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },

  badgeInterest: {
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
  },

  textBadge: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#00000010",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 8,
  },
  placeholder: {
    color: "#6B7280",
    fontStyle: "italic",
  },
});

export default Step4Preview;
