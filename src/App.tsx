import { Code2, FileCode2, Menu, Play, Settings, Terminal, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import CodeEditor from './components/CodeEditor'
import OutputConsole from './components/OutputConsole'
import { useCodeStore } from './hooks/useCodeStore'
// Assume executor exists or mock it
import { cn } from './lib/utils'
import type { Language } from './types/language'
import { DEFAULT_GREETINGS, loadGreeting } from './utils/defaultGreetings'
import { executeCode } from './utils/executor'
import { LANGUAGE_CONFIG } from './utils/languageConfig'

function App() {
  const { code, language, setCode, setLanguage } = useCodeStore()
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  // Mobile/Layout State
  const [activeTab, setActiveTab] = useState<'editor' | 'console'>('editor')
  const [showSidebar, setShowSidebar] = useState(false)

  // Desktop state
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(false)

  // Initialize with greeting if empty
  useEffect(() => {
    if (!code) {
      setCode(DEFAULT_GREETINGS[language])
    }
  }, []) // Run once on mount

  const handleLanguageChange = async (newLang: Language) => {
    // Check if current code is a default greeting or empty
    const normalize = (str: string) => str.replace(/\s+/g, ' ').trim()
    const currentCodeNormalized = normalize(code)

    const isDefault =
      !code.trim() ||
      Object.values(DEFAULT_GREETINGS).some((g) => normalize(g) === currentCodeNormalized)

    setLanguage(newLang)

    if (isDefault) {
      // Dynamic loading
      try {
        const greeting = await loadGreeting(newLang)
        setCode(greeting)
      } catch (e) {
        console.error('Failed to load greeting', e)
        // Fallback to sync if needed, though loadGreeting handles most
      }
    }
  }

  const handleRun = async () => {
    setIsRunning(true)
    setActiveTab('console') // Switch to console on run for mobile
    setIsConsoleExpanded(true) // Expand console on desktop
    setError('')
    setOutput('')

    try {
      const result = await executeCode(code, language)
      if (result.error) {
        setError(result.error)
      } else {
        setOutput(result.output)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown execution error'
      setError(message)
    } finally {
      setIsRunning(false)
    }
  }

  // Mobile Bottom Nav Item
  const NavItem = ({
    icon: Icon,
    label,
    active,
    onClick,
  }: {
    icon: React.ElementType
    label: string
    active?: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center w-full py-3 gap-1 transition-colors relative',
        active ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'
      )}
    >
      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
      <span className="text-[10px] font-medium">{label}</span>
      {active && <span className="absolute top-0 w-8 h-0.5 bg-blue-400 rounded-b-sm" />}
    </button>
  )

  const toggleConsole = () => {
    if (activeTab === 'console') {
      setActiveTab('editor')
      setIsConsoleExpanded(false)
    } else {
      setActiveTab('console')
      setIsConsoleExpanded(true)
    }
  }

  return (
    <div className="flex h-screen w-full bg-[#0a0e17] text-gray-200 overflow-hidden font-sans select-none">
      {/* Sidebar Overlay (Mobile) */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar (Responsive) */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-[#111827] border-r border-[#1f2937] transform transition-transform duration-300 ease-out',
          showSidebar ? 'translate-x-0' : '-translate-x-full',
          'md:relative md:translate-x-0 md:flex md:flex-col hidden'
        )}
      >
        <div className="h-14 flex items-center justify-between px-4 border-b border-[#1f2937]">
          <div className="flex items-center gap-2 font-bold text-gray-100">
            <Code2 className="text-blue-500" />
            <span>CodeRunner</span>
          </div>
          <button
            onClick={() => setShowSidebar(false)}
            className="md:hidden p-1 hover:bg-[#1f2937] rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Project Files
          </div>
          <div className="mt-1 space-y-0.5">
            <div className="flex items-center gap-3 px-4 py-2 mx-2 text-sm text-blue-400 bg-blue-500/10 rounded-md cursor-pointer border-l-2 border-blue-500">
              <FileCode2 size={16} />
              <span className="truncate">main.{LANGUAGE_CONFIG[language]?.extension || 'js'}</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#1f2937]">
          <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#1f2937] rounded-md transition-colors">
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
        {/* Header */}
        <header className="h-14 bg-[#0a0e17] border-b border-[#1f2937] flex items-center justify-between px-4 shrink-0 transition-colors">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="md:hidden p-2 -ml-2 text-gray-400 hover:text-white rounded-md active:bg-[#1f2937]"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 overflow-hidden">
              <FileCode2 size={18} className="text-blue-500 shrink-0" />
              <span className="font-medium text-sm truncate max-w-[150px]">
                main.{LANGUAGE_CONFIG[language]?.extension || 'ts'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative group">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as Language)}
                className="appearance-none bg-[#111827] border border-[#374151] text-xs rounded-md pl-3 pr-8 py-1.5 outline-none focus:border-blue-500 cursor-pointer hover:bg-[#1f2937] transition-colors"
              >
                {Object.keys(LANGUAGE_CONFIG).map((lang) => (
                  <option key={lang} value={lang}>
                    {LANGUAGE_CONFIG[lang as Language].name}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <button
              onClick={handleRun}
              disabled={isRunning}
              title="Run Code (Ctrl+Enter)"
              className={cn(
                'flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white pl-4 pr-5 py-1.5 rounded-full text-sm font-semibold shadow-lg shadow-blue-900/20 active:scale-95 transition-all text-xs sm:text-sm',
                isRunning && 'opacity-70 cursor-not-allowed'
              )}
            >
              {isRunning ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Play size={14} fill="currentColor" />
              )}
              <span>Run</span>
            </button>
          </div>
        </header>

        {/* Mobile Language Scroll Bar */}
        <div
          className={cn(
            'flex items-center gap-2 px-4 py-2 overflow-x-auto bg-[#0a0e17] border-b border-[#1f2937] sm:hidden no-scrollbar transition-all',
            activeTab === 'console' && 'hidden'
          )}
        >
          {Object.keys(LANGUAGE_CONFIG).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang as Language)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors border',
                language === lang
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/50'
                  : 'bg-[#111827] text-gray-400 border-[#374151] hover:text-gray-300'
              )}
            >
              {LANGUAGE_CONFIG[lang as Language].name}
            </button>
          ))}
        </div>

        {/* Main Area with Editor and Console Split/Toggle */}
        <main className="flex-1 relative overflow-hidden flex flex-col md:flex-row">
          {/* Editor Section */}
          <div
            className={cn(
              'flex-1 relative transition-all duration-300',
              // On mobile, hide editor if console tab is active (simulating full screen console)
              // On desktop, always show editor
              activeTab === 'console' ? 'hidden md:block' : 'block'
            )}
          >
            <CodeEditor
              code={code}
              language={language}
              onChange={setCode}
              className="absolute inset-0"
            />
          </div>

          {/* Console Section */}
          {/* Mobile: Full screen when active tab is console */}
          {/* Desktop: Bottom panel when expanded. Using fixed position relative to main if needed or simple flex. */}
          <div
            className={cn(
              'bg-[#111827] border-t md:border-t-0 md:border-l border-[#1f2937] transition-all duration-300 flex flex-col z-30',
              // Mobile styles
              activeTab === 'console' ? 'absolute inset-0 md:static' : 'hidden md:flex',
              // Desktop styles (always visible but height depends on expansion?)
              // For now, let's make desktop console a fixed side/bottom panel or toggleable.
              // To simplify, let's just make it a dedicated 30% width panel on desktop if expanded.
              isConsoleExpanded ? 'md:w-1/3 md:h-full' : 'md:w-0 md:overflow-hidden md:border-l-0'
            )}
          >
            {/* Mobile Header for Console (Close implementation) */}
            <div className="md:hidden flex items-center justify-between px-4 py-2 border-b border-[#1f2937] bg-[#111827]">
              <span className="font-semibold text-sm">Output Terminal</span>
              <button onClick={() => setActiveTab('editor')} className="p-1 text-gray-400">
                <X size={18} />
              </button>
            </div>

            {/* Desktop Header for Console */}
            <div className="hidden md:flex items-center justify-between px-3 py-2 border-b border-[#1f2937] bg-[#111827]">
              <span className="font-semibold text-xs uppercase tracking-wider text-gray-500">
                Terminal
              </span>
              <button
                onClick={() => setIsConsoleExpanded(false)}
                className="p-1 text-gray-400 hover:text-white rounded"
              >
                <X size={14} />
              </button>
            </div>

            <OutputConsole
              visible={true}
              output={output}
              error={error}
              isRunning={isRunning}
              onClear={() => {
                setOutput('')
                setError('')
              }}
              onClose={() => {
                if (window.innerWidth < 768) {
                  setActiveTab('editor')
                } else {
                  setIsConsoleExpanded(false)
                }
              }}
            />
          </div>
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="md:hidden h-[60px] bg-[#111827] border-t border-[#1f2937] flex items-center justify-around px-2 shrink-0 z-50 pb-safe">
          <NavItem
            icon={FileCode2}
            label="Editor"
            active={activeTab === 'editor'}
            onClick={() => setActiveTab('editor')}
          />
          <NavItem
            icon={Terminal}
            label="Console"
            active={activeTab === 'console'}
            onClick={toggleConsole}
          />
          <NavItem icon={Settings} label="Settings" onClick={() => {}} />
        </nav>
      </div>
    </div>
  )
}

export default App
