import { expect, test } from '@playwright/test'

test('liste du blog : articles, tri et filtre par catégorie', async ({ page }) => {
  await page.goto('/blog')
  await expect(page.getByRole('heading', { name: 'Blog', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Les plus lus' })).toBeVisible()

  const listTitles = page.locator('main a[href^="/blog/"] h2')
  await expect(listTitles).toHaveCount(6)
  await expect(listTitles.nth(0)).toHaveText('Une journée en cuisine, de 8 h à minuit')

  const popularButton = page.getByRole('button', { name: 'Populaires', exact: true })
  await popularButton.click()
  await expect(popularButton).toHaveAttribute('aria-pressed', 'true')

  await page.getByRole('button', { name: 'Recettes', exact: true }).click()
  await expect(listTitles).toHaveCount(2)
})

test('article : titre, pas de bouton de réservation, articles liés', async ({ page }) => {
  await page.goto('/blog')
  await page.getByRole('link', { name: /La choucroute, un plat d'hiver/ }).first().click()
  await expect(page).toHaveURL(/\/blog\/[0-9a-f-]{36}$/)
  await expect(
    page.getByRole('heading', { name: "La choucroute, un plat d'hiver qui se prépare à l'avance", level: 1 }),
  ).toBeVisible()
  await expect(page.getByText('Réserver une table')).toHaveCount(0)
  await expect(page.getByRole('complementary')).toBeVisible()
})

test('article inconnu : message et retour au blog', async ({ page }) => {
  await page.goto('/blog/article-inexistant')
  await expect(page.getByText("Cet article n'existe pas.")).toBeVisible()
  await page.getByRole('link', { name: 'Retour au blog' }).click()
  await expect(page).toHaveURL(/\/blog$/)
})
