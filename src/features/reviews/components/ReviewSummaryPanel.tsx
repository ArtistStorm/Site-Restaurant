import { type ReviewSummary } from '@/shared/types/restaurant'
import { RatingDistribution } from '@/features/reviews/components/RatingDistribution'
import { StarRating } from '@/features/reviews/components/StarRating'

type ReviewSummaryPanelProps = {
  summary: ReviewSummary
}

export function ReviewSummaryPanel({ summary }: ReviewSummaryPanelProps) {
  const averageText =
    summary.average === null
      ? '—'
      : summary.average.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

  return (
    <section aria-label="Résumé des avis" className="grid gap-6 rounded-none bg-white p-6 shadow sm:grid-cols-[auto_1fr] sm:items-center dark:bg-slate-900">
      <div className="flex flex-col items-start gap-2">
        <p className="text-4xl font-bold">
          {averageText} <span className="text-lg font-medium text-slate-600 dark:text-slate-400">/ 5</span>
        </p>
        <StarRating value={summary.average} size={24} />
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {summary.count === 0 ? 'Aucun avis pour le moment.' : `${summary.count} avis`}
        </p>
      </div>
      <RatingDistribution ratingCounts={summary.ratingCounts} count={summary.count} />
    </section>
  )
}
