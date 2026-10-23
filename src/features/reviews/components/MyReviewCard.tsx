import { Link } from 'react-router-dom'
import { StarRating } from '@/features/reviews/components/StarRating'
import type { MyReview } from '@/shared/types/restaurant'

type MyReviewCardProps = {
  review: MyReview
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('fr-FR')
}

export function MyReviewCard({ review }: MyReviewCardProps) {
  const isEdited = review.updatedAt !== review.createdAt

  return (
    <article className="flex flex-col gap-3 rounded-none border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <StarRating value={review.rating} size={18} />
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Publié le {formatDate(review.createdAt)}
          {isEdited && ` · modifié le ${formatDate(review.updatedAt)}`}
        </p>
      </div>

      {review.comment === '' ? (
        <p className="text-slate-600 dark:text-slate-400">Sans commentaire.</p>
      ) : (
        <p>{review.comment}</p>
      )}

      {review.reply && (
        <div className="rounded-none bg-slate-100 p-3 dark:bg-slate-800">
          <p className="text-sm font-medium">Réponse du restaurant · {formatDate(review.reply.repliedAt)}</p>
          <p className="mt-1 text-sm">{review.reply.text}</p>
        </div>
      )}

      <Link to="/avis" className="w-fit text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
        Modifier mon avis
      </Link>
    </article>
  )
}
