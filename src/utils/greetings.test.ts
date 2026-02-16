import { DEFAULT_GREETINGS, loadGreeting } from './defaultGreetings'

describe('Greeting System', () => {
  it('should be defined', () => {
    expect(loadGreeting).toBeDefined()
    expect(DEFAULT_GREETINGS).toBeDefined()
  })

  // Test dynamic imports actually work
  it('should load javascript greeting immediately', async () => {
    const greeting = await loadGreeting('javascript')
    expect(greeting).toContain("console.log('Hello, World!');")
  })

  it('should load python greeting dynamically', async () => {
    const greeting = await loadGreeting('python')
    expect(greeting).toContain("print('Hello, World!')")
  })

  it('should verify all supported languages have a greeting', async () => {
    const languages = Object.keys(DEFAULT_GREETINGS) as any[]

    // We expect each language to return a non-empty string
    // This catches any missed case in the switch statement
    await Promise.all(
      languages.map(async (lang) => {
        const greeting = await loadGreeting(lang)
        expect(greeting).toBeDefined()
        expect(greeting.length).toBeGreaterThan(0)
      })
    )
  })

  it('should maintain backward compatibility with synchronous access', () => {
    expect(DEFAULT_GREETINGS.javascript).toContain('console.log')
    expect(DEFAULT_GREETINGS.python).toContain('print')
    expect(DEFAULT_GREETINGS.c).toContain('#include <stdio.h>')
  })
})
