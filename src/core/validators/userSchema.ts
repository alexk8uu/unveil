import { z } from "zod";
import { INTEREST } from "../constants/interest";
import { SOCIAL_MEDIAS } from "../constants/social-media";

/**
 * Crea un objeto con claves dinámicas basadas en las redes sociales definidas,
 * donde cada valor debe ser una URL válida (si está presente).
 * Esto permite validar campos como `instagram`, `youtube`, etc. de forma opcional.
 */

const socialsShape = SOCIAL_MEDIAS.reduce((acc, media) => {
  acc[media] = z.string().url().optional();
  return acc;
}, {} as Record<(typeof SOCIAL_MEDIAS)[number], z.ZodTypeAny>);

/**
 * Schema completo para la sección `socialMedia` del usuario.
 * Cada red social definida es opcional pero, si está presente, debe ser una URL válida.
 */

const socialsSchema = z.object(socialsShape);

/**
 * Esquema completo del usuario, utilizado para validar el onboarding completo o para fines de backend.
 */

export const fullUserSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(20),
  country: z.string().min(1).max(50),
  city: z.string().min(1).max(50),
  level: z.enum(["beginner", "advanced"]),
  interests: z.array(z.enum(INTEREST)).nonempty(),
  socialMedia: socialsSchema,
  createdAt: z.date(),
});

/**
 * Paso 1 – Datos personales
 * Incluye nombre, email, contraseña, país y ciudad.
 */

export const step1Schema = fullUserSchema.pick({
  fullName: true,
  email: true,
  password: true,
  country: true,
  city: true,
});

/**
 * Paso 2 – Redes sociales
 * Valida únicamente el bloque de social media.
 */

export const step2Schema = fullUserSchema.pick({
  socialMedia: true,
});

/**
 * Paso 3 – Intereses
 * Valida que el usuario haya seleccionado al menos un interés.
 */

export const step3Schema = fullUserSchema.pick({
  interests: true,
});

/**
 * Tipos derivados directamente de los schemas de Zod.
 * Usados para tipar formularios, Zustand y otras estructuras.
 */

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type FullUserData = z.infer<typeof fullUserSchema>;
