import { X } from 'lucide-react'

type ToastProps = {
  title: string
  message: string
  onClose: () => void
}

export function Toast({ title, message, onClose }: ToastProps) {
  return (
    <div
      role="status"
      className="flex w-80 items-start gap-3 rounded-none border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex flex-1 flex-col gap-1">
        <p className="font-bold">{title}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{message}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer la notification"
        className="rounded-md p-1 hover:bg-slate-200 dark:hover:bg-slate-800"
      >
        <X size={18} aria-hidden="true" />
      </button>
    </div>
  )
}
