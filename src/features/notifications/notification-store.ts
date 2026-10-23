import { create } from 'zustand'

const toastDurationMs = 5_000
const maxNotifications = 50

export type NotificationType =
  | 'RESERVATION_CONFIRMED'
  | 'RESERVATION_ANNULEE'
  | 'TABLE_OUVERTE'
  | 'TABLE_FERMEE'
  | 'DATA_UPDATED'

export type AppNotification = {
  id: string
  type: NotificationType
  title: string
  message: string
  createdAt: string
  read: boolean
}

type NewNotification = Omit<AppNotification, 'id' | 'read'>

type NotificationState = {
  notifications: AppNotification[]
  toasts: AppNotification[]
  addNotification: (notification: NewNotification) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  dismissToast: (id: string) => void
}

export const useNotificationStore = create<NotificationState>()((set, get) => ({
  notifications: [],
  toasts: [],

  addNotification: (notification) => {
    const created: AppNotification = {
      ...notification,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      read: false,
    }

    set((state) => ({
      notifications: [created, ...state.notifications].slice(0, maxNotifications),
      toasts: [...state.toasts, created],
    }))

    window.setTimeout(() => {
      get().dismissToast(created.id)
    }, toastDurationMs)
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((item) =>
        item.id === id ? { ...item, read: true } : item,
      ),
    }))
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((item) => ({ ...item, read: true })),
    }))
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((item) => item.id !== id),
    }))
  },

  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((item) => item.id !== id),
    }))
  },
}))

export function selectUnreadCount(state: NotificationState): number {
  return state.notifications.filter((item) => !item.read).length
}
