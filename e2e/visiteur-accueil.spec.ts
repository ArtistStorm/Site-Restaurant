import { expect, test } from '@playwright/test'

test('accueil accessible sans connexion', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Accueil', exact: true })).toBeVisible()
  await expect(page).toHaveURL(/\/$/)
})

test('bouton « Se connecter » mène à la page de connexion', async ({ page }) => {
  await page.goto('/')
  await page.locator('header').first().getByRole('link', { name: 'Se connecter' }).click()
  await expect(page).toHaveURL(/\/login$/)
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible()
})

test('navigation publique : la carte et le blog s\'affichent', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link', { name: 'Carte' }).click()
  await expect(page).toHaveURL(/\/carte$/)
  await page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link', { name: 'Blog' }).click()
  await expect(page).toHaveURL(/\/blog$/)
})
