/**
 * Genera un ID único simple basado en la hora actual y un valor aleatorio.
 * Ideal para simulaciones, demos o datos mock.
 *
 * @returns string ID generado (ej: "luzoe8cv56e3ktw1")
 */
export const generateSimpleId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
};
