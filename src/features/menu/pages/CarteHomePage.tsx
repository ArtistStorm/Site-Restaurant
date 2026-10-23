import { Breadcrumbs, MarkdownRenderer } from '@/shared'

const content = `Choisissez une catégorie pour voir les plats.

Chaque plat a sa **fiche détaillée** avec ses ingrédients et son prix.`

export function CarteHomePage() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs items={[{ label: 'Carte' }]} />
      <MarkdownRenderer content={content} className="text-slate-600 dark:text-slate-400" />
    </div>
  )
}
