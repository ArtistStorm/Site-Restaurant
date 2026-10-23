import type { ReactNode } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { useLocation } from 'react-router-dom'

type AppErrorBoundaryProps = {
  children: ReactNode
}

function AppErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className="mx-auto flex w-full max-w-xl flex-col items-center gap-3 p-8 text-center">
      <p className="text-xl font-bold text-red-700 dark:text-red-400">Une erreur inattendue est survenue.</p>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Vous pouvez réessayer ou revenir à l'accueil.
      </p>
      <button
        type="button"
        onClick={resetErrorBoundary}
        className="rounded-none bg-bordeaux px-4 py-2 font-medium text-white transition-colors hover:bg-vigne dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
      >
        Réessayer
      </button>
    </div>
  )
}

export function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  const location = useLocation()

  return (
    <ErrorBoundary FallbackComponent={AppErrorFallback} resetKeys={[location.pathname]}>
      {children}
    </ErrorBoundary>
  )
}
