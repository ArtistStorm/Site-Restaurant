import { Link } from 'react-router-dom'
import type { MenuItem } from '@/features/menu/types/menu'

type DishCardProps = {
  dish: MenuItem
}

export function DishCard({ dish }: DishCardProps) {
  const price = dish.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

  return (
    <Link
      to={`/carte/${dish.category}/${dish.id}`}
      className="flex items-center justify-between gap-4 rounded-none border border-slate-200 bg-white p-4 hover:border-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-white"
    >
      <h2 className="font-bold">{dish.title}</h2>
      <p className="font-medium text-slate-600 dark:text-slate-300">{price}</p>
    </Link>
  )
}
