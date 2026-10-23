import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ApiErrorBody } from '@/shared'
import { restaurantApi, type SubmitReviewValues } from '@/shared/api/restaurant-api'
import { notifySuccess } from '@/features/notifications/notify-success'

export function useSubmitReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: SubmitReviewValues) => restaurantApi.reviews.submit(values),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['reviews'] })
      notifySuccess('Votre avis a bien été enregistré.')
    },
  })
}

export function getSubmitReviewErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.message ?? 'Une erreur est survenue.'
  }

  return 'Impossible de joindre le serveur.'
}
