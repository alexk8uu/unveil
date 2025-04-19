import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Animated,
  Image,
} from "react-native";
import {
  getUserFromStorage,
  clearUserFromStorage,
} from "@/data/storage/userStorage";
import { useUserStore } from "@/store/useUserStore";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "@/presentation/navigations/screenNames";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/presentation/navigations/types";
import { Container } from "@/styles/GlobalStyles";

const WelcomeScreen = () => {
  const [savedName, setSavedName] = useState<string | null>(null);
  const [storedPassword, setStoredPassword] = useState<string>("");
  const [showLogin, setShowLogin] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");

  const animatedHeight = useRef(new Animated.Value(250)).current;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await getUserFromStorage();
      if (storedUser) {
        setSavedName(storedUser.fullName);
        setStoredPassword(storedUser.password);
        setUser(storedUser);
      }
    };
    checkUser();
  }, []);

  const handleVerifyPassword = () => {
    if (inputPassword === storedPassword) {
      navigation.reset({
        index: 0,
        routes: [{ name: SCREEN_NAMES.Dashboard }],
      });
    } else {
      setError("Contraseña incorrecta");
    }
  };

  const handleNewUser = async () => {
    await clearUserFromStorage();
    navigation.reset({
      index: 0,
      routes: [{ name: SCREEN_NAMES.Onboarding }],
    });
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    Animated.timing(animatedHeight, {
      toValue: 320,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleHideLogin = () => {
    setShowLogin(false);
    Animated.timing(animatedHeight, {
      toValue: 250,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UNVEIL</Text>
      <View
        style={[
          styles.badge,
          {
            top: "30%",
            left: "10%",
          },
        ]}
      >
        <Text style={styles.badgeText}>🚀 Buscando oportunidades</Text>
      </View>
      <View
        style={[
          styles.badge,
          {
            top: "22%",
            right: "8%",
            zIndex: 10,
          },
        ]}
      >
        <Text style={styles.badgeText}>👀 Explorando colaboraciones</Text>
      </View>
      {/* <Text style={styles.title}>Bienvenido a Unveil ✨</Text> */}
      <Image
        source={require("../../../../assets/onboarding-welcome-person.png")}
        style={{
          width: 500,
          height: 500,
          position: "absolute",
          bottom: 200,
          right: -60,
        }}
        resizeMode="contain"
      />
      <Animated.View style={[styles.card, { height: animatedHeight }]}>
        {savedName && !showLogin ? (
          <>
            <Text style={[styles.subtitle, { marginTop: 20 }]}>
              Hola nuevamente, {savedName}
            </Text>
            <View style={{ gap: 12 }}>
              <TouchableOpacity style={styles.button} onPress={handleShowLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondary}
                onPress={handleNewUser}
              >
                <Text style={styles.secondaryText}>Crear nuevo usuario</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : showLogin ? (
          <>
            <Text style={styles.subtitle}>Ingresá tu contraseña</Text>
            <TextInput
              secureTextEntry
              value={inputPassword}
              onChangeText={(text) => {
                setInputPassword(text);
                setError("");
              }}
              placeholder="Contraseña"
              style={styles.input}
            />
            {error !== "" && <Text style={styles.error}>{error}</Text>}
            <View style={{ gap: 12 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleVerifyPassword}
              >
                <Text style={styles.buttonText}>Continuar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondary}
                onPress={handleHideLogin}
              >
                <Text style={styles.secondaryText}>Volver</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>¿Listo para comenzar?</Text>
            <TouchableOpacity style={styles.button} onPress={handleNewUser}>
              <Text style={styles.buttonText}>Comenzar</Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "space-between",
    paddingTop: 80,
    backgroundColor: "#93c5fd",
  },
  badge: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 20,
    color: "#ffffff",
  },
  card: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    justifyContent: "space-between",
    gap: 12,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
  secondary: {
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
  },
  secondaryText: { color: "#444" },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});

export default WelcomeScreen;
