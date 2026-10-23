import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { cn } from '@/shared'
import { getReviewActionErrorMessage, useReplyToReview } from '@/features/admin/hooks/useReviewActions'
import { reviewReplySchema, type ReviewReplyFormValues } from '@/features/admin/types/review-reply-schema'

type AdminReplyFormProps = {
  reviewId: string
  initialText: string
}

export function AdminReplyForm({ reviewId, initialText }: AdminReplyFormProps) {
  const reply = useReplyToReview()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewReplyFormValues>({
    resolver: zodResolver(reviewReplySchema),
    defaultValues: { text: initialText },
  })

  const onSubmit = (values: ReviewReplyFormValues) => {
    reply.mutate({ reviewId, text: values.text })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label htmlFor={`reply-${reviewId}`} className="text-sm font-medium">
        Réponse du restaurant
      </label>
      <textarea
        id={`reply-${reviewId}`}
        rows={3}
        className="rounded-none border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
        {...register('text')}
      />
      {errors.text && <p className="text-sm text-red-600">{errors.text.message}</p>}
      {reply.isError && <p className="text-sm text-red-600">{getReviewActionErrorMessage(reply.error)}</p>}
      {reply.isSuccess && <p className="text-sm text-green-700 dark:text-green-400">Réponse enregistrée.</p>}
      <button
        type="submit"
        disabled={reply.isPending}
        className={cn(
          'flex items-center justify-center gap-2 self-start rounded-none bg-bordeaux px-4 py-2 font-medium text-white hover:bg-vigne dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200',
          reply.isPending && 'opacity-50',
        )}
      >
        {reply.isPending && <LoaderCircle className="animate-spin" size={18} />}
        Enregistrer la réponse
      </button>
    </form>
  )
}
