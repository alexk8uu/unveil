import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useUserStore } from "@/store/useUserStore";
import { useCampaignStore } from "@/store/useCampaignStore";
import { OfferInteractionStatus } from "@/domain/enums/dashboard.enums";
import { Container, Button, ButtonText } from "@/styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/presentation/navigations/types";

const CurriculumScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useUserStore((state) => state.user);
  const campaigns = useCampaignStore((state) => state.campaigns);

  const accepted = campaigns.filter(
    (c) => c.status === OfferInteractionStatus.Accepted
  );
  const rejected = campaigns.filter(
    (c) => c.status === OfferInteractionStatus.Rejected
  );

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Container style={{ paddingTop: 60 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Perfil */}
        <Text style={styles.sectionTitle}>👤 Perfil del Creador</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Nombre:</Text>
          <Text>{user.fullName}</Text>

          <Text style={styles.label}>Ciudad:</Text>
          <Text>{user.city}</Text>

          <Text style={styles.label}>País:</Text>
          <Text>{user.country}</Text>

          <Text style={styles.label}>Nivel:</Text>
          <Text>{user.level === "beginner" ? "Principiante" : "Avanzado"}</Text>

          <Text style={styles.label}>Intereses:</Text>
          <View style={styles.badgeContainer}>
            {user.interests?.map((i) => (
              <View style={styles.badgeInterest} key={i}>
                <Text style={styles.textBadge}>{i}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Campañas Aceptadas */}
        <Text style={styles.sectionTitle}>📢 Campañas Aceptadas</Text>
        {accepted.length === 0 ? (
          <Text style={styles.empty}>Todavía no tenés campañas aceptadas.</Text>
        ) : (
          accepted.map((c, i) => (
            <View key={i} style={styles.card}>
              <Text style={styles.label}>{c.offer.businessName}</Text>
              <Text>Fecha: {c.selectedDate.toLocaleDateString()}</Text>
              <Text>🎁 {c.offer.reward}</Text>
              <Text>📄 {c.offer.description}</Text>
            </View>
          ))
        )}

        {/* Campañas Rechazadas */}
        <Text style={styles.sectionTitle}>❌ Campañas Rechazadas</Text>
        {rejected.length === 0 ? (
          <Text style={styles.empty}>Sin campañas rechazadas por ahora.</Text>
        ) : (
          rejected.map((c, i) => (
            <View key={i} style={styles.card}>
              <Text style={styles.label}>{c.offer.businessName}</Text>
              <Text>
                Fecha propuesta: {c.selectedDate.toLocaleDateString()}
              </Text>
              <Text style={styles.rejected}>Estado: Rechazada</Text>
            </View>
          ))
        )}

        {/* Estadísticas */}
        <Text style={styles.sectionTitle}>📊 Estadísticas</Text>
        <View style={styles.card}>
          <Text>Total solicitadas: {campaigns.length}</Text>
          <Text>Aceptadas: {accepted.length}</Text>
          <Text>Rechazadas: {rejected.length}</Text>
        </View>
      </ScrollView>

      <Button onPress={handleBack} style={{ marginBottom: 10 }}>
        <ButtonText>Volver</ButtonText>
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",

    marginVertical: 12,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#00000010",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontWeight: "600",
    marginTop: 4,
    color: "#333",
  },
  empty: {
    fontStyle: "italic",
    color: "#999",
    marginBottom: 8,
    paddingLeft: 8,
  },
  rejected: {
    color: "#dc3545",
    fontWeight: "600",
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
});

export default CurriculumScreen;
