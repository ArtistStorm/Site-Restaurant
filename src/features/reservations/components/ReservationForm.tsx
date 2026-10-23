import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarPlus, LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { getReservationErrorMessage, useCreateReservation } from '@/features/reservations/hooks/useCreateReservation'
import {
  reservationSchema,
  type ReservationFormValues,
} from '@/features/reservations/types/reservation-schema'

const inputClassName =
  'rounded-none border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-white'

const defaultValues: ReservationFormValues = {
  date: '',
  startTime: '',
  endTime: '',
  guestCount: 2,
  specialRequest: '',
}

export function ReservationForm() {
  const createReservation = useCreateReservation()
  const today = new Date().toLocaleDateString('en-CA')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues,
  })

  const onSubmit = (values: ReservationFormValues) => {
    createReservation.mutate(values, {
      onSuccess: () => {
        reset(defaultValues)
      },
    })
  }

  return (
    <section className="flex flex-col gap-4 rounded-none border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <CalendarPlus size={20} aria-hidden="true" />
        Réserver une table
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="reservation-date" className="font-medium">Date</label>
          <input id="reservation-date" type="date" min={today} className={inputClassName} {...register('date')} />
          {errors.date && <p className="text-sm text-red-600 dark:text-red-400">{errors.date.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="reservation-guests" className="font-medium">Nombre de personnes</label>
          <input
            id="reservation-guests"
            type="number"
            className={inputClassName}
            {...register('guestCount', { valueAsNumber: true })}
          />
          {errors.guestCount && <p className="text-sm text-red-600 dark:text-red-400">{errors.guestCount.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="reservation-start" className="font-medium">Heure d'arrivée</label>
          <input id="reservation-start" type="time" className={inputClassName} {...register('startTime')} />
          {errors.startTime && <p className="text-sm text-red-600 dark:text-red-400">{errors.startTime.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="reservation-end" className="font-medium">Heure de départ</label>
          <input id="reservation-end" type="time" className={inputClassName} {...register('endTime')} />
          {errors.endTime && <p className="text-sm text-red-600 dark:text-red-400">{errors.endTime.message}</p>}
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label htmlFor="reservation-request" className="font-medium">Exigences particulières (optionnel)</label>
          <textarea
            id="reservation-request"
            rows={3}
            placeholder="Ex. chaise bébé, table près de la fenêtre, allergie..."
            className={inputClassName}
            {...register('specialRequest')}
          />
          {errors.specialRequest && (
            <p className="text-sm text-red-600 dark:text-red-400">{errors.specialRequest.message}</p>
          )}
        </div>

        {createReservation.isError && (
          <p className="text-sm text-red-600 dark:text-red-400 sm:col-span-2">
            {getReservationErrorMessage(createReservation.error)}
          </p>
        )}

        {createReservation.isSuccess && (
          <p className="text-sm text-green-600 dark:text-green-400 sm:col-span-2">
            Votre réservation est enregistrée.
          </p>
        )}

        <button
          type="submit"
          disabled={createReservation.isPending}
          className="flex items-center justify-center gap-2 rounded-none bg-bordeaux px-4 py-2 font-medium text-white hover:bg-vigne disabled:opacity-50 sm:col-span-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          {createReservation.isPending && <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />}
          Réserver
        </button>
      </form>
    </section>
  )
}
