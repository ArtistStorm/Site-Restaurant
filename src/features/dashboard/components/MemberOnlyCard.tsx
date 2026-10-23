import { LogIn } from 'lucide-react'
import { Link } from 'react-router-dom'

type MemberOnlyCardProps = {
  title: string
}

export function MemberOnlyCard({ title }: MemberOnlyCardProps) {
  return (
    <section className="flex flex-col gap-2 rounded-none bg-white p-6 shadow dark:bg-slate-900">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Connectez-vous pour voir cette information.
      </p>
      <Link
        to="/login"
        className="flex w-fit items-center gap-2 text-sm font-medium underline"
      >
        <LogIn size={16} aria-hidden="true" />
        Se connecter
      </Link>
    </section>
  )
}
