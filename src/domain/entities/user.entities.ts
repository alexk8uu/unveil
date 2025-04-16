import { UserLevel } from "@/domain/enums/user.enums";
import { SocialMedia } from "@/core/constants/social-media";
import { Interest } from "@/core/constants/interest";

export type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  country: string;
  city: string;
  level: UserLevel;
  interests: Interest[];
  socialMedia: Partial<Record<SocialMedia, string>>;
  createdAt: Date;
};
