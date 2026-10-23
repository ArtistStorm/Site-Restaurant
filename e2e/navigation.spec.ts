import { expect, test } from '@playwright/test'

const adminEmail = process.env.E2E_ADMIN_EMAIL
const adminPassword = process.env.E2E_ADMIN_PASSWORD

test('fil d\'Ariane : affiché sur une catégorie de la carte et retour possible', async ({ page }) => {
  await page.goto('/carte/plats')
  const breadcrumb = page.getByRole('navigation', { name: 'Fil d\'Ariane' })
  await expect(breadcrumb).toBeVisible()
  await breadcrumb.getByRole('link', { name: 'Carte' }).click()
  await expect(page).toHaveURL(/\/carte$/)
})

test('navigation admin : les onglets mènent aux bonnes pages', async ({ page }) => {
  test.skip(!adminEmail || !adminPassword, 'Définissez E2E_ADMIN_EMAIL et E2E_ADMIN_PASSWORD')

  await page.goto('/login')
  await page.getByLabel('Email').fill(adminEmail ?? '')
  await page.getByLabel('Mot de passe').fill(adminPassword ?? '')
  await page.getByRole('button', { name: 'Se connecter' }).click()
  await expect(page).toHaveURL(/\/$/)

  await page.goto('/admin')
  const adminNav = page.getByRole('navigation', { name: 'Sections du responsable' })
  await adminNav.getByRole('link', { name: 'Blog' }).click()
  await expect(page).toHaveURL(/\/admin\/blog$/)

  await adminNav.getByRole('link', { name: 'Carte' }).click()
  await expect(page).toHaveURL(/\/admin\/carte$/)
})
