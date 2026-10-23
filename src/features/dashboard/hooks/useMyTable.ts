import { useQuery } from '@tanstack/react-query'
import { restaurantApi } from '@/shared/api/restaurant-api'
import { useAuthStore } from '@/features/auth/auth-store'
import { selectUpcoming } from '@/features/dashboard/hooks/useNextReservation'

export function useMyTable() {
  const memberId = useAuthStore((state) => state.memberId) ?? ''

  const reservations = useQuery({
    queryKey: ['reservations', memberId],
    queryFn: () => restaurantApi.members.reservations(memberId),
    enabled: memberId !== '',
    select: selectUpcoming,
  })

  const tables = useQuery({
    queryKey: ['tables'],
    queryFn: () => restaurantApi.tables.list(),
  })

  const nextReservation = reservations.data?.next ?? null
  const table = tables.data?.find((item) => item.id === nextReservation?.tableId) ?? null

  return {
    nextReservation,
    table,
    isPending: reservations.isPending || tables.isPending,
    isError: reservations.isError || tables.isError,
  }
}
