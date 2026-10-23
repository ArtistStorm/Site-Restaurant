import { useQuery } from '@tanstack/react-query'
import { restaurantApi } from '@/shared/api/restaurant-api'

export function useBlogArticles() {
  return useQuery({
    queryKey: ['blog-articles'],
    queryFn: () => restaurantApi.blog.list(),
  })
}
