import { useMemo } from 'react'
import type { Language } from '../types/language'
import { LANGUAGE_CONFIG } from '../utils/languageConfig'

interface LanguageSelectorProps {
  language: Language
  onLanguageChange: (language: Language) => void
}

export default function LanguageSelector({ language, onLanguageChange }: LanguageSelectorProps) {
  const languages = useMemo((): Language[] => {
    return ['javascript', 'typescript', 'python', 'c', 'cpp']
  }, [])

  return (
    <div className="flex gap-2 items-center">
      <label className="text-gray-300 text-sm font-medium">Language:</label>
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {LANGUAGE_CONFIG[lang].name}
          </option>
        ))}
      </select>
    </div>
  )
}
