import { useQuery } from '@tanstack/react-query'
import { restaurantApi } from '@/shared/api/restaurant-api'

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: () => restaurantApi.admin.dashboard(),
  })
}
