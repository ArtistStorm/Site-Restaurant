import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { restaurantApi } from '@/shared/api/restaurant-api'

export const logsPageSize = 10

export function useActivityLogs(page: number) {
  return useQuery({
    queryKey: ['admin', 'activity-logs', page],
    queryFn: () => restaurantApi.admin.logs({ page, pageSize: logsPageSize }),
    placeholderData: keepPreviousData,
  })
}
