import { useState } from 'react'
import { useDeleteBlogArticle } from '@/features/admin/hooks/useBlogArticleActions'
import { useBlogArticles } from '@/features/blog/hooks/useBlogArticles'
import { formatArticleDate } from '@/features/blog/lib/article-utils'
import type { BlogArticle } from '@/features/blog/types/article'
import { Skeleton } from '@/shared'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { getApiErrorMessage } from '@/shared/lib/api-error'

export function AdminBlogList() {
  const { data, isPending, isError } = useBlogArticles()
  const deleteArticle = useDeleteBlogArticle()
  const [articleToDelete, setArticleToDelete] = useState<BlogArticle | null>(null)

  if (isPending) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton variant="title" />
        <Skeleton variant="title" />
        <Skeleton variant="title" />
      </div>
    )
  }

  if (isError) {
    return <p className="text-red-600 dark:text-red-400">Impossible de charger les articles.</p>
  }

  const columns: Column<BlogArticle>[] = [
    { key: 'title', header: 'Titre', render: (article) => article.title },
    { key: 'category', header: 'Catégorie', render: (article) => article.category },
    { key: 'date', header: 'Publié le', render: (article) => formatArticleDate(article.publishedAt) },
    {
      key: 'action',
      header: 'Action',
      render: (article) => (
        <button
          type="button"
          disabled={deleteArticle.isPending}
          onClick={() => setArticleToDelete(article)}
          className="rounded-none border border-red-300 px-3 py-1 font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
        >
          Supprimer
        </button>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-3">
      {deleteArticle.isError && (
        <p className="text-sm text-red-600 dark:text-red-400">{getApiErrorMessage(deleteArticle.error)}</p>
      )}

      <DataTable
        caption="Liste des articles du blog"
        columns={columns}
        rows={data}
        getRowKey={(article) => article.id}
        emptyMessage="Aucun article pour le moment."
      />

      <ConfirmDialog
        open={articleToDelete !== null}
        onOpenChange={(open) => {
          if (!open) {
            setArticleToDelete(null)
          }
        }}
        title="Supprimer cet article ?"
        description="L'article sera supprimé définitivement du blog."
        confirmLabel="Supprimer"
        onConfirm={() => {
          if (articleToDelete) {
            deleteArticle.mutate(articleToDelete.id)
          }
          setArticleToDelete(null)
        }}
      />
    </div>
  )
}
