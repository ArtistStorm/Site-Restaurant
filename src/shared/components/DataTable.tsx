import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

export type Column<T> = {
  key: string
  header: string
  render: (row: T) => ReactNode
  className?: string
}

type DataTableProps<T> = {
  caption: string
  columns: Column<T>[]
  rows: T[]
  getRowKey: (row: T) => string
  emptyMessage: string
}

export function DataTable<T>({ caption, columns, rows, getRowKey, emptyMessage }: DataTableProps<T>) {
  if (rows.length === 0) {
    return <p className="text-slate-600 dark:text-slate-400">{emptyMessage}</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            {columns.map((column) => (
              <th key={column.key} scope="col" className="py-2 pr-4 font-bold">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)} className="border-b border-slate-100 dark:border-slate-800">
              {columns.map((column) => (
                <td key={column.key} className={cn('py-2 pr-4', column.className)}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
