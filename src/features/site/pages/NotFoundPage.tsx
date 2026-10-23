import { House, SearchX } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 p-8 text-center">
      <SearchX size={48} aria-hidden="true" className="text-slate-400 dark:text-slate-500" />
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Erreur 404</p>
      <h1 className="text-2xl font-bold">Page introuvable</h1>
      <p className="text-slate-600 dark:text-slate-300">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-none bg-bordeaux px-4 py-2 font-medium text-white hover:bg-vigne dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          <House size={18} aria-hidden="true" />
          Accueil
        </Link>
        <Link
          to="/carte"
          className="rounded-none border border-slate-300 px-4 py-2 font-medium hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Voir la carte
        </Link>
      </div>
    </main>
  )
}
