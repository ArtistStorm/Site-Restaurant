import { Toast } from '@/shared/components/Toast'
import { useNotificationStore } from '@/features/notifications/notification-store'

export function ToastContainer() {
  const toasts = useNotificationStore((state) => state.toasts)
  const dismissToast = useNotificationStore((state) => state.dismissToast)

  return (
    <div aria-live="polite" className="pointer-events-none fixed top-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast title={toast.title} message={toast.message} onClose={() => dismissToast(toast.id)} />
        </div>
      ))}
    </div>
  )
}
