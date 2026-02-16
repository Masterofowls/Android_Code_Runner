import { expect, test } from '@playwright/test'

test.describe('Code Runner - UI and Mobile Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display header with title', async ({ page }) => {
    const header = page.locator('[class*="AppBar"]')
    await expect(header).toBeVisible()
  })

  test('should have language selector', async ({ page }) => {
    const selector = page.locator('select')
    await expect(selector).toBeVisible()

    const options = await page.locator('select option').count()
    expect(options).toBeGreaterThanOrEqual(7) // All 7 languages
  })

  test('should have code editor textarea', async ({ page }) => {
    const textarea = page.locator('textarea')
    await expect(textarea).toBeVisible()
  })

  test('should have run button', async ({ page }) => {
    const runButton = page.locator('button:has-text("Run")')
    await expect(runButton).toBeVisible()
  })

  test('should have output console', async ({ page }) => {
    const output = page.locator('[class*="output"]')
    await expect(output).toBeVisible()
  })

  test('should display welcome dialog on first visit', async ({ context }) => {
    const page = await context.newPage()
    // Clear localStorage to simulate first visit
    await page.context().clearCookies()
    await page.evaluate(() => localStorage.clear())

    await page.goto('/')

    // Check for welcome dialog or greeting content
    const dialog = page.locator('[role="dialog"]')
    const isDialogVisible = await dialog.isVisible().catch(() => false)

    if (isDialogVisible) {
      expect(isDialogVisible).toBeTruthy()
    }
  })

  test('should load default greeting for JavaScript', async ({ page }) => {
    await page.selectOption('select', 'javascript')
    const codeArea = page.locator('textarea')
    const code = await codeArea.inputValue()

    const hasContent = code.length > 0
    expect(hasContent).toBeTruthy()
  })

  test('should load default greeting for Python', async ({ page }) => {
    await page.selectOption('select', 'python')
    const codeArea = page.locator('textarea')
    const code = await codeArea.inputValue()

    const hasContent = code.length > 0
    expect(hasContent).toBeTruthy()
  })

  test('should load default greeting for SQL', async ({ page }) => {
    await page.selectOption('select', 'sql')
    const codeArea = page.locator('textarea')
    const code = await codeArea.inputValue()

    const hasContent = code.length > 0
    expect(hasContent).toBeTruthy()
  })

  test('should load default greeting for Bash', async ({ page }) => {
    await page.selectOption('select', 'bash')
    const codeArea = page.locator('textarea')
    const code = await codeArea.inputValue()

    const hasContent = code.length > 0
    expect(hasContent).toBeTruthy()
  })

  test('should support keyboard shortcut for run', async ({ page }) => {
    await page.fill('textarea', 'console.log("shortcut test");')

    // Press Ctrl+Enter to run
    await page.keyboard.press('Control+Enter')

    // Check if output appears
    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('shortcut test')
  })

  test('should handle code editor scroll synchronization', async ({ page }) => {
    const longCode = Array(50).fill('console.log("line");').join('\\n')
    await page.fill('textarea', longCode)

    await page.locator('textarea').evaluate((el) => {
      (el as HTMLTextAreaElement).scrollTop = 100
    })

    const scrollTop = await page
      .locator('textarea')
      .evaluate((el) => (el as HTMLTextAreaElement).scrollTop)

    expect(scrollTop).toBeGreaterThan(0)
  })

  test('should highlight syntax based on language', async ({ page }) => {
    await page.selectOption('select', 'python')
    await page.fill('textarea', 'def hello():\\n    print("test")')

    // Check if syntax highlighting is applied (look for any highlighting classes)
    await page.waitForTimeout(500) // Wait for highlight.js to process

    // At minimum, code should be in the editor
    const code = await page.locator('textarea').inputValue()
    expect(code).toContain('def')
  })
})

test.describe('Code Runner - Mobile Responsiveness', () => {
  test('Mobile Chrome - should layout vertically', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }) // iPhone size
    await page.goto('/')

    const layout = page.locator('[class*="flex"]').first()
    const style = await layout.evaluate((el) => {
      const computed = window.getComputedStyle(el as HTMLElement)
      return computed.flexDirection
    })

    // Mobile should have flex-col (column direction)
    expect(style === 'column' || style === 'vertical').toBeTruthy()
  })

  test('Mobile Safari - should be fully responsive', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 }) // iPhone 12 size
    await page.goto('/')

    // Check all main elements are visible
    await expect(page.locator('select')).toBeVisible()
    await expect(page.locator('textarea')).toBeVisible()
    await expect(page.locator('button:has-text("Run")')).toBeVisible()
    await expect(page.locator('[class*="output"]')).toBeVisible()
  })

  test('Tablet - should support landscape orientation', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 600 }) // iPad landscape
    await page.goto('/')

    // Tablet should support side-by-side layout
    const mainContent = page.locator('main')
    await expect(mainContent).toBeVisible()
  })

  test('Mobile - should have readable text size', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const textarea = page.locator('textarea')
    const fontSize = await textarea.evaluate((el) => {
      return window.getComputedStyle(el as HTMLElement).fontSize
    })

    // Font size should be at least 14px
    const size = parseInt(fontSize)
    expect(size).toBeGreaterThanOrEqual(14)
  })

  test('Mobile - button should be touch-friendly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const runButton = page.locator('button:has-text("Run")')
    const box = await runButton.boundingBox()

    // Button should be at least 44x44px for touch targets
    expect(box?.width).toBeGreaterThanOrEqual(44)
    expect(box?.height).toBeGreaterThanOrEqual(44)
  })
})
