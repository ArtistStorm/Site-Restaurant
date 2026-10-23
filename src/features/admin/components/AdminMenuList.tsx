import { useState } from 'react'
import { useDeleteMenuItem } from '@/features/admin/hooks/useMenuItemActions'
import { useMenuItems } from '@/features/menu/hooks/useMenuItems'
import { menuCategories, type MenuItem } from '@/features/menu/types/menu'
import { Skeleton } from '@/shared'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { getApiErrorMessage } from '@/shared/lib/api-error'

function getCategoryLabel(slug: string): string {
  return menuCategories.find((category) => category.slug === slug)?.label ?? slug
}

export function AdminMenuList() {
  const { data, isPending, isError } = useMenuItems()
  const deleteItem = useDeleteMenuItem()
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null)

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
    return <p className="text-red-600 dark:text-red-400">Impossible de charger la carte.</p>
  }

  const columns: Column<MenuItem>[] = [
    { key: 'title', header: 'Produit', render: (item) => item.title },
    { key: 'category', header: 'Catégorie', render: (item) => getCategoryLabel(item.category) },
    {
      key: 'price',
      header: 'Prix',
      render: (item) => item.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }),
    },
    {
      key: 'action',
      header: 'Action',
      render: (item) => (
        <button
          type="button"
          disabled={deleteItem.isPending}
          onClick={() => setItemToDelete(item)}
          className="rounded-none border border-red-300 px-3 py-1 font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
        >
          Supprimer
        </button>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-3">
      {deleteItem.isError && (
        <p className="text-sm text-red-600 dark:text-red-400">{getApiErrorMessage(deleteItem.error)}</p>
      )}

      <DataTable
        caption="Liste des produits de la carte"
        columns={columns}
        rows={data}
        getRowKey={(item) => item.id}
        emptyMessage="Aucun produit à la carte pour le moment."
      />

      <ConfirmDialog
        open={itemToDelete !== null}
        onOpenChange={(open) => {
          if (!open) {
            setItemToDelete(null)
          }
        }}
        title="Supprimer ce produit ?"
        description="Le produit sera retiré de la carte publique."
        confirmLabel="Supprimer"
        onConfirm={() => {
          if (itemToDelete) {
            deleteItem.mutate(itemToDelete.id)
          }
          setItemToDelete(null)
        }}
      />
    </div>
  )
}
