import { NavLink } from 'react-router-dom'
import { cn } from '@/shared'
import { menuCategories } from '@/features/menu/types/menu'

export function CarteTabs() {
  return (
    <nav aria-label="Catégories de la carte">
      <ul className="flex flex-wrap gap-2">
        {menuCategories.map((category) => (
          <li key={category.slug}>
            <NavLink
              to={`/carte/${category.slug}`}
              className={({ isActive }) =>
                cn(
                  'rounded-full border px-4 py-2 text-sm font-medium',
                  isActive
                    ? 'border-vigne bg-bordeaux text-white dark:border-white dark:bg-white dark:text-slate-900'
                    : 'border-slate-300 hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-800',
                )
              }
            >
              {category.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
