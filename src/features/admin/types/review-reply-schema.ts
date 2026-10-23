import { z } from 'zod'

export const reviewReplySchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, 'La réponse ne peut pas être vide.')
    .max(500, 'La réponse ne peut pas dépasser 500 caractères.'),
})

export type ReviewReplyFormValues = z.infer<typeof reviewReplySchema>
