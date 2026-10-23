import { expect, test } from '@playwright/test'

const adminEmail = process.env.E2E_ADMIN_EMAIL
const adminPassword = process.env.E2E_ADMIN_PASSWORD

test('protection : /admin redirige vers la connexion sans compte', async ({ page }) => {
  await page.goto('/admin')
  await expect(page).toHaveURL(/\/login$/)
})

test('protection : /mon-espace redirige vers la connexion sans compte', async ({ page }) => {
  await page.goto('/mon-espace')
  await expect(page).toHaveURL(/\/login$/)
})

test('connexion échouée : message d\'erreur affiché', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Email').fill('inconnu@example.com')
  await page.getByLabel('Mot de passe').fill('mauvais-mot-de-passe')
  await page.getByRole('button', { name: 'Se connecter' }).click()
  await expect(page.locator('p.text-red-600')).toBeVisible()
  await expect(page).toHaveURL(/\/login$/)
})

test('connexion réussie : accès à l\'administration', async ({ page }) => {
  test.skip(!adminEmail || !adminPassword, 'Définissez E2E_ADMIN_EMAIL et E2E_ADMIN_PASSWORD')

  await page.goto('/login')
  await page.getByLabel('Email').fill(adminEmail ?? '')
  await page.getByLabel('Mot de passe').fill(adminPassword ?? '')
  await page.getByRole('button', { name: 'Se connecter' }).click()
  await expect(page).toHaveURL(/\/$/)

  await page.goto('/admin')
  await expect(page).toHaveURL(/\/admin$/)
  await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible()
})
