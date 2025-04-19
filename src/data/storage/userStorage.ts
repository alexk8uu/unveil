import * as SecureStore from "expo-secure-store";
import { FullUserData } from "@/core/validators/userSchema";

const USER_KEY = "authenticated_user";

export const saveUserToStorage = async (user: FullUserData) => {
  try {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error al guardar usuario:", error);
  }
};

export const getUserFromStorage = async (): Promise<FullUserData | null> => {
  try {
    const json = await SecureStore.getItemAsync(USER_KEY);
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error("Error al recuperar usuario:", error);
    return null;
  }
};

export const clearUserFromStorage = async () => {
  try {
    await SecureStore.deleteItemAsync(USER_KEY);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
  }
};
