import { useSearchParams } from 'react-router-dom'
import { useActivityLogs } from '@/features/admin/hooks/useActivityLogs'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { Pagination } from '@/shared/components/Pagination'
import { Skeleton } from '@/shared'
import type { ActivityLog } from '@/shared/types/restaurant'

const actionLabels: Record<string, string> = {
  MEMBER_REGISTERED: 'Inscription',
  RESERVATION_CREATED: 'Réservation créée',
  RESERVATION_CANCELLED: 'Réservation annulée',
  TABLE_CREATED: 'Table ajoutée',
  TABLE_ACTIVATED: 'Table ouverte',
  REVIEW_CREATED: 'Avis publié',
  REVIEW_UPDATED: 'Avis modifié',
  REVIEW_DELETED: 'Avis supprimé',
  REVIEW_REPLIED: 'Réponse à un avis',
  REVIEW_REPLY_DELETED: 'Réponse à un avis supprimée',
  TABLE_DEACTIVATED: 'Table fermée',
}

function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function parsePage(value: string | null) {
  const page = Number.parseInt(value ?? '1', 10)
  return Number.isInteger(page) && page >= 1 ? page : 1
}

const columns: Column<ActivityLog>[] = [
  { key: 'date', header: 'Date', render: (log) => formatDate(log.createdAt), className: 'whitespace-nowrap' },
  { key: 'action', header: 'Action', render: (log) => actionLabels[log.action] ?? log.action },
  {
    key: 'member',
    header: 'Membre',
    render: (log) => <span className="font-mono" title={log.memberId}>{log.memberId.slice(0, 8)}</span>,
  },
  { key: 'details', header: 'Détail', render: (log) => log.details },
]

export function ActivityLogsTable() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedPage = parsePage(searchParams.get('page'))
  const { data, isPending, isError, isPlaceholderData } = useActivityLogs(requestedPage)

  if (isPending) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton variant="title" />
        <Skeleton variant="title" />
        <Skeleton variant="title" />
      </div>
    )
  }

  if (isError) {
    return <p className="text-red-600 dark:text-red-400">Impossible de charger le journal.</p>
  }

  const goToPage = (page: number) => {
    setSearchParams({ page: String(page) })
  }

  return (
    <div className={isPlaceholderData ? 'flex flex-col gap-4 opacity-60' : 'flex flex-col gap-4'}>
      <DataTable
        caption="Journal d'activité"
        columns={columns}
        rows={data.items}
        getRowKey={(log) => log.id}
        emptyMessage="Aucune action enregistrée pour le moment."
      />

      {data.totalPages > 1 && (
        <Pagination page={data.page} totalPages={data.totalPages} onPageChange={goToPage} />
      )}

      {requestedPage > data.totalPages && (
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Cette page n'existe pas. Revenez à la page {data.totalPages}.
        </p>
      )}
    </div>
  )
}
