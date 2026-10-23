import { expect, test } from '@playwright/test'

test('réservation visiteur : soumettre un formulaire vide affiche les erreurs', async ({ page }) => {
  await page.goto('/reserver')
  await page.getByRole('button', { name: 'Réserver' }).click()
  await expect(page.locator('p.text-red-600').first()).toBeVisible()
  await expect(page).toHaveURL(/\/reserver$/)
})

test('réservation visiteur : une adresse email invalide est refusée', async ({ page }) => {
  await page.goto('/reserver')
  await page.getByLabel('Votre nom').fill('Test Visiteur')
  await page.getByLabel('Téléphone').fill('0600000000')
  await page.getByLabel('Email').fill('pas-un-email')
  await page.getByRole('button', { name: 'Réserver' }).click()
  await expect(page.getByLabel('Email')).toHaveJSProperty('validity.typeMismatch', true)
  await expect(page).toHaveURL(/\/reserver$/)
})
