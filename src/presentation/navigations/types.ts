import { Offer } from "@/domain/entities/offer.entities";

export type OmbordingStackParamList = {
  Step1: undefined;
  Step2: undefined;
  Step3: undefined;
  Step4: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Dashboard: undefined;
  OfferDetail: { offer: Offer };
  CurriculumView: undefined;
  Welcome: undefined;
};
