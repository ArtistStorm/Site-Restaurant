import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useCreateBlogArticle } from '@/features/admin/hooks/useBlogArticleActions'
import { blogArticleSchema, type BlogArticleFormValues } from '@/features/admin/types/blog-article-schema'
import { getApiErrorMessage } from '@/shared/lib/api-error'

const inputClassName =
  'rounded-none border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-white'

export function BlogArticleForm() {
  const createArticle = useCreateBlogArticle()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogArticleFormValues>({
    resolver: zodResolver(blogArticleSchema),
  })

  const onSubmit = (values: BlogArticleFormValues) => {
    createArticle.mutate(values, {
      onSuccess: () => {
        reset()
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="article-title" className="font-medium">
          Titre
        </label>
        <input id="article-title" type="text" className={inputClassName} {...register('title')} />
        {errors.title && <p className="text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="article-category" className="font-medium">
          Catégorie
        </label>
        <input id="article-category" type="text" className={inputClassName} {...register('category')} />
        {errors.category && <p className="text-sm text-red-600 dark:text-red-400">{errors.category.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="article-author" className="font-medium">
          Auteur
        </label>
        <input id="article-author" type="text" className={inputClassName} {...register('author')} />
        {errors.author && <p className="text-sm text-red-600 dark:text-red-400">{errors.author.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="article-excerpt" className="font-medium">
          Résumé
        </label>
        <textarea id="article-excerpt" rows={3} className={inputClassName} {...register('excerpt')} />
        {errors.excerpt && <p className="text-sm text-red-600 dark:text-red-400">{errors.excerpt.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="article-content" className="font-medium">
          Contenu
        </label>
        <textarea id="article-content" rows={10} className={inputClassName} {...register('content')} />
        <p className="text-sm text-slate-600 dark:text-slate-400">Séparez les paragraphes par une ligne vide.</p>
        {errors.content && <p className="text-sm text-red-600 dark:text-red-400">{errors.content.message}</p>}
      </div>

      {createArticle.isError && (
        <p className="text-sm text-red-600 dark:text-red-400">{getApiErrorMessage(createArticle.error)}</p>
      )}

      <button
        type="submit"
        disabled={createArticle.isPending}
        className="flex items-center justify-center gap-2 rounded-none bg-bordeaux px-4 py-2 font-medium text-white hover:bg-vigne disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
      >
        {createArticle.isPending ? (
          <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
        ) : (
          <Plus size={18} aria-hidden="true" />
        )}
        Publier l'article
      </button>
    </form>
  )
}
