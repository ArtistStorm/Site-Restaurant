import { useSearchParams } from 'react-router-dom'
import { Breadcrumbs, Skeleton } from '@/shared'
import { Pagination } from '@/shared/components/Pagination'
import { useAuthStore } from '@/features/auth/auth-store'
import { useReviews, reviewsPageSize } from '@/features/reviews/hooks/useReviews'
import { ReviewCard } from '@/features/reviews/components/ReviewCard'
import { ReviewForm } from '@/features/reviews/components/ReviewForm'
import { ReviewSummaryPanel } from '@/features/reviews/components/ReviewSummaryPanel'

function parsePage(raw: string | null): number {
  const value = Number(raw)
  return Number.isInteger(value) && value >= 1 ? value : 1
}

export function ReviewsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parsePage(searchParams.get('page'))
  const reviews = useReviews(page, reviewsPageSize)
  const token = useAuthStore((state) => state.token)

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs items={[{ label: 'Avis' }]} />
      <h1 className="text-2xl font-bold">Avis des clients</h1>

      {reviews.isPending && <Skeleton variant="text" />}
      {reviews.isError && <p className="text-red-600 dark:text-red-400">Impossible de charger les avis.</p>}

      {reviews.data && (
        <>
          <ReviewSummaryPanel summary={reviews.data.summary} />

          {token !== null && <ReviewForm />}

          {reviews.data.totalPages >= page && reviews.data.items.length > 0 && (
            <ul className="flex flex-col gap-4">
              {reviews.data.items.map((review) => (
                <li key={review.id}>
                  <ReviewCard review={review} />
                </li>
              ))}
            </ul>
          )}

          {page > reviews.data.totalPages && (
            <p className="text-slate-600 dark:text-slate-400">Cette page n'existe pas.</p>
          )}

          {reviews.data.totalPages > 1 && (
            <Pagination
              page={reviews.data.page}
              totalPages={reviews.data.totalPages}
              onPageChange={(nextPage) => setSearchParams({ page: String(nextPage) })}
            />
          )}
        </>
      )}
    </div>
  )
}
