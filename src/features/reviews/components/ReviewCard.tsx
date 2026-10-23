import { type ReactNode } from 'react'
import { type ReviewItem } from '@/shared/types/restaurant'
import { StarRating } from '@/features/reviews/components/StarRating'

type ReviewCardProps = {
  review: ReviewItem
  actions?: ReactNode
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function ReviewCard({ review, actions }: ReviewCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-none bg-white p-5 shadow dark:bg-slate-900">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-col">
          <h3 className="font-bold">{review.authorName}</h3>
          <time dateTime={review.createdAt} className="text-sm text-slate-600 dark:text-slate-400">
            {formatDate(review.createdAt)}
          </time>
        </div>
        <StarRating value={review.rating} />
      </header>

      {review.comment === '' ? (
        <p className="italic text-slate-600 dark:text-slate-400">Sans commentaire.</p>
      ) : (
        <p className="whitespace-pre-line">{review.comment}</p>
      )}

      {review.reply && (
        <div className="rounded-none border-l-4 border-slate-400 bg-slate-100 p-4 dark:bg-slate-800">
          <p className="text-sm font-bold">Réponse du restaurant</p>
          <p className="mt-1 whitespace-pre-line text-sm">{review.reply.text}</p>
        </div>
      )}

      {actions}
    </article>
  )
}
