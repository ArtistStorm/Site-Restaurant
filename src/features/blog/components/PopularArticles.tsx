import { Link } from 'react-router-dom'
import type { BlogArticle } from '@/features/blog/types/article'

type PopularArticlesProps = {
  articles: BlogArticle[]
}

export function PopularArticles({ articles }: PopularArticlesProps) {
  return (
    <section
      aria-labelledby="popular-articles-title"
      className="flex flex-col gap-4 rounded-none border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <h2 id="popular-articles-title" className="text-xl font-bold">
        Les plus lus
      </h2>
      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {articles.map((article, index) => (
          <li key={article.id}>
            <Link
              to={`/blog/${article.id}`}
              className="flex gap-3 transition-colors hover:text-bordeaux dark:hover:text-amber-400"
            >
              <span className="text-3xl font-bold leading-none text-bordeaux dark:text-amber-400">{index + 1}</span>
              <span className="flex flex-col gap-1">
                <span className="font-semibold leading-snug">{article.title}</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">{article.views} lectures</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
