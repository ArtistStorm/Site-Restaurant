import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type AuthState = {
  token: string | null
  memberId: string | null
  setSession: (token: string, memberId: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      memberId: null,
      setSession: (token, memberId) => set({ token, memberId }),
      logout: () => set({ token: null, memberId: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
