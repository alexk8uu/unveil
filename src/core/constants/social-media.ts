export const SOCIAL_MEDIAS = [
  "facebook",
  "tiktok",
  "youtube",
  "x",
  "instagram",
  "twitch",
] as const;

export type SocialMedia = (typeof SOCIAL_MEDIAS)[number];
