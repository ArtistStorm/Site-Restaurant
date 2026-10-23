import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ApiErrorBody } from '@/shared'
import { restaurantApi } from '@/shared/api/restaurant-api'
import { notifySuccess } from '@/features/notifications/notify-success'

export function useDeleteReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (reviewId: string) => restaurantApi.admin.deleteReview(reviewId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['reviews'] })
      notifySuccess('Avis supprimé.')
    },
  })
}

export function useReplyToReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: { reviewId: string; text: string }) =>
      restaurantApi.admin.replyToReview(values.reviewId, values.text),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
  })
}

export function useDeleteReviewReply() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (reviewId: string) => restaurantApi.admin.deleteReviewReply(reviewId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['reviews'] })
      notifySuccess('Réponse supprimée.')
    },
  })
}

export function getReviewActionErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.message ?? 'Une erreur est survenue.'
  }

  return 'Impossible de joindre le serveur.'
}
