type AccountSectionProps = {
  email: string
}

export function AccountSection({ email }: AccountSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">Adresse email</p>
      <p className="text-slate-600 dark:text-slate-300">{email}</p>
      <p className="text-xs text-slate-600 dark:text-slate-400">
        L'adresse email ne peut pas être modifiée depuis cet espace.
      </p>
    </div>
  )
}
