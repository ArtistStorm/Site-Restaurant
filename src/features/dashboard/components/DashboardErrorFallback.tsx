import type { FallbackProps } from 'react-error-boundary'

export function DashboardErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : 'Erreur inconnue'

  return (
    <div className="rounded-none border border-red-300 bg-red-50 p-6 text-center dark:border-red-500 dark:bg-red-900/30">
      <p className="font-bold text-red-700 dark:text-red-400">Erreur de chargement</p>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{message}</p>
      <button
        type="button"
        onClick={resetErrorBoundary}
        className="mt-4 rounded-none bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Réessayer
      </button>
    </div>
  )
}
