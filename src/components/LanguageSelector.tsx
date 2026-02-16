import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { ChevronDown } from 'lucide-react'
import { useMemo } from 'react'
import type { Language } from '../types/language'

interface LanguageSelectorProps {
  language: Language
  onLanguageChange: (language: Language) => void
}

const languageColors: Record<Language, string> = {
  javascript: '#f7df1e',
  typescript: '#3178c6',
  python: '#3776ab',
  c: '#a89968',
  cpp: '#00599c',
  sql: '#336791',
  bash: '#4eaa25',
}

const languageNames: Record<Language, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  c: 'C',
  cpp: 'C++',
  sql: 'SQL',
  bash: 'Bash',
}

export default function LanguageSelector({ language, onLanguageChange }: LanguageSelectorProps) {
  const languages = useMemo((): Language[] => {
    return ['javascript', 'typescript', 'python', 'c', 'cpp', 'sql', 'bash']
  }, [])

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all hover:bg-[var(--bg-elevated)]"
          style={{
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: languageColors[language] }}
          />
          <span className="hidden sm:inline">{languageNames[language]}</span>
          <span className="sm:hidden">
            {language === 'javascript'
              ? 'JS'
              : language === 'typescript'
                ? 'TS'
                : languageNames[language]}
          </span>
          <ChevronDown size={14} className="text-[var(--text-muted)]" />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        className="min-w-[160px]"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-md)',
        }}
        onAction={(key) => onLanguageChange(key as Language)}
        selectedKeys={[language]}
        selectionMode="single"
      >
        {languages.map((lang) => (
          <DropdownItem
            key={lang}
            className="data-[hover=true]:bg-[var(--bg-elevated)] text-[var(--text-primary)] rounded-lg"
            startContent={
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: languageColors[lang] }}
              />
            }
          >
            {languageNames[lang]}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
