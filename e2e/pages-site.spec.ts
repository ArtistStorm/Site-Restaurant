import { expect, test } from '@playwright/test'

test('en-tête : nom du restaurant visible sur chaque page', async ({ page }) => {
  await page.goto('/a-propos')
  await expect(page.getByRole('link', { name: 'La Winstub du Tanneur' })).toBeVisible()
})

test('page À propos : histoire et équipe affichées', async ({ page }) => {
  await page.goto('/a-propos')
  await expect(page.getByRole('heading', { name: 'La Winstub du Tanneur, depuis 1923', level: 1 })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Qui nous fait vivre' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Marie Walter' })).toBeVisible()
})

test('page Contact : coordonnées et horaires affichés', async ({ page }) => {
  await page.goto('/contact')
  await expect(page.getByRole('heading', { name: 'Passez nous voir', level: 1 })).toBeVisible()
  await expect(page.getByRole('link', { name: 'bonjour@winstub-tanneur.fr' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Horaires' })).toBeVisible()
})
