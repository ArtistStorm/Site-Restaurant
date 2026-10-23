import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarPlus, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { getReservationErrorMessage } from '@/features/reservations/hooks/useCreateReservation'
import { useCreateGuestReservation } from '@/features/reservations/hooks/useCreateGuestReservation'
import {
  guestReservationSchema,
  type GuestReservationFormValues,
} from '@/features/reservations/types/guest-reservation-schema'

const inputClassName =
  'rounded-none border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-white'

const defaultValues: GuestReservationFormValues = {
  date: '',
  startTime: '',
  endTime: '',
  guestCount: 2,
  specialRequest: '',
  guestName: '',
  guestEmail: '',
  guestPhone: '',
}

export function GuestReservationForm() {
  const createGuestReservation = useCreateGuestReservation()
  const [confirmation, setConfirmation] = useState<string | null>(null)
  const today = new Date().toLocaleDateString('en-CA')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GuestReservationFormValues>({
    resolver: zodResolver(guestReservationSchema),
    defaultValues,
  })

  const onSubmit = (values: GuestReservationFormValues) => {
    createGuestReservation.mutate(values, {
      onSuccess: () => {
        const day = new Date(`${values.date}T12:00:00`).toLocaleDateString('fr-FR')
        setConfirmation(`Votre table est réservée le ${day} de ${values.startTime} à ${values.endTime}.`)
        reset(defaultValues)
      },
    })
  }

  return (
    <section aria-labelledby="guest-reservation-title" className="flex flex-col gap-4">
      <h2 id="guest-reservation-title" className="flex items-center gap-2 text-lg font-bold">
        <CalendarPlus size={20} aria-hidden="true" />
        Réserver une table
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Pas besoin de compte. Vous avez déjà un compte ?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
          Connectez-vous
        </Link>
        .
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="guest-name" className="font-medium">Votre nom</label>
          <input id="guest-name" type="text" autoComplete="name" className={inputClassName} {...register('guestName')} />
          {errors.guestName && <p className="text-sm text-red-600 dark:text-red-400">{errors.guestName.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="guest-phone" className="font-medium">Téléphone</label>
          <input id="guest-phone" type="tel" autoComplete="tel" className={inputClassName} {...register('guestPhone')} />
          {errors.guestPhone && <p className="text-sm text-red-600 dark:text-red-400">{errors.guestPhone.message}</p>}
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label htmlFor="guest-email" className="font-medium">Email</label>
          <input id="guest-email" type="email" autoComplete="email" className={inputClassName} {...register('guestEmail')} />
          {errors.guestEmail && <p className="text-sm text-red-600 dark:text-red-400">{errors.guestEmail.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="guest-date" className="font-medium">Date</label>
          <input id="guest-date" type="date" min={today} className={inputClassName} {...register('date')} />
          {errors.date && <p className="text-sm text-red-600 dark:text-red-400">{errors.date.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="guest-guests" className="font-medium">Nombre de personnes</label>
          <input id="guest-guests" type="number" className={inputClassName} {...register('guestCount', { valueAsNumber: true })} />
          {errors.guestCount && <p className="text-sm text-red-600 dark:text-red-400">{errors.guestCount.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="guest-start" className="font-medium">Heure d'arrivée</label>
          <input id="guest-start" type="time" className={inputClassName} {...register('startTime')} />
          {errors.startTime && <p className="text-sm text-red-600 dark:text-red-400">{errors.startTime.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="guest-end" className="font-medium">Heure de départ</label>
          <input id="guest-end" type="time" className={inputClassName} {...register('endTime')} />
          {errors.endTime && <p className="text-sm text-red-600 dark:text-red-400">{errors.endTime.message}</p>}
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label htmlFor="guest-request" className="font-medium">Exigences particulières (optionnel)</label>
          <textarea id="guest-request" rows={3} className={inputClassName} {...register('specialRequest')} />
          {errors.specialRequest && <p className="text-sm text-red-600 dark:text-red-400">{errors.specialRequest.message}</p>}
        </div>

        {createGuestReservation.isError && (
          <p className="text-sm text-red-600 dark:text-red-400 sm:col-span-2">
            {getReservationErrorMessage(createGuestReservation.error)}
          </p>
        )}

        {confirmation && (
          <p className="text-sm text-green-700 dark:text-green-400 sm:col-span-2">{confirmation}</p>
        )}

        <button
          type="submit"
          disabled={createGuestReservation.isPending}
          className="flex items-center justify-center gap-2 rounded-none bg-bordeaux px-4 py-2 font-medium text-white transition-colors hover:bg-vigne disabled:opacity-50 sm:col-span-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          {createGuestReservation.isPending && <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />}
          Réserver
        </button>
      </form>
    </section>
  )
}
