import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ApiErrorBody } from '@/shared'
import { restaurantApi } from '@/shared/api/restaurant-api'
import type { ReservationFormValues } from '@/features/reservations/types/reservation-schema'

export function useCreateReservation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: ReservationFormValues) =>
      restaurantApi.reservations.create({
        reservationDate: `${values.date}T00:00:00.000Z`,
        startTime: new Date(`${values.date}T${values.startTime}`).toISOString(),
        endTime: new Date(`${values.date}T${values.endTime}`).toISOString(),
        guestCount: values.guestCount,
        specialRequest: values.specialRequest,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] })
      queryClient.invalidateQueries({ queryKey: ['available-tables'] })
    },
  })
}

export function getReservationErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.message ?? 'Une erreur est survenue.'
  }

  return 'Impossible de joindre le serveur.'
}
