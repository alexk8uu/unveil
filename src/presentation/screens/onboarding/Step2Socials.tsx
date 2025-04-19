import React from "react";
import { Text, StyleSheet } from "react-native";
import {
  Container,
  Button,
  ButtonText,
  buttonBack,
} from "@/styles/GlobalStyles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step2Data, step2Schema } from "@/core/validators/userSchema";
import { SOCIAL_MEDIAS } from "@/core/constants/social-media";
import { FormField } from "@/presentation/components/FormField";
import { useUserStore } from "@/store/useUserStore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OmbordingStackParamList } from "@/presentation/navigations/types";
import { OnboardingSteps } from "@/domain/enums/onboarding.enums";
import { ScrollView } from "react-native-gesture-handler";
import { StepBar } from "@/presentation/components/StepBar";
import styles from "./styles";

const Step2Socials = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OmbordingStackParamList>>();
  const updateUser = useUserStore((state) => state.updateUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      socialMedia: {},
    },
  });

  const onSubmit = (data: Step2Data) => {
    updateUser(data);
    navigation.navigate(OnboardingSteps.Step3);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <StepBar currentStep={1} />
      <ScrollView>
        {SOCIAL_MEDIAS.map((media) => (
          <FormField<Step2Data>
            key={media}
            label={media.charAt(0).toUpperCase() + media.slice(1)}
            name={`socialMedia.${media}` as keyof Step2Data}
            control={control}
            error={errors?.socialMedia?.[media]?.message as string | undefined}
            placeholder={`https://${media}.com/tu-usuario`}
          />
        ))}
      </ScrollView>
      <Button onPress={handleSubmit(onSubmit)}>
        <ButtonText>Siguiente</ButtonText>
      </Button>

      <Button onPress={handleBack} style={buttonBack}>
        <ButtonText>Volver</ButtonText>
      </Button>
    </Container>
  );
};

export default Step2Socials;
