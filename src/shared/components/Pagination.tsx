import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

const buttonClassName =
  'flex items-center gap-1 rounded-none border border-slate-300 px-3 py-2 font-medium hover:bg-slate-200 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800'

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-between gap-3">
      <button
        type="button"
        className={buttonClassName}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft size={18} aria-hidden="true" />
        Précédent
      </button>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Page {page} sur {totalPages}
      </p>
      <button
        type="button"
        className={buttonClassName}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Suivant
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </nav>
  )
}
