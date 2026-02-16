import { create } from 'zustand'
import type { Language } from '../types/language'
import { DEFAULT_GREETINGS } from '../utils/defaultGreetings'

interface CodeStore {
  code: string
  language: Language
  setCode: (code: string) => void
  setLanguage: (language: Language) => void
}

export const useCodeStore = create<CodeStore>((set) => ({
  code: DEFAULT_GREETINGS.javascript,
  language: 'javascript',
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
}))
