import { useState } from 'react'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'
import { type ReviewItem } from '@/shared/types/restaurant'
import { ReviewCard } from '@/features/reviews/components/ReviewCard'
import { AdminReplyForm } from '@/features/admin/components/AdminReplyForm'
import { useDeleteReview, useDeleteReviewReply } from '@/features/admin/hooks/useReviewActions'

type PendingAction = 'review' | 'reply' | null

type AdminReviewItemProps = {
  review: ReviewItem
}

export function AdminReviewItem({ review }: AdminReviewItemProps) {
  const [pendingAction, setPendingAction] = useState<PendingAction>(null)
  const deleteReview = useDeleteReview()
  const deleteReply = useDeleteReviewReply()

  const isReviewAction = pendingAction === 'review'
  const dialogTitle = isReviewAction ? 'Supprimer cet avis ?' : 'Supprimer la réponse ?'
  const dialogDescription = isReviewAction
    ? "L'avis et sa réponse éventuelle seront supprimés définitivement."
    : 'La réponse du restaurant sera supprimée définitivement.'

  const confirmAction = () => {
    if (pendingAction === 'review') {
      deleteReview.mutate(review.id)
    }
    if (pendingAction === 'reply') {
      deleteReply.mutate(review.id)
    }
    setPendingAction(null)
  }

  return (
    <>
      <ReviewCard
        review={review}
        actions={
          <div className="flex flex-col gap-4 border-t border-slate-200 pt-4 dark:border-slate-700">
            <AdminReplyForm reviewId={review.id} initialText={review.reply?.text ?? ''} />
            <div className="flex flex-wrap gap-2">
              {review.reply && (
                <button
                  type="button"
                  onClick={() => setPendingAction('reply')}
                  className="rounded-none border border-slate-300 px-4 py-2 font-medium hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Supprimer la réponse
                </button>
              )}
              <button
                type="button"
                onClick={() => setPendingAction('review')}
                className="rounded-none border border-red-300 px-4 py-2 font-medium text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
              >
                Supprimer l'avis
              </button>
            </div>
          </div>
        }
      />

      <ConfirmDialog
        open={pendingAction !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPendingAction(null)
          }
        }}
        title={dialogTitle}
        description={dialogDescription}
        confirmLabel="Supprimer"
        onConfirm={confirmAction}
      />
    </>
  )
}
