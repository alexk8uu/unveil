import { create } from "zustand";
import { User } from "@/domain/entities/user.entities";

type UserState = {
  user: Partial<User>;
  setUser: (user: Partial<User>) => void;
  updateUser: (data: Partial<User>) => void;
  resetUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: {},
  setUser: (user) => set({ user }),
  updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),
  resetUser: () => set({ user: {} }),
}));
