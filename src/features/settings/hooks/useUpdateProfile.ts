import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ApiErrorBody } from '@/shared'
import { restaurantApi } from '@/shared/api/restaurant-api'
import { useAuthStore } from '@/features/auth/auth-store'
import { notifySuccess } from '@/features/notifications/notify-success'

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  const memberId = useAuthStore((state) => state.memberId) ?? ''

  return useMutation({
    mutationFn: (name: string) => restaurantApi.members.updateProfile(memberId, name),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['member'] })
      notifySuccess('Votre nom a bien été mis à jour.')
    },
  })
}

export function getSettingsErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.message ?? 'Une erreur est survenue.'
  }

  return 'Impossible de joindre le serveur.'
}
