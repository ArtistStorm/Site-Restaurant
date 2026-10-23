import { LogOut } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { usePermissions } from '@/shared/hooks/usePermissions'
import { cn } from '@/shared/lib/cn'

const reviewsLink = { label: 'Suivi des avis', to: '/mon-espace/avis' }
const settingsLink = { label: 'Paramètres', to: '/mon-espace/parametres' }

export function MemberSpacePage() {
  const logout = useLogout()
  const { isAdmin } = usePermissions()
  const visibleLinks = isAdmin ? [settingsLink] : [reviewsLink, settingsLink]
  const subtitle = isAdmin
    ? 'Gérez les paramètres de votre compte responsable.'
    : 'Suivez vos avis et gérez votre compte.'

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Mon espace</h1>
          <p className="text-slate-600 dark:text-slate-400">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={() => logout.mutate()}
          className="flex items-center gap-2 rounded-none bg-bordeaux px-4 py-2 font-medium text-white transition-colors hover:bg-vigne dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          <LogOut size={18} aria-hidden="true" />
          Se déconnecter
        </button>
      </header>

      <nav aria-label="Sections de mon espace" className="border-b border-slate-200 dark:border-slate-700">
        <ul className="flex flex-wrap gap-2">
          {visibleLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'block rounded-t-lg px-4 py-2 font-medium transition-colors hover:bg-slate-200 dark:hover:bg-slate-800',
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
