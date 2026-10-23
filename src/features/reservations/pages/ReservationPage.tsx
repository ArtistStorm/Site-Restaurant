import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '@/shared/lib/cn'
import { Breadcrumbs } from '@/shared'

const reservationLinks = [
  { label: 'Nouvelle réservation', to: '/reserver' },
  { label: 'Mes réservations', to: '/reserver/mes-reservations' },
]

export function ReservationPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4">
      <Breadcrumbs items={[{ label: 'Réserver' }]} />
      <h1 className="text-2xl font-bold">Réserver</h1>

      <nav aria-label="Sections de la réservation" className="border-b border-slate-200 dark:border-slate-700">
        <ul className="flex flex-wrap gap-2">
          {reservationLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/reserver'}
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
