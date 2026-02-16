import { expect, test } from '@playwright/test'

test.describe('Code Runner - C/C++ Execution', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should run C code', async ({ page }) => {
    await page.selectOption('select', 'c')
    const code = `#include <stdio.h>

int main() {
  printf("Hello from C");
  return 0;
}`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('Hello from C')
  })

  test('should run C with variables', async ({ page }) => {
    await page.selectOption('select', 'c')
    const code = `#include <stdio.h>

int main() {
  int x = 10;
  int y = 20;
  printf("x = %d, y = %d, sum = %d", x, y, x + y);
  return 0;
}`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('10')
    expect(output).toContain('20')
  })

  test('should run C with loops', async ({ page }) => {
    await page.selectOption('select', 'c')
    const code = `#include <stdio.h>

int main() {
  for (int i = 1; i <= 3; i++) {
    printf("i = %d\\n", i);
  }
  return 0;
}`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('i = 1')
    expect(output).toContain('i = 2')
    expect(output).toContain('i = 3')
  })

  test('should run C++ code', async ({ page }) => {
    await page.selectOption('select', 'cpp')
    const code = `#include <iostream>
using namespace std;

int main() {
  cout << "Hello from C++";
  return 0;
}`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('Hello from C++')
  })

  test('should run C++ with strings', async ({ page }) => {
    await page.selectOption('select', 'cpp')
    const code = `#include <iostream>
#include <string>
using namespace std;

int main() {
  string name = "Bob";
  cout << "Hello, " << name;
  return 0;
}`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('Hello, Bob')
  })

  test('should run C++ with arrays', async ({ page }) => {
    await page.selectOption('select', 'cpp')
    const code = `#include <iostream>
using namespace std;

int main() {
  int arr[] = {1, 2, 3};
  cout << "Array: ";
  for (int x : arr) {
    cout << x << " ";
  }
  return 0;
}`

    await page.fill('textarea', code)
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"] pre').textContent()
    expect(output).toContain('1')
    expect(output).toContain('2')
    expect(output).toContain('3')
  })

  test('should detect missing main function', async ({ page }) => {
    await page.selectOption('select', 'c')
    await page.fill('textarea', 'printf("No main");')
    await page.click('button:has-text("Run")')

    await page.waitForSelector('[class*="output"]', { timeout: 5000 })
    const output = await page.locator('[class*="output"]').textContent()
    const hasWarning = output?.includes('main') || output?.includes('requires') || false
    expect(hasWarning).toBeTruthy()
  })
})
