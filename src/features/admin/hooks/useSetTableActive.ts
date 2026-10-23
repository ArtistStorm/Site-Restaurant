import { useMutation, useQueryClient } from '@tanstack/react-query'
import { restaurantApi } from '@/shared/api/restaurant-api'
import { notifySuccess } from '@/features/notifications/notify-success'

type SetTableActiveVariables = {
  tableId: string
  active: boolean
}

export function useSetTableActive() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ tableId, active }: SetTableActiveVariables) =>
      restaurantApi.admin.setTableActive(tableId, active),
    onSuccess: (_table, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tables'] })
      notifySuccess(variables.active ? 'Table ouverte.' : 'Table fermée.')
    },
  })
}
