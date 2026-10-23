import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const publicPages = ['/', '/carte', '/blog', '/a-propos', '/contact', '/reserver', '/login', '/register']

for (const path of publicPages) {
  test(`accessibilité WCAG 2.1 AA : ${path}`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(results.violations.map((violation) => `${violation.id} : ${violation.help} (${violation.nodes.length})`)).toEqual([])
  })
}
