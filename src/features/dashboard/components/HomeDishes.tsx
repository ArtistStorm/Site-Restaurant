import { Link } from 'react-router-dom'
import { useMenuItems } from '@/features/menu/hooks/useMenuItems'

const highlights = [
  { category: 'entrees', label: 'Entrée' },
  { category: 'plats', label: 'Plat' },
  { category: 'desserts', label: 'Dessert' },
]

export function HomeDishes() {
  const { data, isPending, isError } = useMenuItems()

  return (
    <section aria-labelledby="home-dishes-title" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 id="home-dishes-title" className="text-3xl font-semibold">
          Nos classiques
        </h2>
        <p className="text-slate-600 dark:text-slate-300">Une entrée, un plat et un dessert pour découvrir la maison.</p>
      </div>

      {isPending && <p className="text-slate-600 dark:text-slate-400">Chargement de la carte…</p>}

      {isError && <p className="text-red-600 dark:text-red-400">Impossible de charger la carte.</p>}

      {!isPending && !isError && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {highlights.map((highlight) => {
            const item = data?.find((menuItem) => menuItem.category === highlight.category)

            if (item === undefined) {
              return null
            }

            return (
              <li key={item.id}>
                <Link
                  to={`/carte/${item.category}/${item.id}`}
                  className="flex h-full flex-col gap-2 border border-slate-300 bg-white p-6 transition-colors hover:border-vigne dark:border-slate-700 dark:bg-slate-900 dark:hover:border-or"
                >
                  <span className="text-sm font-semibold tracking-[0.18em] text-bordeaux uppercase dark:text-or">
                    {highlight.label}
                  </span>
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <span className="mt-auto text-lg font-medium text-vigne dark:text-or">
                    {item.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
