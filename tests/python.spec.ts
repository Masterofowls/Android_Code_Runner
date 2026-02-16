import { expect, test } from '@playwright/test'

test.describe('Code Runner - Python Execution', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should run Python code', async ({ page }) => {
    await page.selectOption('select', 'python')
    await page.fill('textarea', 'print("Hello from Python")')
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 8000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('Hello from Python')
  })

  test('should handle Python variables', async ({ page }) => {
    await page.selectOption('select', 'python')
    const code = `name = "Alice"
age = 28
print(name + " is " + str(age))`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 8000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('Alice is 28')
  })

  test('should handle Python lists', async ({ page }) => {
    await page.selectOption('select', 'python')
    const code = `numbers = [1, 2, 3, 4, 5]
print(numbers)
print("Sum: " + str(sum(numbers)))`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 8000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('[1, 2, 3, 4, 5]')
    expect(output).toContain('Sum: 15')
  })

  test('should handle Python functions', async ({ page }) => {
    await page.selectOption('select', 'python')
    const code = `def greet(name):
    return "Hello, " + name + "!"

print(greet("Bob"))`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 8000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('Hello, Bob!')
  })

  test('should handle Python loops', async ({ page }) => {
    await page.selectOption('select', 'python')
    const code = `for i in range(1, 4):
    print("Number: " + str(i))`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 8000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('Number: 1')
    expect(output).toContain('Number: 2')
    expect(output).toContain('Number: 3')
  })

  test('should handle Python errors', async ({ page }) => {
    await page.selectOption('select', 'python')
    await page.fill('textarea', 'print(undefined_variable)')
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 8000 })
    const output = await page.locator('[class*="output"]').textContent()
    const hasError = output?.includes('Error') || output?.includes('NameError') || false
    expect(hasError).toBeTruthy()
  })
})
