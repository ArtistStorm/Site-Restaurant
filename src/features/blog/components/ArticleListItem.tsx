import { Link } from 'react-router-dom'
import { estimateReadingMinutes, formatArticleDate } from '@/features/blog/lib/article-utils'
import type { BlogArticle } from '@/features/blog/types/article'

type ArticleListItemProps = {
  article: BlogArticle
}

export function ArticleListItem({ article }: ArticleListItemProps) {
  return (
    <Link
      to={`/blog/${article.id}`}
      className="flex flex-col gap-6 border-t border-slate-200 py-7 transition-colors hover:text-bordeaux sm:flex-row dark:border-slate-700 dark:hover:text-amber-400"
    >
      <div className="flex h-40 items-center justify-center rounded-none bg-slate-200 text-sm text-slate-600 sm:w-60 sm:shrink-0 dark:bg-slate-800 dark:text-slate-400">
        {article.category}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase text-bordeaux dark:text-amber-400">{article.category}</span>
        <h2 className="text-2xl font-bold leading-snug">{article.title}</h2>
        <p className="text-slate-600 dark:text-slate-300">{article.excerpt}</p>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {formatArticleDate(article.publishedAt)} · {estimateReadingMinutes(article.content)} min de lecture
        </span>
      </div>
    </Link>
  )
}
