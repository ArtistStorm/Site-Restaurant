import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/shared/hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      className="rounded-full border border-slate-300 p-2 hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
