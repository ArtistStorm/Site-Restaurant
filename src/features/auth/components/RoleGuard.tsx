import { Navigate, Outlet } from 'react-router-dom'
import { usePermissions } from '@/shared/hooks/usePermissions'
import type { Member } from '@/shared/types/restaurant'

type RoleGuardProps = {
  allowedRoles: Member['role'][]
}

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { hasRole, isPending } = usePermissions()

  if (isPending) {
    return <p className="text-slate-600 dark:text-slate-400">Chargement...</p>
  }

  if (!hasRole(allowedRoles)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
