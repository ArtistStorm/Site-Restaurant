import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ApiErrorBody } from '@/shared'
import { restaurantApi } from '@/shared/api/restaurant-api'
import type { TableFormValues } from '@/features/admin/types/table-schema'
import { notifySuccess } from '@/features/notifications/notify-success'

export function useCreateTable() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: TableFormValues) => restaurantApi.admin.createTable(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] })
      notifySuccess('Table créée.')
    },
  })
}

export function getTableErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.message ?? 'Une erreur est survenue.'
  }

  return 'Impossible de joindre le serveur.'
}
