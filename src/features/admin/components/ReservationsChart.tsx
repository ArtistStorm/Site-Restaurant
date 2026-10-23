import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useReservationStats } from '@/features/admin/hooks/useReservationStats'
import { Skeleton, useTheme } from '@/shared'

function formatDay(date: string): string {
  return `${date.slice(8, 10)}/${date.slice(5, 7)}`
}

export function ReservationsChart() {
  const { data, isPending, isError } = useReservationStats()
  const { theme } = useTheme()

  if (isPending) {
    return <Skeleton variant="bar" className="h-64" />
  }

  if (isError) {
    return <p className="text-red-600 dark:text-red-400">Impossible de charger les statistiques.</p>
  }

  const stats = data ?? []
  const isDark = theme === 'dark'
  const lineColor = isDark ? '#3987e5' : '#2a78d6'
  const tickColor = isDark ? '#c3c2b7' : '#52514e'

  return (
    <div className="flex flex-col gap-3">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stats} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.3} vertical={false} />
            <XAxis dataKey="date" tickFormatter={formatDay} tick={{ fill: tickColor, fontSize: 12 }} />
            <YAxis allowDecimals={false} width={32} tick={{ fill: tickColor, fontSize: 12 }} />
            <Tooltip labelFormatter={(label) => formatDay(String(label))} />
            <Line
              type="monotone"
              dataKey="reservations"
              name="Réservations"
              stroke={lineColor}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <details className="text-sm">
        <summary className="cursor-pointer text-slate-600 dark:text-slate-400">Voir les données</summary>
        <table className="mt-2 w-full text-left">
          <thead>
            <tr>
              <th className="border-b border-slate-300 px-2 py-1 dark:border-slate-700">Date</th>
              <th className="border-b border-slate-300 px-2 py-1 dark:border-slate-700">Réservations</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr key={stat.date}>
                <td className="px-2 py-1">{formatDay(stat.date)}</td>
                <td className="px-2 py-1">{stat.reservations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  )
}
