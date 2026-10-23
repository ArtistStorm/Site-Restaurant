import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, 'Le nom est obligatoire.'),
    email: z
      .string()
      .trim()
      .min(1, "L'email est obligatoire.")
      .email("L'adresse email est invalide."),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
    confirmPassword: z.string().min(1, 'Veuillez confirmer le mot de passe.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Les deux mots de passe ne correspondent pas.',
    path: ['confirmPassword'],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
