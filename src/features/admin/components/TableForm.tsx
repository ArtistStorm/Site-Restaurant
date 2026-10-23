import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { getTableErrorMessage, useCreateTable } from '@/features/admin/hooks/useCreateTable'
import { tableSchema, type TableFormValues } from '@/features/admin/types/table-schema'

const inputClassName =
  'rounded-none border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-white'

export function TableForm() {
  const createTable = useCreateTable()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TableFormValues>({
    resolver: zodResolver(tableSchema),
  })

  const onSubmit = (values: TableFormValues) => {
    createTable.mutate(values, {
      onSuccess: () => {
        reset()
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="number" className="font-medium">
          Numéro de table
        </label>
        <input id="number" type="number" className={inputClassName} {...register('number', { valueAsNumber: true })} />
        {errors.number && <p className="text-sm text-red-600 dark:text-red-400">{errors.number.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="capacity" className="font-medium">
          Nombre de places
        </label>
        <input id="capacity" type="number" className={inputClassName} {...register('capacity', { valueAsNumber: true })} />
        {errors.capacity && <p className="text-sm text-red-600 dark:text-red-400">{errors.capacity.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="location" className="font-medium">
          Lieu
        </label>
        <input id="location" type="text" className={inputClassName} {...register('location')} />
        {errors.location && <p className="text-sm text-red-600 dark:text-red-400">{errors.location.message}</p>}
      </div>

      {createTable.isError && (
        <p className="text-sm text-red-600 dark:text-red-400">{getTableErrorMessage(createTable.error)}</p>
      )}

      <button
        type="submit"
        disabled={createTable.isPending}
        className="flex items-center justify-center gap-2 rounded-none bg-bordeaux px-4 py-2 font-medium text-white hover:bg-vigne disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
      >
        {createTable.isPending ? <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
        Ajouter la table
      </button>
    </form>
  )
}
