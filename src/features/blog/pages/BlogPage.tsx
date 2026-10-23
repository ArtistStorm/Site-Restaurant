import { useState } from 'react'
import { ArticleListItem } from '@/features/blog/components/ArticleListItem'
import { PopularArticles } from '@/features/blog/components/PopularArticles'
import { useBlogArticles } from '@/features/blog/hooks/useBlogArticles'
import { getCategories, sortByPopular, sortByRecent } from '@/features/blog/lib/article-utils'
import { Skeleton } from '@/shared'
import { EmptyState } from '@/shared/components/EmptyState'
import { cn } from '@/shared/lib/cn'

type SortOrder = 'recent' | 'popular'

const allCategories = 'Tous'

const sortOptions: { value: SortOrder; label: string }[] = [
  { value: 'recent', label: 'Récents' },
  { value: 'popular', label: 'Populaires' },
]

export function BlogPage() {
  const { data, isPending, isError } = useBlogArticles()
  const [category, setCategory] = useState(allCategories)
  const [sortOrder, setSortOrder] = useState<SortOrder>('recent')

  const articles = data ?? []
  const filtered = category === allCategories ? articles : articles.filter((article) => article.category === category)
  const visible = sortOrder === 'recent' ? sortByRecent(filtered) : sortByPopular(filtered)
  const popular = sortByPopular(articles).slice(0, 3)

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Recettes, coulisses de la cuisine et actualités de la maison.
        </p>
      </div>

      <div role="group" aria-label="Filtrer par catégorie" className="flex flex-wrap gap-2">
        {[allCategories, ...getCategories(articles)].map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm transition-colors',
              category === item
                ? 'border-vigne bg-bordeaux text-white dark:border-white dark:bg-white dark:text-slate-900'
                : 'border-slate-300 bg-white hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800',
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {popular.length > 0 && <PopularArticles articles={popular} />}

      <div role="group" aria-label="Trier les articles" className="flex gap-6 border-b border-slate-200 dark:border-slate-700">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={sortOrder === option.value}
            onClick={() => setSortOrder(option.value)}
            className={cn(
              '-mb-px border-b-2 px-1 pb-3 text-base transition-colors',
              sortOrder === option.value
                ? 'border-bordeaux font-semibold text-slate-900 dark:border-amber-400 dark:text-white'
                : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {isPending && (
        <div className="flex flex-col gap-4">
          <Skeleton variant="title" />
          <Skeleton variant="text" />
          <Skeleton variant="text" className="w-2/3" />
        </div>
      )}

      {isError && <p className="text-red-600 dark:text-red-400">Impossible de charger le blog.</p>}

      {!isPending && !isError && visible.length === 0 && (
        <EmptyState title="Aucun article dans cette catégorie." />
      )}

      {!isPending && !isError && visible.length > 0 && (
        <div className="flex flex-col">
          {visible.map((article) => (
            <ArticleListItem key={article.id} article={article} />
          ))}
        </div>
      )}
    </main>
  )
}
