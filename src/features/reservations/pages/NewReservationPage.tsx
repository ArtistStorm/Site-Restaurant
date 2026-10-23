import { useAuthStore } from '@/features/auth/auth-store'
import { ReservationForm } from '@/features/reservations/components/ReservationForm'
import { GuestReservationForm } from '@/features/reservations/components/GuestReservationForm'

export function NewReservationPage() {
  const token = useAuthStore((state) => state.token)

  return token === null ? <GuestReservationForm /> : <ReservationForm />
}
