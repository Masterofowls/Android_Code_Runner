import { Tooltip } from '@heroui/react'
import {
  Trash2 as ClearIcon,
  Copy as CopyIcon,
  Clipboard as PasteIcon,
  Play as PlayIcon,
} from 'lucide-react'
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
const languageColors = {
  javascript: '#f7df1e',
  typescript: '#3178c6',
  python: '#3776ab',
  c: '#a89968',
  cpp: '#00599c',
  sql: '#336791',
  bash: '#4eaa25',
}
export default function Toolbar({ onRun, onCopy, onPaste, onClear, isRunning, language }) {
  return _jsxs('div', {
    className:
      'flex-none flex items-center justify-between px-3 py-2 border-b border-[var(--glass-border)]',
    style: { background: 'var(--editor-line-bg)' },
    children: [
      _jsxs('div', {
        className: 'flex items-center gap-2.5',
        children: [
          _jsx(Tooltip, {
            content: 'Run (Ctrl+Enter)',
            children: _jsx('button', {
              onClick: onRun,
              disabled: isRunning,
              className:
                'hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition-all active:scale-95 disabled:opacity-50 btn-accent',
              children: isRunning
                ? _jsxs(_Fragment, {
                    children: [
                      _jsx('div', {
                        className:
                          'w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full spinner',
                      }),
                      'Running',
                    ],
                  })
                : _jsxs(_Fragment, { children: [_jsx(PlayIcon, { size: 14 }), 'Run'] }),
            }),
          }),
          _jsxs('div', {
            className:
              'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide',
            style: {
              background: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--glass-border)',
            },
            children: [
              _jsx('span', {
                className: 'w-2 h-2 rounded-full',
                style: { backgroundColor: languageColors[language] },
              }),
              language,
            ],
          }),
        ],
      }),
      _jsxs('div', {
        className: 'flex items-center gap-1',
        children: [
          _jsx(Tooltip, {
            content: 'Copy code',
            children: _jsx('button', {
              onClick: onCopy,
              className:
                'p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-all',
              children: _jsx(CopyIcon, { size: 15 }),
            }),
          }),
          _jsx(Tooltip, {
            content: 'Paste code',
            children: _jsx('button', {
              onClick: onPaste,
              className:
                'p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-all',
              children: _jsx(PasteIcon, { size: 15 }),
            }),
          }),
          _jsx(Tooltip, {
            content: 'Clear',
            children: _jsx('button', {
              onClick: onClear,
              className:
                'p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--error)] hover:bg-[var(--error-bg)] transition-all',
              children: _jsx(ClearIcon, { size: 15 }),
            }),
          }),
        ],
      }),
    ],
  })
}
