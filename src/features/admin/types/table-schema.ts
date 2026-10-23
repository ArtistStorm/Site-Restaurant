import { z } from 'zod'

export const tableSchema = z.object({
  number: z
    .number({
      required_error: 'Le numéro est obligatoire.',
      invalid_type_error: 'Le numéro doit être un nombre.',
    })
    .int('Le numéro doit être un nombre entier.')
    .min(1, 'Le numéro doit être supérieur à 0.'),
  capacity: z
    .number({
      required_error: 'La capacité est obligatoire.',
      invalid_type_error: 'La capacité doit être un nombre.',
    })
    .int('La capacité doit être un nombre entier.')
    .min(1, 'La capacité doit être supérieure à 0.'),
  location: z.string().trim().min(1, 'Le lieu est obligatoire.'),
})

export type TableFormValues = z.infer<typeof tableSchema>
