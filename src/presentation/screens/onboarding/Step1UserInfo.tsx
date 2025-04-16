import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Container, Title, Description } from "@/styles/GlobalStyles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step1Data, step1Schema } from "@/core/validators/userSchema";
import { useUserStore } from "@/store/useUserStore";
import styles from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { OmbordingStackParamList } from "@/presentation/navigations/types";
import { OnboardingSteps } from "@/domain/enums/onboarding.enums";
import { FormField } from "@/presentation/components/FormField";

const Step1UserInfo = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OmbordingStackParamList>>();
  const updateUser = useUserStore((state) => state.updateUser);

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
      country: "",
      city: "",
    },
  });

  const onSubmit = (data: Step1Data) => {
    updateUser(data);
    navigation.navigate(OnboardingSteps.Step2);
  };

  return (
    <Container>
      <Title>Paso 1: Información personal</Title>
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

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text>Next</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Step1UserInfo;
