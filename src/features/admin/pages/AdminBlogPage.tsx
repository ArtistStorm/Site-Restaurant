import { AdminBlogList } from '@/features/admin/components/AdminBlogList'
import { BlogArticleForm } from '@/features/admin/components/BlogArticleForm'

export function AdminBlogPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section className="flex flex-col gap-4 rounded-none border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-bold">Publier un article</h2>
        <BlogArticleForm />
      </section>

      <section className="flex flex-col gap-4 rounded-none border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-bold">Gestion des articles</h2>
        <AdminBlogList />
      </section>
    </div>
  )
}
