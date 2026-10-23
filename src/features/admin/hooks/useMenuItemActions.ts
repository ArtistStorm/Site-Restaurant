import { useMutation, useQueryClient } from '@tanstack/react-query'
import { restaurantApi, type MenuItemValues } from '@/shared/api/restaurant-api'
import { notifySuccess } from '@/features/notifications/notify-success'

export function useCreateMenuItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: MenuItemValues) => restaurantApi.admin.createMenuItem(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items'] })
      notifySuccess('Produit ajouté à la carte.')
    },
  })
}

export function useDeleteMenuItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (itemId: string) => restaurantApi.admin.deleteMenuItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items'] })
      queryClient.invalidateQueries({ queryKey: ['menu-item'] })
      notifySuccess('Produit supprimé de la carte.')
    },
  })
}
