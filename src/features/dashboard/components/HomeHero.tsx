import { Link } from 'react-router-dom'

export function HomeHero() {
  return (
    <section className="bg-creme px-4 py-16 sm:py-24 dark:bg-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <span className="text-sm font-semibold tracking-[0.22em] text-vigne uppercase dark:text-or">
          Vins d'Alsace · Strasbourg
        </span>
        <h2 className="font-gothique max-w-3xl text-5xl leading-tight font-normal sm:text-7xl">
          Un verre de vin d'Alsace, et l'histoire de la maison
        </h2>
        <p className="max-w-xl text-xl leading-relaxed text-slate-700 dark:text-slate-300">
          Riesling, gewurztraminer, pinot noir et crémant, choisis chez des viticulteurs de la route des vins, pour
          accompagner une cuisine de terroir.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/reserver"
            className="bg-bordeaux px-7 py-3 text-lg text-creme transition-opacity hover:opacity-90"
          >
            Réserver une table
          </Link>
          <Link
            to="/carte"
            className="border border-vigne px-7 py-3 text-lg text-vigne transition-colors hover:bg-vigne hover:text-creme dark:border-or dark:text-or"
          >
            Découvrir la carte
          </Link>
        </div>
      </div>
    </section>
  )
}
