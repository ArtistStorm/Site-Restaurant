import { useMutation, useQueryClient } from '@tanstack/react-query'
import { restaurantApi } from '@/shared/api/restaurant-api'
import { notifySuccess } from '@/features/notifications/notify-success'

export function useCancelReservation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (reservationId: string) => restaurantApi.reservations.cancel(reservationId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['reservations'] })
      void queryClient.invalidateQueries({ queryKey: ['available-tables'] })
      notifySuccess('Votre réservation a bien été annulée.')
    },
  })
}
