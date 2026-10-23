import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/auth-store'
import { Skeleton } from '@/shared'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'
import { EmptyState } from '@/shared/components/EmptyState'
import { useMyReservations } from '@/features/reservations/hooks/useMyReservations'
import { useCancelReservation } from '@/features/reservations/hooks/useCancelReservation'
import type { Reservation } from '@/shared/types/restaurant'

function formatDay(value: string): string {
  return new Date(value).toLocaleDateString('fr-FR')
}

function formatTime(value: string): string {
  return new Date(value).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export function MyReservationsPage() {
  const token = useAuthStore((state) => state.token)
  const reservations = useMyReservations()
  const cancelReservation = useCancelReservation()
  const [toCancel, setToCancel] = useState<Reservation | null>(null)
  const [now] = useState(() => Date.now())

  if (token === null) {
    return (
      <EmptyState
        title="Connectez-vous pour voir vos réservations."
        description="Les réservations faites sans compte ne sont pas consultables ici."
      />
    )
  }

  const sorted = [...(reservations.data ?? [])].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  )

  return (
    <section aria-labelledby="my-reservations-title" className="flex flex-col gap-4">
      <h2 id="my-reservations-title" className="text-xl font-bold">Mes réservations</h2>

      {reservations.isPending && <Skeleton variant="title" />}
      {reservations.isError && (
        <p className="text-red-600 dark:text-red-400">Impossible de charger vos réservations.</p>
      )}

      {reservations.data && sorted.length === 0 && (
        <EmptyState
          title="Vous n'avez pas encore de réservation."
          description="Réservez une table depuis l'onglet « Nouvelle réservation »."
        />
      )}

      <ul className="flex flex-col gap-3">
        {sorted.map((reservation) => {
          const isCancelled = reservation.status === 'CANCELLED'
          const canCancel = !isCancelled && new Date(reservation.startTime).getTime() > now

          return (
            <li
              key={reservation.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-none border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex flex-col gap-1">
                <p className="font-medium">
                  {formatDay(reservation.startTime)} · {formatTime(reservation.startTime)} – {formatTime(reservation.endTime)}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {reservation.guestCount} personne{reservation.guestCount > 1 ? 's' : ''}
                  {reservation.specialRequest ? ` · ${reservation.specialRequest}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={
                    isCancelled
                      ? 'rounded-full bg-slate-200 px-3 py-1 text-sm dark:bg-slate-800'
                      : 'rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-900/40 dark:text-green-300'
                  }
                >
                  {isCancelled ? 'Annulée' : 'Confirmée'}
                </span>
                {canCancel && (
                  <button
                    type="button"
                    onClick={() => setToCancel(reservation)}
                    className="rounded-none border border-red-300 px-3 py-1 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 dark:border-red-500 dark:text-red-400 dark:hover:bg-red-900/30"
                  >
                    Annuler
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      <p className="text-sm text-slate-600 dark:text-slate-400">
        Besoin d'autre chose ? <Link to="/avis" className="font-medium text-blue-600 hover:underline dark:text-blue-400">Donnez votre avis</Link>.
      </p>

      <ConfirmDialog
        open={toCancel !== null}
        onOpenChange={(open) => {
          if (!open) setToCancel(null)
        }}
        title="Annuler cette réservation ?"
        description="La table sera libérée. Cette action est définitive."
        confirmLabel="Oui, annuler"
        onConfirm={() => {
          if (toCancel) cancelReservation.mutate(toCancel.id)
          setToCancel(null)
        }}
      />
    </section>
  )
}
