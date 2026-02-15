import type { ExecutionResult } from '../../types/language'

// Mock C++ execution
export async function executeCpp(code: string): Promise<ExecutionResult> {
  try {
    const error = `C++ execution not available in browser sandbox.\nFor full support, use Tauri backend or Emscripten compilation.\nCode submitted: ${code.substring(0, 50)}...`

    return { output: '', error }
  } catch (err) {
    return {
      output: '',
      error: err instanceof Error ? err.message : 'C++ execution error',
    }
  }
}
