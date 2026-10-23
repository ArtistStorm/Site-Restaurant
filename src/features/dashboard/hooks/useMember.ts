import { useQuery } from '@tanstack/react-query'
import { restaurantApi } from '@/shared/api/restaurant-api'
import { useAuthStore } from '@/features/auth/auth-store'

export function useMember() {
  const memberId = useAuthStore((state) => state.memberId) ?? ''

  return useQuery({
    queryKey: ['member', memberId],
    queryFn: () => restaurantApi.members.get(memberId),
    enabled: memberId !== '',
  })
}
