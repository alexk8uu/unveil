import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Container, Button, ButtonText } from "@/styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { useUserStore } from "@/store/useUserStore";
import { SCREEN_NAMES } from "@/presentation/navigations/screenNames";
import { RootStackParamList } from "@/presentation/navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMatchedOffers } from "@/domain/usecases/useMatchedOffers";
import { OfferCard } from "@/presentation/components/OfferCard";
import { Offer } from "@/domain/entities/offer.entities";
import { ChevronRight } from "lucide-react-native";

const DashboardScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const resetUser = useUserStore((state) => state.resetUser);
  const user = useUserStore((state) => state.user);
  const offers = useMatchedOffers();

  const handleLogout = async () => {
    resetUser();

    navigation.reset({
      index: 0,
      routes: [{ name: SCREEN_NAMES.Welcome }],
    });
  };

  const handleNavigateToDetail = (offer: Offer) => {
    navigation.navigate(SCREEN_NAMES.OfferDetail, { offer });
  };

  const handleNavigateToCurriculum = () => {
    navigation.navigate(SCREEN_NAMES.CurriculumView);
  };

  return (
    <Container style={{ paddingTop: 60 }}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Hola @{user.fullName} 😁</Text>

        <Button onPress={handleLogout} style={styles.logoutButton}>
          <ButtonText style={styles.logoutText}>Cerrar sesión</ButtonText>
        </Button>
      </View>
      <View style={{ display: "flex" }}>
        <Text style={styles.subtitle}>Supervisa tu progeso 🚀 </Text>

        <Button
          onPress={handleNavigateToCurriculum}
          style={styles.viewCvButton}
        >
          <ButtonText style={styles.viewCvText}>Curriculum Virtual</ButtonText>
          <ChevronRight size={20} color="#3c683d" style={{ marginLeft: 10 }} />
        </Button>
      </View>

      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <Text style={styles.title}>🎯 Ofertas recomendadas para vos</Text>
        }
        renderItem={({ item }) => (
          <OfferCard
            offer={item}
            onPress={() => handleNavigateToDetail(item)}
          />
        )}
      />
    </Container>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  welcome: {
    fontSize: 20,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "#eee",
  },
  viewCvButton: {
    backgroundColor: "#bbe8ca",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewCvText: {
    color: "#3c683d",
    fontWeight: "bold",
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 10,
  },
});
