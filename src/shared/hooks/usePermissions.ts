import { useMember } from '@/features/dashboard/hooks/useMember'
import type { Member } from '@/shared/types/restaurant'

export function usePermissions() {
  const { data: member, isPending } = useMember()
  const role = member?.role ?? null

  return {
    role,
    isPending,
    isAdmin: role === 'ADMIN',
    hasRole: (allowedRoles: Member['role'][]) => role !== null && allowedRoles.includes(role),
  }
}
