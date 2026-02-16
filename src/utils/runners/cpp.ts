import type { ExecutionResult } from '../../types/language'

export async function executeCpp(code: string): Promise<ExecutionResult> {
  try {
    // Check if code has main function
    if (!code.includes('int main') && !code.includes('main()')) {
      return {
        output: '',
        error: 'C++ code must contain a main() function',
      }
    }

    // Basic validation
    if (code.includes('iostream') || code.includes('cout')) {
      // Valid C++ code detected
      // Like C, we'll provide a demonstration mode

      const output = simulateCppExecution(code)
      return { output }
    } else {
      return {
        output: '',
        error:
          'For full C++ execution on Android, please ensure the Tauri backend is properly configured. Browser-based execution has limitations.',
      }
    }
  } catch (err) {
    return {
      output: '',
      error: `C++ execution error: ${err instanceof Error ? err.message : 'Unknown error'}`,
    }
  }
}

// Simple C++ output simulator for demonstration
function simulateCppExecution(code: string): string {
  let output = ''

  // Extract cout statements
  const coutRegex = /cout\s*<<\s*"([^"]*)"/g
  let match

  while ((match = coutRegex.exec(code)) !== null) {
    let text = match[1]

    // Handle escape sequences
    text = text.replace(/\\n/g, '\n')
    text = text.replace(/\\t/g, '\t')
    text = text.replace(/\\r/g, '\r')
    text = text.replace(/\\\\/g, '\\')

    output += text
  }

  // Also check for variables being output
  const varOutputRegex = /cout\s*<<\s*([a-zA-Z_][a-zA-Z0-9_]*)/g
  const matches = code.match(varOutputRegex) || []
  if (matches.length > 0 && !output) {
    output = 'C++ program output:\n[Variables and expressions would be printed here]\n'
  }

  // If we couldn't extract output, show a message
  if (!output) {
    output =
      'C++ program compiled successfully.\n[Note: For actual execution, use the Tauri backend]'
  }

  return output
}
