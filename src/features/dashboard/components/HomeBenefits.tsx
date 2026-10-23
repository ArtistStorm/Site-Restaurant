const benefits = [
  {
    title: "Produits d'Alsace",
    text: 'Légumes, viandes et fromages achetés chez des producteurs à moins de quarante kilomètres.',
    icon: (
      <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
        <path d="M8 40 C8 20 22 10 40 8 C40 26 30 40 8 40 Z" />
        <path d="M8 40 L26 22" />
      </svg>
    ),
  },
  {
    title: 'Cuisine maison',
    text: 'Choucroute, baeckeoffe et tarte flambée préparées chaque jour, sans surgelé.',
    icon: (
      <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
        <circle cx="24" cy="18" r="11" />
        <path d="M16 27 L12 44 L24 39 L36 44 L32 27" />
      </svg>
    ),
  },
  {
    title: 'Vins au verre',
    text: "Une vingtaine de vins d'Alsace, dont le crémant, servis au verre ou à la bouteille.",
    icon: (
      <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
        <path d="M14 6 H34 L31 22 C31 29 27 31 24 31 C21 31 17 29 17 22 Z" />
        <path d="M24 31 V42" />
        <path d="M16 42 H32" />
      </svg>
    ),
  },
  {
    title: 'Tables partagées',
    text: 'Nos plats se commandent au centre de la table, pour partager entre convives.',
    icon: (
      <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
        <circle cx="24" cy="24" r="17" />
        <circle cx="24" cy="24" r="8" />
      </svg>
    ),
  },
]

export function HomeBenefits() {
  return (
    <section className="bg-vigne px-4 py-16 text-creme">
      <ul className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 text-center sm:grid-cols-2 xl:grid-cols-4">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="flex flex-col items-center gap-3">
            <span className="text-or">{benefit.icon}</span>
            <h3 className="text-2xl font-semibold">{benefit.title}</h3>
            <p className="text-base leading-relaxed opacity-90">{benefit.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
