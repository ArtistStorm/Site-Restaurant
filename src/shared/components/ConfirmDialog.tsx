import * as AlertDialog from '@radix-ui/react-alert-dialog'

type ConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel: string
  onConfirm: () => void
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-none border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <AlertDialog.Title className="text-lg font-bold">{title}</AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-slate-600 dark:text-slate-300">
            {description}
          </AlertDialog.Description>
          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel className="rounded-none border border-slate-300 px-4 py-2 font-medium hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-800">
              Annuler
            </AlertDialog.Cancel>
            <AlertDialog.Action
              onClick={onConfirm}
              className="rounded-none bg-bordeaux px-4 py-2 font-medium text-white hover:bg-vigne dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {confirmLabel}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
