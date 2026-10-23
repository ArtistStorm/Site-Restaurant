import { useQuery } from '@tanstack/react-query'
import { restaurantApi } from '@/shared/api/restaurant-api'

export function useAvailableTables() {
  const start = new Date()
  start.setHours(19, 0, 0, 0)
  const end = new Date(start)
  end.setHours(21, 0, 0, 0)

  return useQuery({
    queryKey: ['available-tables', start.toISOString()],
    queryFn: () =>
      restaurantApi.tables.available({
        reservationDate: start.toISOString(),
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        guestCount: 2,
      }),
    refetchInterval: 60_000,
  })
}
