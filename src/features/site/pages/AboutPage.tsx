import { Link } from 'react-router-dom'
import { Breadcrumbs } from '@/shared/components/Breadcrumbs'

const values = [
  "Le produit d'abord : nos viandes, nos légumes et nos vins viennent des producteurs du Bas-Rhin.",
  "Une carte d'hiver et de terroir, sans fioriture.",
  "Une table qui se partage : nos plats sont faits pour être servis au centre.",
]

const team = [
  {
    name: 'Marie Walter',
    role: 'Patronne',
    text: "Arrière-petite-fille d'Émile. Elle tient la salle et connaît la moitié des habitués par leur prénom.",
  },
  {
    name: 'Thierry Lang',
    role: 'Cuisinier',
    text: 'Cuisinier depuis vingt-deux ans. Sa recette de choucroute ne figure dans aucun livre.',
  },
  {
    name: 'Samia Benali',
    role: 'Salle',
    text: 'En salle depuis huit ans. Elle vous conseillera le vin qui accompagne votre plat.',
  },
]

export function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-10 p-4">
      <Breadcrumbs items={[{ label: 'À propos' }]} />

      <header className="flex flex-col gap-4">
        <span className="text-sm font-semibold uppercase text-bordeaux dark:text-amber-400">Depuis 1923</span>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">La Winstub du Tanneur, depuis 1923</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          On entre ici comme on entre chez quelqu'un. Les bancs sont en bois, les murs ont vu passer un siècle de
          conversations, et la carte tient sur une seule page : choucroute, flammekueche, vin blanc et le sourire du
          patron.
        </p>
      </header>

      <section aria-labelledby="history-title" className="flex flex-col gap-4">
        <h2 id="history-title" className="text-2xl font-bold">
          Une maison de famille
        </h2>
        <p className="text-slate-700 dark:text-slate-300">
          Le Tanneur a été ouvert par Émile Walter, ancien tanneur du quartier des Tanneurs. Ses clients venaient y
          boire un verre après le travail, et il leur servait ce qu'on mangeait chez soi le dimanche. Quatre générations
          plus tard, on y mange toujours la même chose, préparée de la même façon.
        </p>
      </section>

      <section aria-labelledby="values-title" className="flex flex-col gap-4">
        <h2 id="values-title" className="text-2xl font-bold">
          Ce qu'on fait ici
        </h2>
        <ul className="flex list-disc flex-col gap-3 pl-5 text-slate-700 dark:text-slate-300">
          {values.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
        <p className="text-slate-700 dark:text-slate-300">
          Choucroute, baeckeoffe, tarte flambée au feu de bois : retrouvez-les à la{' '}
          <Link to="/carte" className="font-medium underline hover:text-bordeaux dark:hover:text-amber-400">
            carte
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby="team-title" className="flex flex-col gap-4">
        <h2 id="team-title" className="text-2xl font-bold">
          Qui nous fait vivre
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {team.map((member) => (
            <article
              key={member.name}
              className="flex flex-col gap-2 rounded-none border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
            >
              <p className="text-sm font-semibold uppercase text-bordeaux dark:text-amber-400">{member.role}</p>
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-slate-600 dark:text-slate-300">{member.text}</p>
            </article>
          ))}
        </div>
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
