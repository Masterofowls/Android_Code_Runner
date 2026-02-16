import type { Language } from '../types/language'

export const DEFAULT_GREETINGS: { [key in Language]: string } = {
  javascript: `console.log('Hello, World!');`,

  typescript: `console.log('Hello, World!');`,

  python: `print('Hello, World!')`,

  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,

  cpp: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,

  sql: `SELECT 'Hello, World!' AS greeting;`,

  bash: `echo "Hello, World!"`,
}
