import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Container, Button, ButtonText } from "@/styles/GlobalStyles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step1Data, step1Schema } from "@/core/validators/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import {
  OmbordingStackParamList,
  RootStackParamList,
} from "@/presentation/navigations/types";
import { OnboardingSteps } from "@/domain/enums/onboarding.enums";
import { FormField } from "@/presentation/components/FormField";
import { getUserFromStorage } from "@/data/storage/userStorage";
import { StepBar } from "@/presentation/components/StepBar";
import styles from "./styles";
import { SCREEN_NAMES } from "@/presentation/navigations/screenNames";
import { Scroll } from "lucide-react-native";

const Step1UserInfo = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OmbordingStackParamList>>();
  const updateUser = useUserStore((state) => state.updateUser);
  const mainNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      city: "",
    },
  });

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserFromStorage();
      console.log("User from storage:", JSON.stringify(user));
    };
    getUser();
  }, []);

  const onSubmit = (data: Step1Data) => {
    updateUser(data);
    navigation.navigate(OnboardingSteps.Step2);
  };

  const handleBack = () => {
    mainNavigation.navigate(SCREEN_NAMES.Welcome);
  };

  return (
    <Container>
      <StepBar currentStep={0} />
      <ScrollView>
        <FormField
          label="Nombre completo"
          name="fullName"
          control={control}
          error={errors.fullName?.message}
        />
        <FormField
          label="Email"
          name="email"
          control={control}
          error={errors.email?.message}
        />
        <FormField
          label="Contraseña"
          name="password"
          control={control}
          error={errors.password?.message}
          secureTextEntry={true}
        />
        <FormField
          label="Confirmar contraseña"
          name="confirmPassword"
          control={control}
          error={errors.confirmPassword?.message}
          secureTextEntry
        />
        <FormField
          label="País"
          name="country"
          control={control}
          error={errors.country?.message}
        />
        <FormField
          label="Ciudad"
          name="city"
          control={control}
          error={errors.city?.message}
        />
      </ScrollView>

      <View style={{ gap: 15 }}>
        <Button onPress={handleSubmit(onSubmit)}>
          <ButtonText>Siguiente</ButtonText>
        </Button>

        <Button onPress={handleBack} style={styles.buttonBack}>
          <ButtonText>Volver</ButtonText>
        </Button>
      </View>
    </Container>
  );
};

export default Step1UserInfo;
