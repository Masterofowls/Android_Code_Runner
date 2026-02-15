export type Language = 'javascript' | 'typescript' | 'python' | 'c' | 'cpp'

export interface ExecutionResult {
  output: string
  error?: string
  exitCode?: number
}

export interface CodeFile {
  id: string
  name: string
  language: Language
  code: string
  createdAt: Date
  updatedAt: Date
}
