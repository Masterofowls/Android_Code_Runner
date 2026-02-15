import type { ExecutionResult, Language } from '../types/language'
import { executeC } from './runners/c'
import { executeCpp } from './runners/cpp'
import { executeJavaScript } from './runners/javascript'
import { executePython } from './runners/python'

export async function executeCode(
  code: string,
  language: Language
): Promise<ExecutionResult> {
  try {
    switch (language) {
      case 'javascript':
      case 'typescript':
        return await executeJavaScript(code)
      case 'python':
        return await executePython(code)
      case 'c':
        return await executeC(code)
      case 'cpp':
        return await executeCpp(code)
      default:
        return { output: '', error: 'Language not supported' }
    }
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Execution failed',
    }
  }
}
