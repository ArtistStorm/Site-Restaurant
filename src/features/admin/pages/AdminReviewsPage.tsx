import { useSearchParams } from 'react-router-dom'
import { Pagination } from '@/shared/components/Pagination'
import { EmptyState } from '@/shared/components/EmptyState'
import { Skeleton } from '@/shared'
import { useReviews, reviewsPageSize } from '@/features/reviews/hooks/useReviews'
import { AdminReviewItem } from '@/features/admin/components/AdminReviewItem'

function parsePage(raw: string | null): number {
  const value = Number(raw)
  return Number.isInteger(value) && value >= 1 ? value : 1
}

export function AdminReviewsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parsePage(searchParams.get('page'))
  const reviews = useReviews(page, reviewsPageSize)

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Avis clients</h2>

      {reviews.isPending && <Skeleton variant="text" />}
      {reviews.isError && <p className="text-red-600 dark:text-red-400">Impossible de charger les avis.</p>}

      {reviews.data && (
        <>
          <p className="text-slate-600 dark:text-slate-300">
            {reviews.data.summary.count} avis
            {reviews.data.summary.average !== null &&
              ` · moyenne ${reviews.data.summary.average.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} / 5`}
          </p>

          {reviews.data.items.length === 0 && (
            <EmptyState
              title="Aucun avis pour le moment."
              description="Les avis des clients apparaîtront ici."
            />
          )}

          <ul className="flex flex-col gap-4">
            {reviews.data.items.map((review) => (
              <li key={review.id}>
                <AdminReviewItem review={review} />
              </li>
            ))}
          </ul>

          {reviews.data.totalPages > 1 && (
            <Pagination
              page={reviews.data.page}
              totalPages={reviews.data.totalPages}
              onPageChange={(nextPage) => setSearchParams({ page: String(nextPage) })}
            />
          )}
        </>
      )}
    </section>
  )
}
