export function PageLoader() {
  return (
    <div role="status" aria-live="polite" className="flex justify-center p-12">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900 dark:border-slate-700 dark:border-t-white" />
      <span className="sr-only">Chargement de la page...</span>
    </div>
  )
}
