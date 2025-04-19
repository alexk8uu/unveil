import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Offer } from "@/domain/entities/offer.entities";

type Props = {
  offer: Offer;
  onPress?: () => void;
};

export const OfferCard: React.FC<Props> = ({ offer, onPress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{offer.businessName}</Text>
      <Text style={styles.description}>{offer.description}</Text>
      <Text style={styles.reward}>🎁 {offer.reward}</Text>
      <View style={styles.rowItems}>
        <Text style={styles.category}>📌 Category:</Text>
        <View style={styles.badgeContainer}>
          <View style={styles.badgeInterest}>
            <Text style={styles.textBadge}>{offer.category}</Text>
          </View>
        </View>
      </View>
      {onPress && (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Ver detalles</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    gap: 8,
  },
  rowItems: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    color: "#333",
    marginBottom: 6,
  },
  reward: {
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 4,
  },
  category: {
    fontStyle: "italic",
    color: "#777",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
  },
  badgeInterest: {
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
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
