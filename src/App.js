import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react'
import { Code2, MonitorSmartphone, Sparkles, Terminal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import CodeEditor from './components/CodeEditor'
import LanguageSelector from './components/LanguageSelector'
import OutputConsole from './components/OutputConsole'
import Toolbar from './components/Toolbar'
import { useCodeStore } from './hooks/useCodeStore'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { DEFAULT_GREETINGS } from './utils/defaultGreetings'
import { executeCode } from './utils/executor'
function App() {
  const { code, language, setCode, setLanguage } = useCodeStore()
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState('')
  const [showWelcome, setShowWelcome] = useState(!localStorage.getItem('app_visited'))
  const [mobileTab, setMobileTab] = useState('editor')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const editorRef = useRef(null)
  const handleRun = async () => {
    setIsRunning(true)
    setError('')
    setOutput('')
    setMobileTab('output')
    try {
      const result = await executeCode(code, language)
      setOutput(result.output || '')
      if (result.error) {
        setError(result.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setIsRunning(false)
    }
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
  }
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setCode(text)
    } catch (err) {
      setError('Failed to paste from clipboard')
    }
  }
  const handleClear = () => {
    setCode('')
    setOutput('')
    setError('')
  }
  const handleLoadExample = (lang) => {
    setLanguage(lang)
    setCode(DEFAULT_GREETINGS[lang])
    setShowWelcome(false)
    localStorage.setItem('app_visited', 'true')
    onOpenChange()
  }
  useKeyboardShortcuts({
    onRun: handleRun,
    onCopy: handleCopy,
    onPaste: handlePaste,
    onClear: handleClear,
  })
  useEffect(() => {
    if (showWelcome) {
      onOpen()
    }
    if (!localStorage.getItem('app_visited')) {
      setShowWelcome(true)
    } else {
      setCode(DEFAULT_GREETINGS[language])
    }
  }, [language, setCode, showWelcome, onOpen, setShowWelcome])
  const languageColors = {
    javascript: '#f7df1e',
    typescript: '#3178c6',
    python: '#3776ab',
    c: '#a89968',
    cpp: '#00599c',
    sql: '#336791',
    bash: '#4eaa25',
  }
  return _jsxs('div', {
    className: 'flex flex-col h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]',
    children: [
      _jsx('header', {
        className: 'flex-none px-4 md:px-6 py-3 border-b border-[var(--glass-border)]',
        style: {
          background: 'linear-gradient(180deg, rgba(17,24,39,0.95) 0%, rgba(10,14,23,0.95) 100%)',
        },
        children: _jsxs('div', {
          className: 'flex items-center justify-between gap-3',
          children: [
            _jsxs('div', {
              className: 'flex items-center gap-2.5',
              children: [
                _jsx('div', {
                  className: 'w-9 h-9 rounded-xl flex items-center justify-center shadow-lg',
                  style: {
                    background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                  },
                  children: _jsx(Code2, { size: 18, className: 'text-white' }),
                }),
                _jsxs('div', {
                  className: 'flex flex-col',
                  children: [
                    _jsx('h1', {
                      className:
                        'text-base md:text-lg font-bold tracking-tight text-[var(--text-primary)]',
                      children: 'Code Runner',
                    }),
                    _jsx('span', {
                      className:
                        'text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-widest hidden sm:block',
                      children: 'Mobile IDE',
                    }),
                  ],
                }),
              ],
            }),
            _jsx(LanguageSelector, { language: language, onLanguageChange: setLanguage }),
          ],
        }),
      }),
      _jsxs('div', {
        className: 'flex md:hidden border-b border-[var(--glass-border)] bg-[var(--bg-secondary)]',
        children: [
          _jsxs('button', {
            onClick: () => setMobileTab('editor'),
            className: `flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors relative ${mobileTab === 'editor' ? 'text-[var(--text-accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`,
            children: [
              _jsx(Code2, { size: 15 }),
              'Editor',
              mobileTab === 'editor' &&
                _jsx('span', {
                  className:
                    'absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full tab-indicator',
                  style: {
                    background: 'linear-gradient(90deg, var(--accent-from), var(--accent-to))',
                  },
                }),
            ],
          }),
          _jsxs('button', {
            onClick: () => setMobileTab('output'),
            className: `flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors relative ${mobileTab === 'output' ? 'text-[var(--text-accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`,
            children: [
              _jsx(Terminal, { size: 15 }),
              'Output',
              (output || error) &&
                mobileTab !== 'output' &&
                _jsx('span', {
                  className: 'w-2 h-2 rounded-full bg-[var(--success)] animate-pulse',
                }),
              mobileTab === 'output' &&
                _jsx('span', {
                  className:
                    'absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full tab-indicator',
                  style: {
                    background: 'linear-gradient(90deg, var(--accent-from), var(--accent-to))',
                  },
                }),
            ],
          }),
        ],
      }),
      _jsxs('div', {
        className: 'flex-1 flex flex-col md:flex-row gap-0 md:gap-3 md:p-3 overflow-hidden',
        children: [
          _jsxs('div', {
            className: `flex-1 md:basis-1/2 flex flex-col overflow-hidden md:rounded-2xl md:border md:border-[var(--glass-border)] ${mobileTab !== 'editor' ? 'hidden md:flex' : 'flex'}`,
            style: { background: 'var(--editor-bg)' },
            children: [
              _jsx(Toolbar, {
                onRun: handleRun,
                onCopy: handleCopy,
                onPaste: handlePaste,
                onClear: handleClear,
                isRunning: isRunning,
                language: language,
              }),
              _jsx('div', {
                className: 'flex-1 overflow-hidden',
                children: _jsx(CodeEditor, {
                  ref: editorRef,
                  code: code,
                  language: language,
                  onChange: setCode,
                }),
              }),
            ],
          }),
          _jsx('div', {
            className: `flex-1 md:basis-1/2 flex flex-col overflow-hidden md:rounded-2xl md:border md:border-[var(--glass-border)] ${mobileTab !== 'output' ? 'hidden md:flex' : 'flex'}`,
            style: { background: 'var(--bg-secondary)' },
            children: _jsx(OutputConsole, { output: output, error: error, isRunning: isRunning }),
          }),
        ],
      }),
      mobileTab === 'editor' &&
        _jsx('div', {
          className: 'fixed bottom-6 right-6 md:hidden z-50',
          children: _jsx('button', {
            onClick: handleRun,
            disabled: isRunning,
            className:
              'w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:opacity-60 btn-accent',
            style: {
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.15)',
            },
            children: isRunning
              ? _jsx('div', {
                  className: 'w-5 h-5 border-2 border-white/30 border-t-white rounded-full spinner',
                })
              : _jsx('svg', {
                  width: '20',
                  height: '20',
                  viewBox: '0 0 24 24',
                  fill: 'white',
                  children: _jsx('polygon', { points: '5,3 19,12 5,21' }),
                }),
          }),
        }),
      _jsx(Modal, {
        isOpen: isOpen,
        onOpenChange: onOpenChange,
        size: 'sm',
        backdrop: 'blur',
        children: _jsx(ModalContent, {
          className: 'border border-[var(--glass-border)] shadow-2xl overflow-hidden',
          style: { background: 'var(--bg-secondary)' },
          children: (onClose) =>
            _jsxs(_Fragment, {
              children: [
                _jsx(ModalHeader, {
                  className: 'flex flex-col gap-1 text-white font-bold text-lg',
                  style: {
                    background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                  },
                  children: _jsxs('div', {
                    className: 'flex items-center gap-2',
                    children: [_jsx(Sparkles, { size: 20 }), 'Welcome to Code Runner'],
                  }),
                }),
                _jsxs(ModalBody, {
                  className: 'py-5 gap-4',
                  style: { background: 'var(--bg-secondary)' },
                  children: [
                    _jsx('p', {
                      className: 'text-[var(--text-secondary)] text-sm leading-relaxed',
                      children:
                        'Execute code in multiple languages directly on your device. Pick a language to get started.',
                    }),
                    _jsx('div', {
                      className: 'grid grid-cols-2 gap-2.5',
                      children: ['javascript', 'typescript', 'python', 'c', 'cpp'].map((lang) =>
                        _jsxs(
                          'button',
                          {
                            className:
                              'flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all text-[var(--text-primary)] hover:scale-[1.02] active:scale-[0.98]',
                            style: {
                              background: 'var(--bg-surface)',
                              border: '1px solid var(--glass-border)',
                            },
                            onMouseEnter: (e) => {
                              e.currentTarget.style.borderColor = languageColors[lang]
                              e.currentTarget.style.boxShadow = `0 0 12px ${languageColors[lang]}20`
                            },
                            onMouseLeave: (e) => {
                              e.currentTarget.style.borderColor = 'var(--glass-border)'
                              e.currentTarget.style.boxShadow = 'none'
                            },
                            onClick: () => handleLoadExample(lang),
                            children: [
                              _jsx('span', {
                                className: 'w-2.5 h-2.5 rounded-full flex-shrink-0',
                                style: { backgroundColor: languageColors[lang] },
                              }),
                              lang.charAt(0).toUpperCase() + lang.slice(1),
                            ],
                          },
                          lang
                        )
                      ),
                    }),
                    _jsxs('div', {
                      className: 'rounded-xl p-3.5 space-y-2',
                      style: {
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--glass-border)',
                      },
                      children: [
                        _jsxs('div', {
                          className: 'flex items-center gap-2',
                          children: [
                            _jsx(MonitorSmartphone, {
                              size: 14,
                              className: 'text-[var(--text-accent)]',
                            }),
                            _jsx('p', {
                              className:
                                'text-[var(--text-accent)] text-xs font-bold uppercase tracking-wider',
                              children: 'Highlights',
                            }),
                          ],
                        }),
                        _jsxs('ul', {
                          className: 'text-[var(--text-muted)] text-xs space-y-1.5 ml-5 list-disc',
                          children: [
                            _jsx('li', { children: 'Real-time syntax highlighting' }),
                            _jsx('li', { children: '7 programming languages' }),
                            _jsx('li', { children: 'Offline execution' }),
                            _jsx('li', { children: 'Mobile-optimized editor' }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                _jsxs(ModalFooter, {
                  className: 'gap-2 border-t border-[var(--glass-border)]',
                  style: { background: 'var(--bg-secondary)' },
                  children: [
                    _jsx(Button, {
                      variant: 'light',
                      onClick: onClose,
                      className: 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                      children: 'Skip',
                    }),
                    _jsx(Button, {
                      onClick: () => {
                        onClose()
                        localStorage.setItem('app_visited', 'true')
                        setShowWelcome(false)
                      },
                      className: 'btn-accent rounded-xl px-6 font-semibold',
                      children: 'Get Started',
                    }),
                  ],
                }),
              ],
            }),
        }),
      }),
    ],
  })
}
export default App
