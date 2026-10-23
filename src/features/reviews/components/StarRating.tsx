import { Star } from 'lucide-react'

type StarRatingProps = {
  value: number | null
  size?: number
}

const starCount = 5

export function StarRating({ value, size = 20 }: StarRatingProps) {
  const label =
    value === null
      ? 'Aucune note'
      : `Note : ${value.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} sur 5`
  const fillPercent = value === null ? 0 : (value / starCount) * 100
  const stars = Array.from({ length: starCount }, (_, index) => index)

  return (
    <div role="img" aria-label={label} className="relative inline-flex">
      <div className="flex gap-0.5 text-slate-300 dark:text-slate-700">
        {stars.map((index) => (
          <Star key={index} size={size} aria-hidden="true" />
        ))}
      </div>
      <div
        className="absolute top-0 left-0 h-full overflow-hidden text-amber-400"
        style={{ width: `${fillPercent}%` }}
      >
        <div className="flex w-max gap-0.5">
          {stars.map((index) => (
            <Star key={index} size={size} fill="currentColor" aria-hidden="true" />
          ))}
        </div>
      </div>
    </div>
  )
}
