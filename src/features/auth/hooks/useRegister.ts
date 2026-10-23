import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { type ApiErrorBody } from '@/shared'
import { restaurantApi, type RegisterValues } from '@/shared/api/restaurant-api'

export function useRegister() {
  return useMutation({
    mutationFn: async (values: RegisterValues) => {
      const data = await restaurantApi.members.register(values)
      return data.id
    },
  })
}

export function getRegisterErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.message ?? 'Une erreur est survenue.'
  }

  return 'Impossible de joindre le serveur.'
}
