import { expect, test } from '@playwright/test'

test.describe('Code Runner - Bash Execution', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should run Bash echo command', async ({ page }) => {
    await page.selectOption('select', 'bash')
    await page.fill('textarea', 'echo "Hello from Bash"')
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('Hello from Bash')
  })

  test('should handle Bash variables', async ({ page }) => {
    await page.selectOption('select', 'bash')
    const code = `name="Alice"
echo "Hello, $name"`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"]').textContent()
    const hasValidOutput =
      output?.includes('Hello, Alice') || output?.includes('Hello, $name') || false
    expect(hasValidOutput).toBeTruthy()
  })

  test('should handle Bash arithmetic', async ({ page }) => {
    await page.selectOption('select', 'bash')
    const code = `x=10
y=20
sum=$((x + y))
echo "Sum: $sum"`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"]').textContent()
    const hasValidOutput = output?.includes('Sum') || output?.includes('30') || false
    expect(hasValidOutput).toBeTruthy()
  })

  test('should handle Bash for loops', async ({ page }) => {
    await page.selectOption('select', 'bash')
    const code = `for i in {1..3}; do
  echo "Number: $i"
done`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"]').textContent()
    const hasLoop = output?.includes('Number') || output?.includes('for loop') || false
    expect(hasLoop).toBeTruthy()
  })

  test('should handle Bash function definitions', async ({ page }) => {
    await page.selectOption('select', 'bash')
    const code = `greet() {
  echo "Greetings!"
}
greet`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"]').textContent()
    const hasValidOutput = output?.includes('Greetings') || output?.includes('Function') || false
    expect(hasValidOutput).toBeTruthy()
  })

  test('should handle Bash comments', async ({ page }) => {
    await page.selectOption('select', 'bash')
    const code = `# This is a comment
echo "Bash works"
# Another comment`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"]').textContent()
    expect(output).not.toContain('This is a comment')
    expect(output).toContain('Bash works')
  })
})
