import { Link } from 'react-router-dom'
import { Breadcrumbs } from '@/shared/components/Breadcrumbs'

const hours = [
  { days: 'Lundi au samedi', time: '11 h 30 – 23 h' },
  { days: 'Dimanche', time: '11 h 30 – 16 h (fermé le soir)' },
]

const access = [
  'À pied depuis la cathédrale : quinze minutes par la rue du Bain-aux-Plantes.',
  'Tram, arrêt « Rives de l\'Aar » ou « Lycée Fustel-de-Coulanges », à cinq minutes de marche.',
  'Parking Austerlitz, à dix minutes à pied.',
]

const questions = [
  {
    question: 'Peut-on réserver pour un groupe ?',
    answer: 'Oui, la salle du fond accueille jusqu\'à quarante personnes sur réservation.',
  },
  {
    question: 'Y a-t-il une carte sans gluten ?',
    answer: 'Quelques plats le sont. Précisez vos allergies au moment de la réservation.',
  },
  {
    question: 'Vous acceptez les cartes bancaires ?',
    answer: 'Oui, mais les espèces sont toujours appréciées le dimanche.',
  },
]

export function ContactPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-10 p-4">
      <Breadcrumbs items={[{ label: 'Nous contacter' }]} />

      <header className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Passez nous voir</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Vous voulez réserver, organiser un repas d'équipe ou simplement demander le chemin ? Écrivez-nous, Marie
          répond elle-même.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section aria-labelledby="where-title" className="flex flex-col gap-4 rounded-none border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 id="where-title" className="text-xl font-bold">
            Où nous trouver
          </h2>
          <p>
            <span className="font-semibold">Adresse :</span> 7 rue des Tanneurs, 67000 Strasbourg, dans la Petite France
          </p>
          <p>
            <span className="font-semibold">Téléphone :</span>{' '}
            <a href="tel:+33388000000" className="underline hover:text-bordeaux dark:hover:text-amber-400">
              03 88 00 00 00
            </a>
          </p>
          <p>
            <span className="font-semibold">E-mail :</span>{' '}
            <a
              href="mailto:bonjour@winstub-tanneur.fr"
              className="underline hover:text-bordeaux dark:hover:text-amber-400"
            >
              bonjour@winstub-tanneur.fr
            </a>
          </p>
        </section>

        <section aria-labelledby="hours-title" className="flex flex-col gap-4 rounded-none border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 id="hours-title" className="text-xl font-bold">
            Horaires
          </h2>
          <ul className="flex flex-col gap-2">
            {hours.map((line) => (
              <li key={line.days} className="flex justify-between gap-4">
                <span className="font-semibold">{line.days}</span>
                <span>{line.time}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="access-title" className="flex flex-col gap-4">
        <h2 id="access-title" className="text-2xl font-bold">
          Pour venir
        </h2>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-slate-700 dark:text-slate-300">
          {access.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="questions-title" className="flex flex-col gap-4">
        <h2 id="questions-title" className="text-2xl font-bold">
          Une question rapide ?
        </h2>
        <dl className="flex flex-col gap-4">
          {questions.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold">{item.question}</dt>
              <dd className="text-slate-600 dark:text-slate-300">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div>
        <Link
          to="/reserver"
          className="inline-block rounded-none bg-bordeaux px-5 py-3 font-medium text-white hover:bg-vigne dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Réserver une table
        </Link>
      </div>
    </main>
  )
}
