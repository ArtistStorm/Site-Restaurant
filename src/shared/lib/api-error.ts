import axios from 'axios'
import type { ApiErrorBody } from '@/shared/types/api'

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.message ?? 'Une erreur est survenue.'
  }

  return 'Impossible de joindre le serveur.'
}
