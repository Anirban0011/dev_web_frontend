import 'dotenv/config'
import { test, expect } from '@playwright/test'

test('user can login successfully', async ({ page, context }) => {
    await context.clearCookies()

    await page.goto('http://localhost:5173')
    await page.getByTestId("ham-menu-btn").click()
    await page.getByTestId("login-btn").click()
    await expect(page).toHaveURL(/login/)

    await page.getByTestId("username-email-input").fill(process.env.TEST_USERNAME)
    await page.getByTestId("username-pass-input").fill(process.env.TEST_PASSWORD)

    const [response] = await Promise.all([
        page.waitForResponse(r => r.url().includes('login') && r.request().method() === 'POST'),
        page.getByTestId("submit-login-btn").click()
    ])

    console.log('Status:', response.status())
    console.log('Response body:', await response.text())
    console.log('URL after login:', page.url())
    console.log('localStorage:', await page.evaluate(() => JSON.stringify(localStorage)))
    console.log('Cookies:', JSON.stringify(await context.cookies()))

    await page.waitForTimeout(3000)

    // Dump every <a> tag
    const links = await page.locator('a').all()
    for (const link of links) {
        console.log(`LINK: class="${await link.getAttribute('class')}" text="${await link.textContent()}"`)
    }

    await expect(
        page.locator('a.account', { hasText: process.env.TEST_USERNAME })
    ).toBeVisible({ timeout: 10000 })
})