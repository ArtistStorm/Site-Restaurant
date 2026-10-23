import { z } from 'zod'

export const reviewSchema = z.object({
  rating: z.number().int('Choisissez une note.').min(1, 'Choisissez une note.').max(5, 'Choisissez une note.'),
  comment: z
    .string()
    .trim()
    .max(500, 'Le commentaire ne peut pas dépasser 500 caractères.'),
})

export type ReviewFormValues = z.infer<typeof reviewSchema>
