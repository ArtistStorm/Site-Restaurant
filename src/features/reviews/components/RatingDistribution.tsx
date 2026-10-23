type RatingDistributionProps = {
  ratingCounts: number[]
  count: number
}

const stars = [5, 4, 3, 2, 1]

export function RatingDistribution({ ratingCounts, count }: RatingDistributionProps) {
  return (
    <ul aria-label="Répartition des notes" className="flex flex-col gap-2">
      {stars.map((star) => {
        const total = ratingCounts[star - 1] ?? 0
        const percent = count === 0 ? 0 : Math.round((total / count) * 100)
        return (
          <li key={star} className="flex items-center gap-3 text-sm">
            <span className="w-12 shrink-0 font-medium">{star} ★</span>
            <div className="h-3 flex-1 overflow-hidden rounded bg-slate-200 dark:bg-slate-800">
              <div className="h-full rounded bg-amber-400" style={{ width: `${percent}%` }} />
            </div>
            <span className="w-16 shrink-0 text-right text-slate-600 dark:text-slate-300">
              {total} avis
            </span>
          </li>
        )
      })}
    </ul>
  )
}
