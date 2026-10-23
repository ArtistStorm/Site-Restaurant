import { Link, useParams } from 'react-router-dom'
import { useBlogArticle } from '@/features/blog/hooks/useBlogArticle'
import { useBlogArticles } from '@/features/blog/hooks/useBlogArticles'
import {
  estimateReadingMinutes,
  formatArticleDate,
  getParagraphs,
  getRelatedArticles,
} from '@/features/blog/lib/article-utils'
import { Skeleton } from '@/shared'
import { Breadcrumbs } from '@/shared/components/Breadcrumbs'
import { EmptyState } from '@/shared/components/EmptyState'

export function ArticlePage() {
  const { articleId } = useParams()
  const { data: article, isPending, isError } = useBlogArticle(articleId)
  const { data: allArticles } = useBlogArticles()

  if (isPending) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-4 p-4">
        <Skeleton variant="title" />
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-2/3" />
      </main>
    )
  }

  if (isError || article === undefined) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4">
        <EmptyState title="Cet article n'existe pas." description="Il a peut-être été retiré ou déplacé." />
        <Link to="/blog" className="self-start font-medium underline">
          Retour au blog
        </Link>
      </main>
    )
  }

  const related = getRelatedArticles(article, allArticles ?? [])
  const paragraphs = getParagraphs(article.content)

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-4">
      <Breadcrumbs items={[{ label: 'Blog', to: '/blog' }, { label: article.title }]} />

      <header className="flex max-w-3xl flex-col gap-4">
        <span className="text-sm font-semibold uppercase text-bordeaux dark:text-amber-400">{article.category}</span>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{article.title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{article.excerpt}</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Par {article.author} · {formatArticleDate(article.publishedAt)} · {estimateReadingMinutes(article.content)} min
          de lecture
        </p>
      </header>

      <div className="flex h-64 items-center justify-center rounded-2xl bg-slate-200 text-slate-600 sm:h-[440px] dark:bg-slate-800 dark:text-slate-400">
        {article.category}
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="flex max-w-2xl flex-col gap-5 text-lg leading-relaxed text-slate-800 dark:text-slate-200">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        <aside
          aria-labelledby="related-articles-title"
          className="flex flex-col gap-4 self-start rounded-none border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
        >
          <h2 id="related-articles-title" className="text-lg font-bold">
            Articles liés
          </h2>
          <ul className="flex flex-col gap-3">
            {related.map((item) => (
              <li key={item.id}>
                <Link to={`/blog/${item.id}`} className="hover:text-bordeaux hover:underline dark:hover:text-amber-400">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  )
}
