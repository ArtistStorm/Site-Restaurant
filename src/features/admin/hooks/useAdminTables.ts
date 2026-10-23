import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { restaurantApi } from '@/shared/api/restaurant-api'

export const tablesPageSize = 5

export function useAdminTables(page: number) {
  return useQuery({
    queryKey: ['tables', 'admin', page],
    queryFn: () => restaurantApi.admin.tables({ page, pageSize: tablesPageSize }),
    placeholderData: keepPreviousData,
  })
}
