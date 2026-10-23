import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/auth-store'

export function AuthGuard() {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
