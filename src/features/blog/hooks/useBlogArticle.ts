import { useQuery } from '@tanstack/react-query'
import { restaurantApi } from '@/shared/api/restaurant-api'

export function useBlogArticle(articleId: string | undefined) {
  return useQuery({
    queryKey: ['blog-article', articleId],
    queryFn: () => restaurantApi.blog.get(articleId ?? ''),
    enabled: articleId !== undefined,
    retry: false,
  })
}
