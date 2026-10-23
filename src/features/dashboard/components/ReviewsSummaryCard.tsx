import { Link } from 'react-router-dom'
import { useReviews } from '@/features/reviews/hooks/useReviews'
import { StarRating } from '@/features/reviews/components/StarRating'

export function ReviewsSummaryCard() {
  const reviews = useReviews(1, 1)

  return (
    <section aria-label="Avis clients" className="flex flex-col gap-3 rounded-none bg-white p-5 shadow dark:bg-slate-900">
      <h2 className="font-bold">Avis clients</h2>
      {reviews.isPending && <p className="text-slate-600 dark:text-slate-400">Chargement...</p>}
      {reviews.isError && <p className="text-red-600 dark:text-red-400">Avis indisponibles.</p>}
      {reviews.data && (
        <>
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold">
              {reviews.data.summary.average === null
                ? '—'
                : reviews.data.summary.average.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
              <span className="text-base font-medium text-slate-600 dark:text-slate-400"> / 5</span>
            </p>
            <StarRating value={reviews.data.summary.average} />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">{reviews.data.summary.count} avis</p>
        </>
      )}
      <Link to="/avis" className="self-start text-sm font-medium underline">
        Voir tous les avis
      </Link>
    </section>
  )
}
