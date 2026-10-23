import { z } from 'zod'

export const menuItemSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Le nom du produit est obligatoire.')
    .max(120, 'Le nom ne doit pas dépasser 120 caractères.'),
  category: z.enum(['boissons', 'vins', 'entrees', 'plats', 'desserts'], {
    errorMap: () => ({ message: 'Choisissez une catégorie.' }),
  }),
  price: z
    .number({
      required_error: 'Le prix est obligatoire.',
      invalid_type_error: 'Le prix doit être un nombre.',
    })
    .min(0.01, 'Le prix doit être au moins 0,01 €.')
    .max(999, 'Le prix ne doit pas dépasser 999 €.')
    .refine((value) => Math.round(value * 100) / 100 === value, 'Le prix doit avoir au maximum 2 décimales.'),
  description: z
    .string()
    .trim()
    .min(1, 'La description est obligatoire.')
    .max(2000, 'La description ne doit pas dépasser 2000 caractères.'),
})

export type MenuItemFormValues = z.infer<typeof menuItemSchema>
