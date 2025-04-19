import { Offer } from "./offer.entities";
import { OfferInteractionStatus } from "../enums/dashboard.enums";

export type AppliedCampaign = {
  offer: Offer;
  selectedDate: Date;
  status: OfferInteractionStatus;
};
