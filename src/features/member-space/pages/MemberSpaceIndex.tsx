import { Navigate } from 'react-router-dom'
import { usePermissions } from '@/shared/hooks/usePermissions'

export function MemberSpaceIndex() {
  const { isAdmin } = usePermissions()

  return <Navigate to={isAdmin ? 'parametres' : 'avis'} replace />
}
