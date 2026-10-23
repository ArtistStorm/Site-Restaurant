import { useQuery } from '@tanstack/react-query'
import { restaurantApi } from '@/shared/api/restaurant-api'
import { useAuthStore } from '@/features/auth/auth-store'

export function useMyReservations() {
  const token = useAuthStore((state) => state.token)
  const memberId = useAuthStore((state) => state.memberId) ?? ''

  return useQuery({
    queryKey: ['reservations', memberId],
    queryFn: () => restaurantApi.members.reservations(memberId),
    enabled: token !== null && memberId !== '',
  })
}
