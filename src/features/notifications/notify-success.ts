import { useNotificationStore } from '@/features/notifications/notification-store'

export function notifySuccess(message: string) {
  useNotificationStore.getState().addNotification({
    type: 'DATA_UPDATED',
    title: 'Succès',
    message,
    createdAt: new Date().toISOString(),
  })
}
