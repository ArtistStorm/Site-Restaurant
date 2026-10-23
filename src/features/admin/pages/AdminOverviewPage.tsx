import { lazy, Suspense } from 'react'
import { CalendarCheck, CalendarClock, Star, Table2, Users } from 'lucide-react'
import { StatCard } from '@/features/admin/components/StatCard'
import { useAdminDashboard } from '@/features/admin/hooks/useAdminDashboard'
import { Skeleton } from '@/shared'

const averageFormatOptions = { minimumFractionDigits: 1, maximumFractionDigits: 1 }

const ReservationsChart = lazy(() =>
  import('@/features/admin/components/ReservationsChart').then((loaded) => ({
    default: loaded.ReservationsChart,
  })),
)

export function AdminOverviewPage() {
  const dashboard = useAdminDashboard()
  const data = dashboard.data

  return (
    <div className="flex flex-col gap-6">
      {dashboard.isPending && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Skeleton variant="bar" className="h-24" />
          <Skeleton variant="bar" className="h-24" />
          <Skeleton variant="bar" className="h-24" />
          <Skeleton variant="bar" className="h-24" />
          <Skeleton variant="bar" className="h-24" />
        </div>
      )}

      {dashboard.isError && (
        <p className="text-red-600 dark:text-red-400">Impossible de charger le tableau de bord.</p>
      )}

      {data && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            label="Réservations aujourd'hui"
            value={String(data.todayReservations)}
            hint="Réservations confirmées"
            icon={CalendarCheck}
          />
          <StatCard
            label="Réservations à venir"
            value={String(data.upcomingReservations)}
            hint="Confirmées et pas encore commencées"
            icon={CalendarClock}
          />
          <StatCard label="Clients actifs" value={String(data.memberCount)} icon={Users} />
          <StatCard
            label="Tables ouvertes"
            value={`${data.openTables} / ${data.totalTables}`}
            hint="Tables disponibles à la réservation"
            icon={Table2}
          />
          <StatCard
            label="Note moyenne"
            value={
              data.review.average === null
                ? '—'
                : `${data.review.average.toLocaleString('fr-FR', averageFormatOptions)} / 5`
            }
            hint={`${data.review.count} avis`}
            icon={Star}
          />
        </div>
      )}

      <section className="flex flex-col gap-4 rounded-none border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-bold">Réservations des 14 prochains jours</h2>
        <Suspense fallback={<Skeleton variant="bar" className="h-72" />}>
          <ReservationsChart />
        </Suspense>
      </section>
    </div>
  )
}
