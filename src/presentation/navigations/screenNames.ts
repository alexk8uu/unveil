export const SCREEN_NAMES = {
  Onboarding: "Onboarding",
  Dashboard: "Dashboard",
  OfferDetail: "OfferDetail",
  CurriculumView: "CurriculumView",
  Welcome: "Welcome",
} as const;

export type ScreenName = keyof typeof SCREEN_NAMES;
