import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { ChevronDown } from 'lucide-react'
import { useMemo } from 'react'
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
const languageColors = {
  javascript: '#f7df1e',
  typescript: '#3178c6',
  python: '#3776ab',
  c: '#a89968',
  cpp: '#00599c',
  sql: '#336791',
  bash: '#4eaa25',
}
const languageNames = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  c: 'C',
  cpp: 'C++',
  sql: 'SQL',
  bash: 'Bash',
}
export default function LanguageSelector({ language, onLanguageChange }) {
  const languages = useMemo(() => {
    return ['javascript', 'typescript', 'python', 'c', 'cpp', 'sql', 'bash']
  }, [])
  return _jsxs(Dropdown, {
    backdrop: 'blur',
    children: [
      _jsx(DropdownTrigger, {
        children: _jsxs('button', {
          className:
            'flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all hover:bg-[var(--bg-elevated)]',
          style: {
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--glass-border)',
          },
          children: [
            _jsx('span', {
              className: 'w-2.5 h-2.5 rounded-full flex-shrink-0',
              style: { backgroundColor: languageColors[language] },
            }),
            _jsx('span', { className: 'hidden sm:inline', children: languageNames[language] }),
            _jsx('span', {
              className: 'sm:hidden',
              children:
                language === 'javascript'
                  ? 'JS'
                  : language === 'typescript'
                    ? 'TS'
                    : languageNames[language],
            }),
            _jsx(ChevronDown, { size: 14, className: 'text-[var(--text-muted)]' }),
          ],
        }),
      }),
      _jsx(DropdownMenu, {
        'aria-label': 'Language selection',
        className: 'min-w-[160px]',
        style: {
          background: 'var(--bg-surface)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-md)',
        },
        onAction: (key) => onLanguageChange(key),
        selectedKeys: [language],
        selectionMode: 'single',
        children: languages.map((lang) =>
          _jsx(
            DropdownItem,
            {
              className:
                'data-[hover=true]:bg-[var(--bg-elevated)] text-[var(--text-primary)] rounded-lg',
              startContent: _jsx('span', {
                className: 'w-2.5 h-2.5 rounded-full flex-shrink-0',
                style: { backgroundColor: languageColors[lang] },
              }),
              children: languageNames[lang],
            },
            lang
          )
        ),
      }),
    ],
  })
}
