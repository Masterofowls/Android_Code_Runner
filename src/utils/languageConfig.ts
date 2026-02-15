import type { Language } from '../types/language'

export const LANGUAGE_CONFIG: Record<
  Language,
  { name: string; icon: string; monacoLanguage: string }
> = {
  javascript: { name: 'JavaScript', icon: '{}', monacoLanguage: 'javascript' },
  typescript: { name: 'TypeScript', icon: 'T', monacoLanguage: 'typescript' },
  python: { name: 'Python', icon: 'Py', monacoLanguage: 'python' },
  c: { name: 'C', icon: 'C', monacoLanguage: 'c' },
  cpp: { name: 'C++', icon: '++', monacoLanguage: 'cpp' },
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
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))`,
  c: `// C Example
#include <stdio.h>

int fibonacci(int n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}

int main() {
  printf("%d\\n", fibonacci(10));
  return 0;
}`,
  cpp: `// C++ Example
#include <iostream>

int fibonacci(int n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}

int main() {
  std::cout << fibonacci(10) << std::endl;
  return 0;
}`,
}
