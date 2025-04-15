import { StatusBar } from "expo-status-bar";
import AppNavigator from "@/app/navigation";

export default function App() {
  return (
    <>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}
