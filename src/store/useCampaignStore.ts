import { create } from "zustand";
import { AppliedCampaign } from "@/domain/entities/applyCampaing.entities";

type CampaignStore = {
  campaigns: AppliedCampaign[];
  addCampaign: (campaign: AppliedCampaign) => void;
  updateCampaignStatus: (
    offerId: string,
    status: AppliedCampaign["status"]
  ) => void;
  resetCampaigns: () => void;
};

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: [],
  addCampaign: (campaign) =>
    set((state) => ({
      campaigns: [...state.campaigns, campaign],
    })),
  updateCampaignStatus: (offerId, newStatus) =>
    set((state) => ({
      campaigns: state.campaigns.map((c) =>
        c.offer.id === offerId ? { ...c, status: newStatus } : c
      ),
    })),
  resetCampaigns: () => set({ campaigns: [] }),
}));
