import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { restaurantApi } from '@/shared/api/restaurant-api'

export const reviewsPageSize = 10

export function useReviews(page: number, pageSize: number = reviewsPageSize) {
  return useQuery({
    queryKey: ['reviews', 'list', page, pageSize],
    queryFn: () => restaurantApi.reviews.list({ page, pageSize }),
    placeholderData: keepPreviousData,
  })
}
