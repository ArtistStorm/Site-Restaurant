import axios from 'axios'
import { useAuthStore } from '@/features/auth/auth-store'
import { env } from '@/shared/config/env'

export const apiClient = axios.create({
  baseURL: `${env.apiUrl}/restaurant`,
})

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token

  if (token && !config.headers.has('Authorization')) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      useAuthStore.getState().logout()
    }

    return Promise.reject(error)
  },
)
