import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Container, Button, ButtonText } from "@/styles/GlobalStyles";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/presentation/navigations/types";
import { useCampaignStore } from "@/store/useCampaignStore";
import { OfferInteractionStatus } from "@/domain/enums/dashboard.enums";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type OfferDetailRoute = RouteProp<RootStackParamList, "OfferDetail">;
type InteractionStatus = OfferInteractionStatus;

const OfferDetailScreen = () => {
  const { offer } = useRoute<OfferDetailRoute>().params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const addCampaign = useCampaignStore((state) => state.addCampaign);
  const updateCampaignStatus = useCampaignStore(
    (state) => state.updateCampaignStatus
  );
  const campaign = useCampaignStore((state) =>
    state.campaigns.find((c) => c.offer.id === offer.id)
  );

  const [date1, setDate1] = useState<Date | null>(null);
  const [date2, setDate2] = useState<Date | null>(null);
  const [selectedFinalDate, setSelectedFinalDate] = useState<Date | null>(null);

  const [showPicker, setShowPicker] = useState<"date1" | "date2" | null>(null);
  const [interactionStatus, setInteractionStatus] = useState<InteractionStatus>(
    OfferInteractionStatus.Iddle
  );
  const [showResponse, setShowResponse] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmitProposal = () => {
    if (!date1) return;

    const finalDate = date2 && Math.random() < 0.5 ? date2 : date1;

    // 1. Guardar como "sent"
    addCampaign({
      offer,
      selectedDate: finalDate!,
      status: OfferInteractionStatus.Sent,
    });

    setInteractionStatus(OfferInteractionStatus.Sent);

    // 2. Simular respuesta luego de 3 segundos
    setTimeout(() => {
      const accepted = Math.random() < 0.5;
      const newStatus = accepted
        ? OfferInteractionStatus.Accepted
        : OfferInteractionStatus.Rejected;

      updateCampaignStatus(offer.id, newStatus);
      setInteractionStatus(newStatus);
      setSelectedFinalDate(finalDate);
      setShowResponse(true);
    }, 3000);
  };

  useEffect(() => {
    if (campaign) {
      setDate1(campaign.selectedDate);
      setSelectedFinalDate(campaign.selectedDate);
      setInteractionStatus(campaign.status); // 👈 asumiendo que usás .status
      setShowResponse(
        campaign.status === OfferInteractionStatus.Accepted ||
          campaign.status === OfferInteractionStatus.Rejected
      );
    }
  }, [campaign]);

  return (
    <Container style={{ paddingTop: 80 }}>
      <View style={{ gap: 20 }}>
        {/* Info de la oferta */}
        <View style={styles.offerCard}>
          <Text style={styles.title}>{offer.businessName}</Text>

          <Text style={styles.label}>📄 Descripción:</Text>
          <Text style={styles.text}>{offer.description}</Text>

          <Text style={styles.label}>🎁 Recompensa:</Text>
          <Text style={styles.reward}>{offer.reward}</Text>

          <Text style={styles.label}>📌 Categoría:</Text>
          <View style={styles.badgeContainer}>
            <View style={styles.badgeInterest}>
              <Text style={styles.textBadge}>{offer.category}</Text>
            </View>
          </View>
        </View>

        {/* Fechas */}
        <View style={styles.dateSection}>
          <Text style={styles.label}>🗓 Fecha tentativa 1:</Text>
          <TouchableOpacity
            onPress={() => setShowPicker("date1")}
            style={styles.dateButton}
          >
            <Text style={styles.dateButtonText}>
              {date1 ? date1.toLocaleDateString() : "Seleccionar fecha"}
            </Text>
          </TouchableOpacity>

          <Text style={[styles.label, { marginTop: 12 }]}>
            🗓 Fecha tentativa 2 (opcional):
          </Text>
          <TouchableOpacity
            onPress={() => setShowPicker("date2")}
            style={styles.dateButton}
          >
            <Text style={styles.dateButtonText}>
              {date2 ? date2.toLocaleDateString() : "Seleccionar fecha"}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={(showPicker === "date1" ? date1 : date2) || new Date()}
              mode="date"
              display="default"
              onChange={(_, selectedDate) => {
                setShowPicker(null);
                if (selectedDate) {
                  showPicker === "date1"
                    ? setDate1(selectedDate)
                    : setDate2(selectedDate);
                }
              }}
            />
          )}
        </View>

        {/* Estado actual */}
        {interactionStatus === OfferInteractionStatus.Sent && date1 && (
          <View style={styles.statusCard}>
            <Text style={styles.statusTitle}>📤 Propuesta enviada</Text>
            <Text style={styles.statusText}>
              Fechas propuestas:
              {"\n"}- {date1.toLocaleDateString()}
              {date2 ? `\n- ${date2.toLocaleDateString()}` : ""}
            </Text>
            <Text style={styles.statusText}>Estado: ⏳ En revisión...</Text>
          </View>
        )}

        {/* Respuesta */}
        {showResponse && (
          <View
            style={[
              styles.responseCard,
              interactionStatus === OfferInteractionStatus.Accepted
                ? styles.backgroundSuccess
                : styles.backgroundError,
            ]}
          >
            <Text
              style={[
                styles.responseTitle,
                interactionStatus === OfferInteractionStatus.Accepted
                  ? styles.responseTextSuccess
                  : styles.responseTextError,
              ]}
            >
              🔔 Respuesta del negocio
            </Text>
            {interactionStatus === OfferInteractionStatus.Accepted ? (
              <Text style={styles.responseTextSuccess}>
                ✅ ¡Propuesta aceptada para el{" "}
                {selectedFinalDate?.toLocaleDateString()}!
              </Text>
            ) : (
              <Text style={styles.responseTextError}>
                ❌ Tu propuesta fue rechazada. Podés seguir participando en
                otras campañas.
              </Text>
            )}
          </View>
        )}
      </View>

      <View style={{ gap: 15 }}>
        {/* Botón enviar */}
        {interactionStatus === OfferInteractionStatus.Iddle && (
          <TouchableOpacity
            onPress={handleSubmitProposal}
            style={[styles.button, !date1 && { opacity: 0.5 }]}
            disabled={!date1}
          >
            <Text style={styles.buttonText}>Enviar propuesta</Text>
          </TouchableOpacity>
        )}

        <Button onPress={handleBack}>
          <ButtonText>Volver</ButtonText>
        </Button>
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  offerCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
    color: "#333",
  },
  text: {
    color: "#555",
  },
  reward: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  dateSection: {
    marginTop: 8,
  },
  dateButton: {
    padding: 10,
    backgroundColor: "#EEE",
    borderRadius: 6,
  },
  dateButtonText: {
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "500",
  },
  statusCard: {
    padding: 16,
    backgroundColor: "#FFF3CD",
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#FFB800",
    marginTop: 16,
  },
  statusTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#856404",
  },
  statusText: {
    color: "#856404",
  },
  responseCard: {
    marginTop: 24,
    padding: 16,
    borderRadius: 10,
    borderLeftWidth: 5,
  },
  responseTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  responseTextSuccess: {
    color: "#155724",
  },
  responseTextError: {
    color: "#721c24",
  },
  backgroundSuccess: {
    backgroundColor: "#E3FCEC",
    borderLeftColor: "#28a745",
  },
  backgroundError: {
    backgroundColor: "#F8D7DA",
    borderLeftColor: "#dc3545",
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
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
});

export default OfferDetailScreen;
