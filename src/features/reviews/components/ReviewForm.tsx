import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Send } from 'lucide-react'
import { useForm, useWatch, Controller } from 'react-hook-form'
import { cn } from '@/shared'
import { useMyReview } from '@/features/reviews/hooks/useMyReview'
import { getSubmitReviewErrorMessage, useSubmitReview } from '@/features/reviews/hooks/useSubmitReview'
import { reviewSchema, type ReviewFormValues } from '@/features/reviews/types/review-schema'
import { StarPicker } from '@/features/reviews/components/StarPicker'

export function ReviewForm() {
  const mine = useMyReview()
  const submit = useSubmitReview()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: '' },
    values: mine.data ? { rating: mine.data.rating, comment: mine.data.comment } : undefined,
  })

  const rating = useWatch({ control, name: 'rating' })
  const hasReview = mine.data !== null && mine.data !== undefined

  const onSubmit = (values: ReviewFormValues) => {
    submit.mutate(values)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-none bg-white p-6 shadow dark:bg-slate-900"
    >
      <h2 className="text-lg font-bold">{hasReview ? 'Modifier mon avis' : 'Donner mon avis'}</h2>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Votre note</span>
        <Controller
          control={control}
          name="rating"
          render={({ field }) => <StarPicker value={field.value} onChange={field.onChange} />}
        />
        {errors.rating && <p className="text-sm text-red-600">{errors.rating.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="review-comment" className="text-sm font-medium">
          Commentaire (facultatif, 500 caractères max.)
        </label>
        <textarea
          id="review-comment"
          rows={4}
          className="rounded-none border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
          {...register('comment')}
        />
        {errors.comment && <p className="text-sm text-red-600">{errors.comment.message}</p>}
      </div>

      {submit.isError && <p className="text-sm text-red-600">{getSubmitReviewErrorMessage(submit.error)}</p>}
      {submit.isSuccess && (
        <p className="text-sm text-green-700 dark:text-green-400">
          {submit.data.created ? 'Merci, votre avis est publié.' : 'Votre avis a été mis à jour.'}
        </p>
      )}

      <button
        type="submit"
        disabled={submit.isPending || rating === 0}
        className={cn(
          'flex items-center justify-center gap-2 self-start rounded-none bg-bordeaux px-4 py-2 font-medium text-white hover:bg-vigne dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200',
          (submit.isPending || rating === 0) && 'opacity-50',
        )}
      >
        {submit.isPending ? <LoaderCircle className="animate-spin" size={18} /> : <Send size={18} />}
        {hasReview ? 'Enregistrer les modifications' : 'Publier mon avis'}
      </button>
    </form>
  )
}
