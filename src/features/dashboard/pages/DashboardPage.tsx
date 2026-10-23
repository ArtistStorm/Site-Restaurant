import { LogIn, LogOut } from 'lucide-react'
import { useAuthStore } from '@/features/auth/auth-store'
import { ErrorBoundary } from 'react-error-boundary'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { useMember } from '@/features/dashboard/hooks/useMember'
import { DashboardErrorFallback } from '@/features/dashboard/components/DashboardErrorFallback'
import { MyTableCard } from '@/features/dashboard/components/MyTableCard'
import { UpcomingCountBadge } from '@/features/dashboard/components/UpcomingCountBadge'
import { AvailableTablesCard } from '@/features/dashboard/components/AvailableTablesCard'
import { ReviewsSummaryCard } from '@/features/dashboard/components/ReviewsSummaryCard'
import { NextReservationCard } from '@/features/dashboard/components/NextReservationCard'
import { HomeBenefits } from '@/features/dashboard/components/HomeBenefits'
import { HomeDishes } from '@/features/dashboard/components/HomeDishes'
import { HomeHero } from '@/features/dashboard/components/HomeHero'
import { Link } from 'react-router-dom'

export function DashboardPage() {
  const token = useAuthStore((state) => state.token)
  const logout = useLogout()
  const { data: member } = useMember()
  const isConnected = token !== null

  return (
    <>
      <HomeHero />
      <HomeBenefits />
          <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">{member ? `Bonjour, ${member.name}` : 'Accueil'}</h1>
            {isConnected ? (
              <button
                type="button"
                onClick={() => logout.mutate()}
                className="flex items-center gap-2 rounded-none bg-bordeaux px-4 py-2 font-medium text-white transition-colors hover:bg-vigne dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                <LogOut size={18} aria-hidden="true" />
                Se déconnecter
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-none bg-bordeaux px-4 py-2 font-medium text-white transition-colors hover:bg-vigne dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                <LogIn size={18} aria-hidden="true" />
                Se connecter
              </Link>
            )}
          </header>

          <ErrorBoundary FallbackComponent={DashboardErrorFallback}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <NextReservationCard />
              </div>
              <UpcomingCountBadge />
              <AvailableTablesCard />
              <ReviewsSummaryCard />
              <MyTableCard />
              <Link
                to="/reserver"
                className="flex flex-col gap-2 rounded-none border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:col-span-2 xl:col-span-3 dark:border-slate-700 dark:bg-slate-900"
              >
                <span className="text-lg font-bold">Réserver une table</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Choisissez une date et un créneau. Pas besoin de compte pour réserver.</span>
              </Link>
            </div>
          </ErrorBoundary>

          <HomeDishes />
            </main>
    </>
  )
}
