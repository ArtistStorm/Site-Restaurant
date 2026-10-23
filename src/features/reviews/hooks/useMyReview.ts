import { useQuery } from '@tanstack/react-query'
import { restaurantApi } from '@/shared/api/restaurant-api'
import { useAuthStore } from '@/features/auth/auth-store'

export function useMyReview() {
  const token = useAuthStore((state) => state.token)

  return useQuery({
    queryKey: ['reviews', 'mine', token],
    queryFn: () => restaurantApi.reviews.mine(),
    enabled: token !== null,
  })
}
