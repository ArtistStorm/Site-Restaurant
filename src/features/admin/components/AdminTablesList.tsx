import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getTableErrorMessage } from '@/features/admin/hooks/useCreateTable'
import { useAdminTables } from '@/features/admin/hooks/useAdminTables'
import { useSetTableActive } from '@/features/admin/hooks/useSetTableActive'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { Pagination } from '@/shared/components/Pagination'
import { Skeleton } from '@/shared'
import type { Table } from '@/shared/types/restaurant'

function parsePage(value: string | null) {
  const page = Number.parseInt(value ?? '1', 10)
  return Number.isInteger(page) && page >= 1 ? page : 1
}

export function AdminTablesList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedPage = parsePage(searchParams.get('page'))
  const { data, isPending, isError, isPlaceholderData } = useAdminTables(requestedPage)
  const setTableActive = useSetTableActive()
  const [tableToClose, setTableToClose] = useState<Table | null>(null)

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
    return <p className="text-red-600 dark:text-red-400">Impossible de charger les tables.</p>
  }

  const columns: Column<Table>[] = [
    { key: 'number', header: 'Table', render: (table) => `Table ${table.number}` },
    { key: 'location', header: 'Lieu', render: (table) => table.location },
    { key: 'capacity', header: 'Places', render: (table) => table.capacity },
    {
      key: 'status',
      header: 'Statut',
      render: (table) => (
        <span className={table.active ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
          {table.active ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      render: (table) => (
        <button
          type="button"
          disabled={setTableActive.isPending}
          onClick={() => {
            if (table.active) {
              setTableToClose(table)
            } else {
              setTableActive.mutate({ tableId: table.id, active: true })
            }
          }}
          className="rounded-none border border-slate-300 px-3 py-1 font-medium hover:bg-slate-200 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          {table.active ? 'Désactiver' : 'Activer'}
        </button>
      ),
    },
  ]

  const goToPage = (page: number) => {
    setSearchParams({ page: String(page) })
  }

  return (
    <div className={isPlaceholderData ? 'flex flex-col gap-3 opacity-60' : 'flex flex-col gap-3'}>
      {setTableActive.isError && (
        <p className="text-sm text-red-600 dark:text-red-400">{getTableErrorMessage(setTableActive.error)}</p>
      )}

      <DataTable
        caption="Liste des tables"
        columns={columns}
        rows={data.items}
        getRowKey={(table) => table.id}
        emptyMessage="Aucune table pour le moment."
      />

      {data.totalPages > 1 && (
        <Pagination page={data.page} totalPages={data.totalPages} onPageChange={goToPage} />
      )}

      {requestedPage > data.totalPages && (
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Cette page n'existe pas. Revenez à la page {data.totalPages}.
        </p>
      )}

      <ConfirmDialog
        open={tableToClose !== null}
        onOpenChange={(open) => {
          if (!open) {
            setTableToClose(null)
          }
        }}
        title={`Désactiver la table ${tableToClose?.number ?? ''} ?`}
        description="Les membres ne pourront plus réserver cette table tant qu'elle reste désactivée."
        confirmLabel="Désactiver"
        onConfirm={() => {
          if (tableToClose) {
            setTableActive.mutate({ tableId: tableToClose.id, active: false })
          }
          setTableToClose(null)
        }}
      />
    </div>
  )
}
