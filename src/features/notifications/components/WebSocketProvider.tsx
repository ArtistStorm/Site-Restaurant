import { useQueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useAuthStore } from '@/features/auth/auth-store'
import { env } from '@/shared/config/env'
import { ToastContainer } from '@/features/notifications/components/ToastContainer'
import { useNotificationStore, type NotificationType } from '@/features/notifications/notification-store'
import { useWebSocket } from '@/shared/hooks/useWebSocket'

const wsBaseUrl = `${env.wsUrl}/restaurant/ws`

const realtimeQueryKeys = [['reservations'], ['available-tables'], ['tables'], ['admin']]

type ServerMessage = {
  type: NotificationType
  title: string
  message: string
  createdAt: string
}

type WebSocketProviderProps = {
  children: ReactNode
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const token = useAuthStore((state) => state.token)
  const queryClient = useQueryClient()
  const addNotification = useNotificationStore((state) => state.addNotification)

  const url = token ? `${wsBaseUrl}?token=${encodeURIComponent(token)}` : null

  useWebSocket({
    url,
    onMessage: (raw) => {
      let payload: ServerMessage

      try {
        payload = JSON.parse(raw)
      } catch {
        return
      }

      addNotification({
        type: payload.type,
        title: payload.title,
        message: payload.message,
        createdAt: payload.createdAt,
      })

      realtimeQueryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey })
      })
    },
  })

  return (
    <>
      {children}
      <ToastContainer />
    </>
  )
}
