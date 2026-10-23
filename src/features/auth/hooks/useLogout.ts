import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { restaurantApi } from '@/shared/api/restaurant-api'
import { useAuthStore } from '@/features/auth/auth-store'

export function useLogout() {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  return useMutation({
    mutationFn: async () => {
      try {
        await restaurantApi.members.logout()
      } finally {
        logout()
      }
    },
    onSettled: () => {
      navigate('/login')
    },
  })
}
