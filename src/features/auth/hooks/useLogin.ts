import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { type ApiErrorBody } from '@/shared'
import { restaurantApi, type LoginValues } from '@/shared/api/restaurant-api'
import { useAuthStore } from '@/features/auth/auth-store'

export function useLogin() {
  const navigate = useNavigate()
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: (values: LoginValues) => restaurantApi.members.login(values),
    onSuccess: (data) => {
      setSession(data.token, data.memberId)
      navigate('/')
    },
  })
}

export function getLoginErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.message ?? 'Une erreur est survenue.'
  }

  return 'Impossible de joindre le serveur.'
}
