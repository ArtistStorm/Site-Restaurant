import { LogIn } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/auth-store'
import { NotificationBell } from '@/features/notifications/components/NotificationBell'
import { ThemeToggle } from '@/shared/components/ThemeToggle'
import { cn } from '@/shared/lib/cn'
import { usePermissions } from '@/shared/hooks/usePermissions'

const siteLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Carte', to: '/carte' },
  { label: 'Réserver', to: '/reserver' },
  { label: 'Avis', to: '/avis' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Nous contacter', to: '/contact' },
  { label: 'Blog', to: '/blog' },
]

export function SiteHeader() {
  const token = useAuthStore((state) => state.token)
  const isConnected = token !== null
  const { isAdmin } = usePermissions()

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 p-4">
      <Link to="/" className="font-gothique text-3xl font-normal text-vigne dark:text-white">
        La Winstub du Tanneur
      </Link>
      <nav aria-label="Navigation principale">
        <ul className="flex flex-wrap items-center gap-2">
          {siteLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
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

      <div className="flex flex-wrap items-center justify-end gap-2">
        {isConnected ? (
          <>
            <NotificationBell />
            {isAdmin && (
              <Link
                to="/admin"
                className="rounded-none border border-slate-300 px-4 py-2 font-medium hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Administration
              </Link>
            )}
            <Link
              to="/mon-espace"
              className="rounded-none border border-slate-300 px-4 py-2 font-medium hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Mon espace
            </Link>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-none bg-bordeaux px-4 py-2 font-medium text-white hover:bg-vigne dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            <LogIn size={18} aria-hidden="true" />
            Se connecter
          </Link>
        )}
        <ThemeToggle />
      </div>
    </header>
  )
}
