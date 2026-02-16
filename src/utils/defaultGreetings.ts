import type { Language } from '../types/language'
import javascriptGreeting from './greetings/javascript'

export const loadGreeting = async (lang: Language): Promise<string> => {
  switch (lang) {
    case 'javascript':
      return (await import('./greetings/javascript')).default
    case 'typescript':
      return (await import('./greetings/typescript')).default
    case 'python':
      return (await import('./greetings/python')).default
    case 'c':
      return (await import('./greetings/c')).default
    case 'cpp':
      return (await import('./greetings/cpp')).default
    case 'sql':
      return (await import('./greetings/sql')).default
    case 'bash':
      return (await import('./greetings/bash')).default
    default:
      return ''
  }
}

// Kept for backward compatibility or synchronous initialization
// Note: Only JavaScript is statically imported to ensure fast initial load
// Others are loaded dynamically via loadGreeting but fallbacks are provided here for type safety/sync access if needed
// You should prefer loadGreeting(lang) for switching languages.
export const DEFAULT_GREETINGS = {
  get javascript() {
    return javascriptGreeting
  },
  // Fallbacks (duplicated from files to ensure sync access works for check)
  get typescript() {
    return "console.log('Hello, World!');"
  },
  get python() {
    return "print('Hello, World!')"
  },
  get c() {
    return '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}'
  },
  get cpp() {
    return '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}'
  },
  get sql() {
    return "SELECT 'Hello, World!' AS greeting;"
  },
  get bash() {
    return 'echo "Hello, World!"'
  },
}
