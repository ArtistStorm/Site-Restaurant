import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "L'email est obligatoire.")
    .email("L'adresse email est invalide."),
  password: z.string().min(1, 'Le mot de passe est obligatoire.'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
