import { create } from 'zustand'
import type { Language } from '../types/language'

interface CodeStore {
  code: string
  language: Language
  setCode: (code: string) => void
  setLanguage: (language: Language) => void
}

export const useCodeStore = create<CodeStore>((set) => ({
  code: `// Welcome to Code Runner!
// Select a language and start coding...

console.log('Hello, World!');`,
  language: 'javascript',
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
}))
