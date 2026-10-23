import { Search } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Rechercher...',
  className,
}: SearchInputProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <Search
        size={18}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-none border border-slate-300 bg-white py-2 pr-4 pl-10 text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-white"
      />
    </div>
  )
}
