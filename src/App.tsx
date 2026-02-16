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
import CodeEditor from './components/CodeEditor'
import LanguageSelector from './components/LanguageSelector'
import OutputConsole from './components/OutputConsole'
import Toolbar from './components/Toolbar'
import { useCodeStore } from './hooks/useCodeStore'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import type { Language } from './types/language'
import { DEFAULT_GREETINGS } from './utils/defaultGreetings'
import { executeCode } from './utils/executor'

type MobileTab = 'editor' | 'output'

function App() {
  const { code, language, setCode, setLanguage } = useCodeStore()
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState<string>('')
  const [showWelcome, setShowWelcome] = useState(!localStorage.getItem('app_visited'))
  const [mobileTab, setMobileTab] = useState<MobileTab>('editor')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const editorRef = useRef<any>(null)

  const handleRun = async () => {
    setIsRunning(true)
    setError('')
    setOutput('')

    // Auto-switch to output tab on mobile
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

  const handleLoadExample = (lang: Language) => {
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

  const languageColors: Record<Language, string> = {
    javascript: '#f7df1e',
    typescript: '#3178c6',
    python: '#3776ab',
    c: '#a89968',
    cpp: '#00599c',
    sql: '#336791',
    bash: '#4eaa25',
  }

  return (
    <div className="flex flex-col h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* ─── Header ─── */}
      <header
        className="flex-none px-4 md:px-6 py-3 border-b border-[var(--glass-border)]"
        style={{
          background: 'linear-gradient(180deg, rgba(17,24,39,0.95) 0%, rgba(10,14,23,0.95) 100%)',
        }}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
              }}
            >
              <Code2 size={18} className="text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base md:text-lg font-bold tracking-tight text-[var(--text-primary)]">
                Code Runner
              </h1>
              <span className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-widest hidden sm:block">
                Mobile IDE
              </span>
            </div>
          </div>

          {/* Language Selector */}
          <LanguageSelector language={language} onLanguageChange={setLanguage} />
        </div>
      </header>

      {/* ─── Mobile Tab Bar ─── */}
      <div className="flex md:hidden border-b border-[var(--glass-border)] bg-[var(--bg-secondary)]">
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors relative ${
            mobileTab === 'editor'
              ? 'text-[var(--text-accent)]'
              : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
          }`}
        >
          <Code2 size={15} />
          Editor
          {mobileTab === 'editor' && (
            <span
              className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full tab-indicator"
              style={{ background: 'linear-gradient(90deg, var(--accent-from), var(--accent-to))' }}
            />
          )}
        </button>
        <button
          onClick={() => setMobileTab('output')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors relative ${
            mobileTab === 'output'
              ? 'text-[var(--text-accent)]'
              : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
          }`}
        >
          <Terminal size={15} />
          Output
          {(output || error) && mobileTab !== 'output' && (
            <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
          )}
          {mobileTab === 'output' && (
            <span
              className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full tab-indicator"
              style={{ background: 'linear-gradient(90deg, var(--accent-from), var(--accent-to))' }}
            />
          )}
        </button>
      </div>

      {/* ─── Main Content ─── */}
      <div className="flex-1 flex flex-col md:flex-row gap-0 md:gap-3 md:p-3 overflow-hidden">
        {/* Editor Panel */}
        <div
          className={`flex-1 md:basis-1/2 flex flex-col overflow-hidden md:rounded-2xl md:border md:border-[var(--glass-border)] ${
            mobileTab !== 'editor' ? 'hidden md:flex' : 'flex'
          }`}
          style={{ background: 'var(--editor-bg)' }}
        >
          <Toolbar
            onRun={handleRun}
            onCopy={handleCopy}
            onPaste={handlePaste}
            onClear={handleClear}
            isRunning={isRunning}
            language={language}
          />
          <div className="flex-1 overflow-hidden">
            <CodeEditor ref={editorRef} code={code} language={language} onChange={setCode} />
          </div>
        </div>

        {/* Output Panel */}
        <div
          className={`flex-1 md:basis-1/2 flex flex-col overflow-hidden md:rounded-2xl md:border md:border-[var(--glass-border)] ${
            mobileTab !== 'output' ? 'hidden md:flex' : 'flex'
          }`}
          style={{ background: 'var(--bg-secondary)' }}
        >
          <OutputConsole output={output} error={error} isRunning={isRunning} />
        </div>
      </div>

      {/* ─── Mobile FAB: Run Button ─── */}
      {mobileTab === 'editor' && (
        <div className="fixed bottom-6 right-6 md:hidden z-50">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:opacity-60 btn-accent"
            style={{
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.15)',
            }}
          >
            {isRunning ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full spinner" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* ─── Welcome Modal ─── */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm" backdrop="blur">
        <ModalContent
          className="border border-[var(--glass-border)] shadow-2xl overflow-hidden"
          style={{ background: 'var(--bg-secondary)' }}
        >
          {(onClose) => (
            <>
              <ModalHeader
                className="flex flex-col gap-1 text-white font-bold text-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={20} />
                  Welcome to Code Runner
                </div>
              </ModalHeader>
              <ModalBody className="py-5 gap-4" style={{ background: 'var(--bg-secondary)' }}>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Execute code in multiple languages directly on your device. Pick a language to get
                  started.
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  {(['javascript', 'typescript', 'python', 'c', 'cpp'] as Language[]).map(
                    (lang) => (
                      <button
                        key={lang}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all text-[var(--text-primary)] hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--glass-border)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = languageColors[lang]
                          e.currentTarget.style.boxShadow = `0 0 12px ${languageColors[lang]}20`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--glass-border)'
                          e.currentTarget.style.boxShadow = 'none'
                        }}
                        onClick={() => handleLoadExample(lang)}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: languageColors[lang] }}
                        />
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </button>
                    )
                  )}
                </div>

                <div
                  className="rounded-xl p-3.5 space-y-2"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <MonitorSmartphone size={14} className="text-[var(--text-accent)]" />
                    <p className="text-[var(--text-accent)] text-xs font-bold uppercase tracking-wider">
                      Highlights
                    </p>
                  </div>
                  <ul className="text-[var(--text-muted)] text-xs space-y-1.5 ml-5 list-disc">
                    <li>Real-time syntax highlighting</li>
                    <li>7 programming languages</li>
                    <li>Offline execution</li>
                    <li>Mobile-optimized editor</li>
                  </ul>
                </div>
              </ModalBody>
              <ModalFooter
                className="gap-2 border-t border-[var(--glass-border)]"
                style={{ background: 'var(--bg-secondary)' }}
              >
                <Button
                  variant="light"
                  onClick={onClose}
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  Skip
                </Button>
                <Button
                  onClick={() => {
                    onClose()
                    localStorage.setItem('app_visited', 'true')
                    setShowWelcome(false)
                  }}
                  className="btn-accent rounded-xl px-6 font-semibold"
                >
                  Get Started
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default App
