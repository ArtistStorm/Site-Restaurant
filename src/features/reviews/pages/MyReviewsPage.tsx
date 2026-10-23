import { Link } from 'react-router-dom'
import { Skeleton } from '@/shared'
import { EmptyState } from '@/shared/components/EmptyState'
import { useMyReview } from '@/features/reviews/hooks/useMyReview'
import { MyReviewCard } from '@/features/reviews/components/MyReviewCard'

export function MyReviewsPage() {
  const myReview = useMyReview()

  return (
    <section aria-labelledby="my-reviews-title" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="my-reviews-title" className="text-xl font-bold">
          Suivi de mes avis
        </h2>
        <Link to="/avis" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
          Voir tous les avis du restaurant
        </Link>
      </div>

      {myReview.isPending && <Skeleton variant="title" />}
      {myReview.isError && (
        <p className="text-red-600 dark:text-red-400">Impossible de charger vos avis.</p>
      )}
      {myReview.data === null && (
        <EmptyState
          title="Vous n'avez pas encore publié d'avis."
          description="Partagez votre expérience sur la page des avis."
        />
      )}
      {myReview.data && <MyReviewCard review={myReview.data} />}
    </section>
  )
}
