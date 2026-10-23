import type { BlogArticle } from '@/features/blog/types/article'

const wordsPerMinute = 200

export function formatArticleDate(value: string): string {
  return new Date(value).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function getParagraphs(content: string): string[] {
  return content.split('\n\n').filter((paragraph) => paragraph.trim() !== '')
}

export function estimateReadingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / wordsPerMinute))
}

export function sortByRecent(list: BlogArticle[]): BlogArticle[] {
  return [...list].sort((first, second) => second.publishedAt.localeCompare(first.publishedAt))
}

export function sortByPopular(list: BlogArticle[]): BlogArticle[] {
  return [...list].sort((first, second) => second.views - first.views)
}

export function getCategories(list: BlogArticle[]): string[] {
  return [...new Set(list.map((article) => article.category))]
}

export function getRelatedArticles(current: BlogArticle, list: BlogArticle[]): BlogArticle[] {
  return list.filter((article) => article.id !== current.id).slice(0, 3)
}
