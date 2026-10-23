import { Bell, CheckCheck, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { selectUnreadCount, useNotificationStore } from '@/features/notifications/notification-store'
import { cn } from '@/shared/lib/cn'

function formatTime(isoDate: string) {
  return new Date(isoDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const notifications = useNotificationStore((state) => state.notifications)
  const unreadCount = useNotificationStore(selectUnreadCount)
  const markAsRead = useNotificationStore((state) => state.markAsRead)
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead)
  const removeNotification = useNotificationStore((state) => state.removeNotification)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={`Notifications, ${unreadCount} non lue(s)`}
        aria-expanded={isOpen}
        className="relative rounded-none border border-slate-300 p-2 hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        <Bell size={18} aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-40 mt-2 flex max-h-96 w-80 flex-col gap-3 overflow-y-auto rounded-none border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-2">
            <p className="font-bold">Notifications</p>
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="flex items-center gap-1 text-sm font-medium hover:underline disabled:opacity-50"
            >
              <CheckCheck size={16} aria-hidden="true" />
              Tout marquer comme lu
            </button>
          </div>

          {notifications.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-400">Aucune notification.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {notifications.map((item) => (
                <li
                  key={item.id}
                  className={cn(
                    'flex flex-col gap-1 rounded-none border border-slate-200 p-3 dark:border-slate-700',
                    !item.read && 'border-l-4 border-l-blue-600',
                  )}
                >
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{item.message}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{formatTime(item.createdAt)}</p>
                  <div className="flex gap-3 pt-1 text-sm">
                    {!item.read && (
                      <button type="button" onClick={() => markAsRead(item.id)} className="font-medium hover:underline">
                        Marquer comme lu
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeNotification(item.id)}
                      className="flex items-center gap-1 font-medium text-red-600 hover:underline dark:text-red-400"
                    >
                      <Trash2 size={14} aria-hidden="true" />
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
