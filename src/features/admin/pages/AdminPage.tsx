import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '@/shared/lib/cn'

const adminLinks = [
  { label: "Vue d'ensemble", to: '/admin' },
  { label: 'Tables', to: '/admin/tables' },
  { label: 'Carte', to: '/admin/carte' },
  { label: 'Blog', to: '/admin/blog' },
  { label: "Journal d'activité", to: '/admin/journal' },
  { label: 'Avis', to: '/admin/avis' },
]

export function AdminPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Espace responsable</h1>
        <p className="text-slate-600 dark:text-slate-400">Bienvenue dans l'espace de gestion du restaurant.</p>
      </header>

      <nav aria-label="Sections du responsable">
        <ul className="flex flex-wrap gap-2">
          {adminLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/admin'}
                className={({ isActive }) =>
                  cn(
                    'rounded-none px-3 py-2 font-medium hover:bg-slate-200 dark:hover:bg-slate-800',
                    isActive && 'bg-slate-200 dark:bg-slate-800',
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Outlet />
    </main>
  )
}
