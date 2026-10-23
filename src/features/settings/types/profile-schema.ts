import { z } from 'zod'

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Le nom est obligatoire.')
    .max(60, 'Le nom ne peut pas dépasser 60 caractères.'),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
