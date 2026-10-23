import { Star } from 'lucide-react'

type StarPickerProps = {
  value: number
  onChange: (rating: number) => void
}

const ratings = [1, 2, 3, 4, 5]

export function StarPicker({ value, onChange }: StarPickerProps) {
  return (
    <div className="flex gap-1">
      {ratings.map((rating) => {
        const isFilled = rating <= value
        return (
          <button
            key={rating}
            type="button"
            aria-label={rating === 1 ? '1 étoile' : `${rating} étoiles`}
            aria-pressed={rating === value}
            onClick={() => onChange(rating)}
            className="rounded p-1 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <Star
              size={28}
              aria-hidden="true"
              className={isFilled ? 'text-amber-400' : 'text-slate-300 dark:text-slate-700'}
              fill={isFilled ? 'currentColor' : 'none'}
            />
          </button>
        )
      })}
    </div>
  )
}
