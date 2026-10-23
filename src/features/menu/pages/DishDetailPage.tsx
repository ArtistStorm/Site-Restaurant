import { useParams } from 'react-router-dom'
import { Breadcrumbs, MarkdownRenderer, Skeleton } from '@/shared'
import { useMenuItem } from '@/features/menu/hooks/useMenuItem'
import { menuCategories } from '@/features/menu/types/menu'
import { NotFoundPage } from '@/features/site/pages/NotFoundPage'

export function DishDetailPage() {
  const { category: categorySlug, dishId } = useParams()
  const category = menuCategories.find((item) => item.slug === categorySlug)
  const { data: dish, isPending, isError, error } = useMenuItem(dishId)

  if (!category) {
    return <NotFoundPage />
  }

  const categoryCrumb = { label: category.label, to: `/carte/${category.slug}` }

  if (isPending) {
    return (
      <div className="flex flex-col gap-4">
        <Breadcrumbs items={[{ label: 'Carte', to: '/carte' }, { label: category.label }]} />
        <Skeleton variant="title" />
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-2/3" />
      </div>
    )
  }

  if (isError) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue'
    return (
      <div className="flex flex-col gap-4">
        <Breadcrumbs items={[{ label: 'Carte', to: '/carte' }, { label: category.label }]} />
        <p className="text-red-600 dark:text-red-400">{message}</p>
      </div>
    )
  }

  if (!dish || dish.category !== category.slug) {
    return <NotFoundPage />
  }

  const price = dish.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

  return (
    <article className="flex flex-col gap-4">
      <Breadcrumbs items={[{ label: 'Carte', to: '/carte' }, categoryCrumb, { label: dish.title }]} />
      <h2 className="text-xl font-bold">{dish.title}</h2>
      <p className="font-medium text-slate-600 dark:text-slate-300">{price}</p>
      <MarkdownRenderer content={dish.description} />
    </article>
  )
}
