import {
  AlertCircle as ErrorIcon,
  Loader2,
  CheckCircle as SuccessIcon,
  Terminal,
} from 'lucide-react'
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
export default function OutputConsole({ output, error, isRunning }) {
  return _jsxs('div', {
    className: 'flex flex-col h-full overflow-hidden',
    children: [
      _jsx('div', {
        className:
          'flex-none flex items-center gap-2 px-4 py-2.5 border-b border-[var(--glass-border)]',
        style: { background: 'var(--editor-line-bg)' },
        children: isRunning
          ? _jsxs('div', {
              className: 'flex items-center gap-2',
              children: [
                _jsx(Loader2, { size: 14, className: 'text-[var(--warning)] spinner' }),
                _jsx('span', {
                  className: 'text-sm font-semibold text-[var(--warning)]',
                  children: 'Running...',
                }),
              ],
            })
          : error
            ? _jsxs('div', {
                className: 'flex items-center gap-2',
                children: [
                  _jsx(ErrorIcon, { size: 14, className: 'text-[var(--error)]' }),
                  _jsx('span', {
                    className: 'text-sm font-semibold text-[var(--error)]',
                    children: 'Error',
                  }),
                ],
              })
            : output
              ? _jsxs('div', {
                  className: 'flex items-center gap-2',
                  children: [
                    _jsx(SuccessIcon, { size: 14, className: 'text-[var(--success)]' }),
                    _jsx('span', {
                      className: 'text-sm font-semibold text-[var(--success)]',
                      children: 'Output',
                    }),
                  ],
                })
              : _jsxs('div', {
                  className: 'flex items-center gap-2',
                  children: [
                    _jsx(Terminal, { size: 14, className: 'text-[var(--text-muted)]' }),
                    _jsx('span', {
                      className: 'text-sm font-semibold text-[var(--text-muted)]',
                      children: 'Console',
                    }),
                  ],
                }),
      }),
      _jsxs('div', {
        className: 'flex-1 overflow-auto p-4',
        children: [
          !output &&
            !error &&
            !isRunning &&
            _jsxs('div', {
              className:
                'flex flex-col items-center justify-center h-full text-center gap-3 opacity-50',
              children: [
                _jsx(Terminal, { size: 32, className: 'text-[var(--text-muted)]' }),
                _jsx('p', {
                  className: 'text-[var(--text-muted)] text-sm',
                  children: 'Run your code to see output here',
                }),
              ],
            }),
          isRunning &&
            _jsxs('div', {
              className: 'flex flex-col items-center justify-center h-full gap-4',
              children: [
                _jsx('div', {
                  className:
                    'w-10 h-10 rounded-full border-2 border-[var(--accent-from)] border-t-transparent spinner',
                }),
                _jsx('p', {
                  className: 'text-[var(--text-secondary)] text-sm font-medium',
                  children: 'Executing code...',
                }),
              ],
            }),
          error &&
            _jsx('div', {
              className: 'rounded-xl p-3.5',
              style: { background: 'var(--error-bg)', border: '1px solid rgba(239, 68, 68, 0.2)' },
              children: _jsx('pre', {
                className: 'text-sm whitespace-pre-wrap break-words',
                style: {
                  color: '#fca5a5',
                  fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', monospace",
                  fontSize: '0.8125rem',
                  lineHeight: '1.6',
                },
                children: error,
              }),
            }),
          output &&
            !isRunning &&
            _jsx('div', {
              className: 'rounded-xl p-3.5',
              style: { background: 'var(--bg-surface)', border: '1px solid var(--glass-border)' },
              children: _jsx('pre', {
                className: 'text-sm whitespace-pre-wrap break-words',
                style: {
                  color: '#86efac',
                  fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', monospace",
                  fontSize: '0.8125rem',
                  lineHeight: '1.6',
                },
                children: output,
              }),
            }),
        ],
      }),
    ],
  })
}
