import { UserLevel } from "../enums/user.enums";
import { Interest } from "@/core/constants/interest";

export type Offer = {
  id: string;
  businessName: string;
  description: string;
  reward: string;
  category: Interest;
  requiredLevel: UserLevel;
};
