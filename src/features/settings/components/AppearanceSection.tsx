import { useTheme } from '@/shared/hooks/useTheme'
import { cn } from '@/shared'

const themeOptions = [
  { value: 'light', label: 'Clair' },
  { value: 'dark', label: 'Sombre' },
] as const

export function AppearanceSection() {
  const { theme, setTheme } = useTheme()

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-medium">Thème de l'interface</legend>
      <div className="flex flex-wrap gap-2">
        {themeOptions.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex cursor-pointer items-center gap-2 rounded-none border px-4 py-2 transition-colors',
              theme === option.value
                ? 'border-vigne bg-bordeaux text-white dark:border-white dark:bg-white dark:text-slate-900'
                : 'border-slate-300 hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-800',
            )}
          >
            <input
              type="radio"
              name="theme"
              value={option.value}
              checked={theme === option.value}
              onChange={() => setTheme(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
