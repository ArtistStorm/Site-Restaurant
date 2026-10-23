import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumbs, MarkdownRenderer, SearchInput } from '@/shared'
import { NotFoundPage } from '@/features/site/pages/NotFoundPage'
import { DishCard } from '@/features/menu/components/DishCard'
import { DishCardSkeleton } from '@/features/menu/components/DishCardSkeleton'
import { useMenuItems } from '@/features/menu/hooks/useMenuItems'
import { menuCategories } from '@/features/menu/types/menu'

export function CategoryPage() {
  const { category: categorySlug } = useParams()
  const category = menuCategories.find((item) => item.slug === categorySlug)
  const { data, isPending, isError } = useMenuItems()
  const [search, setSearch] = useState('')

  if (!category) {
    return <NotFoundPage />
  }

  const dishes = (data ?? []).filter((dish) => dish.category === category.slug)
  const term = search.trim().toLowerCase()
  const visibleDishes = dishes.filter((dish) => dish.title.toLowerCase().includes(term))

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs items={[{ label: 'Carte', to: '/carte' }, { label: category.label }]} />
      <MarkdownRenderer content={category.intro} className="text-slate-600 dark:text-slate-300" />
      <SearchInput value={search} onChange={setSearch} placeholder="Rechercher un plat..." />

      {isPending && (
        <div className="flex flex-col gap-3">
          <DishCardSkeleton />
          <DishCardSkeleton />
          <DishCardSkeleton />
        </div>
      )}

      {isError && <p className="text-red-600 dark:text-red-400">Impossible de charger la carte.</p>}

      {!isPending && !isError && dishes.length === 0 && (
        <p className="text-slate-600 dark:text-slate-400">Aucun plat dans cette catégorie pour le moment.</p>
      )}

      {!isPending && !isError && dishes.length > 0 && visibleDishes.length === 0 && (
        <p className="text-slate-600 dark:text-slate-400">Aucun résultat.</p>
      )}

      {!isPending && !isError && visibleDishes.length > 0 && (
        <div className="flex flex-col gap-3">
          {visibleDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      )}
    </div>
  )
}
