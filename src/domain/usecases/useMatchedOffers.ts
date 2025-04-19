import { Offer } from "@/domain/entities/offer.entities";
import { MOCK_OFFERS } from "@/data/mocks/offer.mocks";
import { useUserStore } from "@/store/useUserStore";
import { Interest } from "@/core/constants/interest";

/**
 * Hook que devuelve una lista de ofertas que coinciden con el perfil del usuario actual.
 *
 * Una oferta se considera válida si:
 * - Requiere el mismo nivel de usuario (`requiredLevel === user.level`)
 * - Su categoría está incluida en los intereses del usuario (`category ∈ user.interests`)
 *
 * @returns {Offer[]} Array de ofertas filtradas y matcheadas
 */

export const useMatchedOffers = (): Offer[] => {
  const user = useUserStore((state) => state.user);

  console.log("user", user);

  if (!user.level || !user.interests) return [];

  return MOCK_OFFERS.filter((offer) => {
    const matchesLevel = offer.requiredLevel === user.level;
    const matchesInterest = (user.interests ?? []).includes(
      offer.category as Interest
    );

    return matchesLevel && matchesInterest;
  });
};
