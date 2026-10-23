import { useMutation } from '@tanstack/react-query'
import { restaurantApi } from '@/shared/api/restaurant-api'
import type { GuestReservationFormValues } from '@/features/reservations/types/guest-reservation-schema'

export function useCreateGuestReservation() {
  return useMutation({
    mutationFn: (values: GuestReservationFormValues) =>
      restaurantApi.reservations.createGuest({
        reservationDate: `${values.date}T00:00:00.000Z`,
        startTime: new Date(`${values.date}T${values.startTime}`).toISOString(),
        endTime: new Date(`${values.date}T${values.endTime}`).toISOString(),
        guestCount: values.guestCount,
        specialRequest: values.specialRequest,
        guestName: values.guestName,
        guestEmail: values.guestEmail,
        guestPhone: values.guestPhone,
      }),
  })
}
