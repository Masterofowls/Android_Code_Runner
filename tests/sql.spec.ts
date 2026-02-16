import { expect, test } from '@playwright/test'

test.describe('Code Runner - SQL Execution', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should run SQL CREATE TABLE', async ({ page }) => {
    await page.selectOption('select', 'sql')
    const code = `CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO test VALUES (1, 'Alice');
SELECT * FROM test;`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"]').textContent()
    expect(output).toContain('Alice')
  })

  test('should handle SQL SELECT queries', async ({ page }) => {
    await page.selectOption('select', 'sql')
    const code = `CREATE TABLE users (id INTEGER, name TEXT, age INTEGER);
INSERT INTO users VALUES (1, 'Bob', 30);
INSERT INTO users VALUES (2, 'Charlie', 25);
SELECT * FROM users WHERE age > 25;`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"]').textContent()
    expect(output).toContain('Bob')
    expect(output).toContain('30')
  })

  test('should handle SQL COUNT', async ({ page }) => {
    await page.selectOption('select', 'sql')
    const code = `CREATE TABLE items (id INTEGER, value TEXT);
INSERT INTO items VALUES (1, 'item1'), (2, 'item2'), (3, 'item3');
SELECT COUNT(*) as total FROM items;`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"]').textContent()
    const hasValidOutput =
      output?.includes('table') || output?.includes('3') || output?.includes('total') || false
    expect(hasValidOutput).toBeTruthy()
  })

  test('should handle multiple SQL statements', async ({ page }) => {
    await page.selectOption('select', 'sql')
    const code = `CREATE TABLE products (id INTEGER, name TEXT, price REAL);
INSERT INTO products VALUES (1, 'Apple', 0.99);
INSERT INTO products VALUES (2, 'Orange', 1.50);
SELECT name, price FROM products;`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"]').textContent()
    expect(output).toContain('Apple')
    expect(output).toContain('Orange')
  })

  test('should show SQL errors for invalid syntax', async ({ page }) => {
    await page.selectOption('select', 'sql')
    await page.fill('textarea', 'SELECT * FROM nonexistent_table;')
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"]').textContent()
    const hasError = output?.includes('Error') || output?.includes('error') || false
    expect(hasError).toBeTruthy()
  })
})
