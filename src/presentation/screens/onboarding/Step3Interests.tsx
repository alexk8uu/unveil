import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { INTEREST } from "@/core/constants/interest";
import { Step3Data, step3Schema } from "@/core/validators/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Chip } from "@/presentation/components/Chip";

import { Container, Button, ButtonText } from "@/styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OmbordingStackParamList } from "@/presentation/navigations/types";
import { OnboardingSteps } from "@/domain/enums/onboarding.enums";
import { StepBar } from "@/presentation/components/StepBar";
import { buttonBack } from "@/styles/GlobalStyles";

const Step3Interests = () => {
  const [search, setSearch] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<OmbordingStackParamList>>();
  const updateUser = useUserStore((state) => state.updateUser);

  const {
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      interests: [],
    },
  });

  const selected = watch("interests");

  const filtered = useMemo(() => {
    return INTEREST.filter(
      (item) =>
        item.toLowerCase().includes(search.toLowerCase()) &&
        !selected.includes(item)
    );
  }, [search, selected]);

  const addInterest = (interest: (typeof INTEREST)[number]) => {
    const current = getValues("interests");
    setValue("interests", [...current, interest]);
    setSearch("");
  };

  const removeInterest = (interest: string) => {
    const current = getValues("interests");
    setValue(
      "interests",
      current.filter((i) => i !== interest)
    );
  };

  const onSubmit = (data: Step3Data) => {
    updateUser(data);
    navigation.navigate(OnboardingSteps.Step4);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <StepBar currentStep={2} />
        <TextInput
          style={localStyles.input}
          placeholder="Buscar intereses..."
          value={search}
          onChangeText={setSearch}
        />
        {/* Lista filtrada */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={localStyles.option}
              onPress={() => addInterest(item)}
            >
              <Text style={localStyles.textCapitalize}>{item}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={localStyles.noResults}>No hay resultados</Text>
          }
          style={localStyles.list}
          keyboardShouldPersistTaps="handled"
        />
      </View>

      {/* Burbujas seleccionadas */}
      <View style={localStyles.selectedContainer}>
        {selected.map((interest) => (
          <Chip
            key={interest}
            label={interest}
            onRemove={() => removeInterest(interest)}
          />
        ))}
      </View>

      {errors.interests && (
        <Text style={localStyles.error}>{errors.interests.message}</Text>
      )}

      <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Button onPress={handleSubmit(onSubmit)}>
          <ButtonText>Siguiente</ButtonText>
        </Button>

        <Button onPress={handleBack} style={[{ marginTop: 10 }, buttonBack]}>
          <ButtonText>Volver</ButtonText>
        </Button>
      </View>
    </Container>
  );
};

const localStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  selectedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  list: {
    backgroundColor: "#FFF",
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 200,
  },
  noResults: {
    textAlign: "center",
    color: "#999",
    paddingVertical: 10,
  },
  error: {
    color: "#DC2626",
    marginBottom: 10,
  },
  textCapitalize: {
    textTransform: "capitalize",
  },
});

export default Step3Interests;
