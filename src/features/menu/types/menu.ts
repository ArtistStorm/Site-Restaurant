export const menuCategories = [
  {
    slug: 'boissons',
    label: 'Boissons',
    intro: "Jus de pomme, limonades et bières **d'Alsace**, servis bien frais.\n\n- Jus de pomme pressé en Alsace\n- Limonades faites maison",
  },
  {
    slug: 'vins',
    label: 'Vins',
    intro: "Une sélection de vins d'**Alsace** (riesling, gewurztraminer, pinot noir, crémant), servis **au verre**.\n\nDemandez conseil à notre équipe pour l'accord avec votre plat.",
  },
  {
    slug: 'entrees',
    label: 'Entrées',
    intro: 'Pour bien commencer le repas, nos entrées sont **préparées chaque jour**, avec des produits de la région.',
  },
  {
    slug: 'plats',
    label: 'Plats',
    intro: "Les plats **alsaciens** et les grands classiques de la cuisine **française**. Les produits sont **frais** et issus de **circuits courts**.",
  },
  {
    slug: 'desserts',
    label: 'Desserts',
    intro: 'Terminez le repas en douceur avec nos desserts **faits maison**, à base de fruits des Vosges.',
  },
] as const

export type MenuCategorySlug = (typeof menuCategories)[number]['slug']

export type MenuItem = {
  id: string
  title: string
  category: MenuCategorySlug
  price: number
  description: string
}
