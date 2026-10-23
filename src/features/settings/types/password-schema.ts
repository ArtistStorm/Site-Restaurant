import { z } from 'zod'

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Le mot de passe actuel est obligatoire.'),
    newPassword: z
      .string()
      .min(8, 'Le nouveau mot de passe doit contenir au moins 8 caractères.')
      .max(128, 'Le nouveau mot de passe ne peut pas dépasser 128 caractères.'),
    confirmPassword: z.string().min(1, 'Veuillez confirmer le nouveau mot de passe.'),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: 'Les deux mots de passe ne correspondent pas.',
    path: ['confirmPassword'],
  })
  .refine((values) => values.newPassword !== values.currentPassword, {
    message: "Le nouveau mot de passe doit être différent de l'ancien.",
    path: ['newPassword'],
  })

export type PasswordFormValues = z.infer<typeof passwordSchema>
