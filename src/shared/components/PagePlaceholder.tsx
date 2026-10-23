type PagePlaceholderProps = {
  title: string
  description?: string
}

export function PagePlaceholder({
  title,
  description = 'Cette page est en cours de préparation.',
}: PagePlaceholderProps) {
  return (
    <section className="flex flex-col items-center gap-3 rounded-none border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </section>
  )
}
