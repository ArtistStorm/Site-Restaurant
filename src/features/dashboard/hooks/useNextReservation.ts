import { useQuery } from '@tanstack/react-query'
import { restaurantApi } from '@/shared/api/restaurant-api'
import type { Reservation } from '@/shared/types/restaurant'
import { useAuthStore } from '@/features/auth/auth-store'

export type UpcomingSummary = {
  next: Reservation | null
  upcomingCount: number
}

export function selectUpcoming(reservations: Reservation[]): UpcomingSummary {
  const now = Date.now()
  const upcoming = reservations.filter(
    (reservation) =>
      reservation.status === 'CONFIRMED' && new Date(reservation.startTime).getTime() > now,
  )

  return { next: upcoming[0] ?? null, upcomingCount: upcoming.length }
}

export function useNextReservation() {
  const memberId = useAuthStore((state) => state.memberId) ?? ''

  return useQuery({
    queryKey: ['reservations', memberId],
    queryFn: () => restaurantApi.members.reservations(memberId),
    enabled: memberId !== '',
    refetchInterval: 30_000,
    select: selectUpcoming,
  })
}
