import { expect, test } from '@playwright/test'

test.describe('Code Runner - JavaScript/TypeScript Execution', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should run JavaScript code', async ({ page }) => {
    await page.selectOption('select', 'javascript')
    await page.fill('textarea', 'console.log("Hello " + "World");')
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('Hello World')
  })

  test('should run TypeScript code', async ({ page }) => {
    await page.selectOption('select', 'typescript')
    const code = `interface User { name: string; age: number; }
const user: User = { name: "Alice", age: 30 };
console.log(user.name + " is " + user.age + " years old");`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('Alice is 30 years old')
  })

  test('should handle JavaScript arithmetic', async ({ page }) => {
    await page.selectOption('select', 'javascript')
    await page.fill('textarea', 'console.log(10 + 20); console.log(30 * 2);')
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('30')
    expect(output).toContain('60')
  })

  test('should handle JavaScript errors', async ({ page }) => {
    await page.selectOption('select', 'javascript')
    await page.fill('textarea', 'console.log(x);')
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"]').textContent()
    const hasError = output?.includes('Error') || output?.includes('is not defined') || false
    expect(hasError).toBeTruthy()
  })

  test('should run TypeScript with arrow functions', async ({ page }) => {
    await page.selectOption('select', 'typescript')
    const code = `const add = (a: number, b: number): number => a + b;
console.log(add(5, 10));`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('15')
  })
})
