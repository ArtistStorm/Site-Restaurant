import { z } from 'zod'

const phonePattern = /^\+?[0-9 .-]{6,20}$/

export const guestReservationSchema = z
  .object({
    date: z.string().min(1, 'La date est obligatoire.'),
    startTime: z.string().min(1, "L'heure de début est obligatoire."),
    endTime: z.string().min(1, "L'heure de fin est obligatoire."),
    guestCount: z
      .number({
        required_error: 'Le nombre de personnes est obligatoire.',
        invalid_type_error: 'Le nombre de personnes doit être un nombre.',
      })
      .int('Le nombre de personnes doit être un nombre entier.')
      .min(1, 'Il faut au moins 1 personne.')
      .max(20, 'Pour plus de 20 personnes, contactez le restaurant.'),
    specialRequest: z.string().max(1000, 'Votre demande ne doit pas dépasser 1000 caractères.'),
    guestName: z
      .string()
      .trim()
      .min(1, 'Votre nom est obligatoire.')
      .max(100, 'Votre nom ne doit pas dépasser 100 caractères.'),
    guestEmail: z
      .string()
      .trim()
      .min(1, "L'email est obligatoire.")
      .email("L'adresse email est invalide."),
    guestPhone: z
      .string()
      .trim()
      .regex(phonePattern, 'Le numéro de téléphone est invalide.'),
  })
  .refine((values) => values.endTime > values.startTime, {
    message: "L'heure de fin doit être après l'heure de début.",
    path: ['endTime'],
  })
  .refine((values) => new Date(`${values.date}T${values.startTime}`).getTime() > Date.now(), {
    message: 'Le créneau doit être dans le futur.',
    path: ['startTime'],
  })

export type GuestReservationFormValues = z.infer<typeof guestReservationSchema>
