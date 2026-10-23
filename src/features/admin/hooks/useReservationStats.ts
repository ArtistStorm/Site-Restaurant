import { useQuery } from '@tanstack/react-query'
import { restaurantApi } from '@/shared/api/restaurant-api'

export function useReservationStats() {
  return useQuery({
    queryKey: ['admin', 'reservation-stats'],
    queryFn: () => restaurantApi.admin.reservationStats(),
  })
}
