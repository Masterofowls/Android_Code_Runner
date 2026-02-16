import type { Language } from '../types/language'

export const LANGUAGE_CONFIG: Record<
  Language,
  { name: string; icon: string; monacoLanguage: string; extension: string }
> = {
  javascript: { name: 'JavaScript', icon: '{}', monacoLanguage: 'javascript', extension: 'js' },
  typescript: { name: 'TypeScript', icon: 'T', monacoLanguage: 'typescript', extension: 'ts' },
  python: { name: 'Python', icon: 'Py', monacoLanguage: 'python', extension: 'py' },
  c: { name: 'C', icon: 'C', monacoLanguage: 'c', extension: 'c' },
  cpp: { name: 'C++', icon: '++', monacoLanguage: 'cpp', extension: 'cpp' },
  sql: { name: 'SQL', icon: 'DB', monacoLanguage: 'sql', extension: 'sql' },
  bash: { name: 'Bash', icon: '$', monacoLanguage: 'bash', extension: 'sh' },
}

export const SYNTAX_EXAMPLES: Record<Language, string> = {
  javascript: `// JavaScript Example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
  typescript: `// TypeScript Example
interface User {
  name: string;
  age: number;
}

const user: User = { name: "John", age: 30 };
console.log(user);`,
  python: `# Python Example
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)

print(factorial(5))`,
  c: `// C Example
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  cpp: `// C++ Example
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  sql: `-- SQL Example
SELECT * FROM users WHERE active = 1;`,
  bash: `# Bash Example
echo "Hello from Bash"
ls -la`,
}
