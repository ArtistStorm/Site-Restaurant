import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export type BreadcrumbItem = {
  label: string
  to?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Fil d'Ariane">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.to && !isLast ? (
                <Link to={item.to} className="hover:text-slate-900 hover:underline dark:hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={isLast ? 'font-medium text-slate-900 dark:text-white' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight size={16} aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
