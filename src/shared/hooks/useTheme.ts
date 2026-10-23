import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

type ThemeState = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export function useTheme() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const setTheme = useThemeStore((state) => state.setTheme)

  return { theme, toggleTheme, setTheme }
}
