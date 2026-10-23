import { z } from 'zod'

export const blogArticleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Le titre est obligatoire.')
    .max(120, 'Le titre ne doit pas dépasser 120 caractères.'),
  category: z
    .string()
    .trim()
    .min(1, 'La catégorie est obligatoire.')
    .max(40, 'La catégorie ne doit pas dépasser 40 caractères.'),
  excerpt: z
    .string()
    .trim()
    .min(1, 'Le résumé est obligatoire.')
    .max(300, 'Le résumé ne doit pas dépasser 300 caractères.'),
  author: z
    .string()
    .trim()
    .min(1, "L'auteur est obligatoire.")
    .max(80, "L'auteur ne doit pas dépasser 80 caractères."),
  content: z
    .string()
    .trim()
    .min(1, 'Le contenu est obligatoire.')
    .max(20000, 'Le contenu ne doit pas dépasser 20 000 caractères.'),
})

export type BlogArticleFormValues = z.infer<typeof blogArticleSchema>
