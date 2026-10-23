import { useMutation, useQueryClient } from '@tanstack/react-query'
import { restaurantApi, type BlogArticleValues } from '@/shared/api/restaurant-api'
import { notifySuccess } from '@/features/notifications/notify-success'

export function useCreateBlogArticle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: BlogArticleValues) => restaurantApi.admin.createBlogArticle(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-articles'] })
      notifySuccess('Article publié.')
    },
  })
}

export function useDeleteBlogArticle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (articleId: string) => restaurantApi.admin.deleteBlogArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-articles'] })
      notifySuccess('Article supprimé.')
    },
  })
}
