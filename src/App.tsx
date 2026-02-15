import { useRef, useState } from 'react'
import CodeEditor from './components/CodeEditor'
import LanguageSelector from './components/LanguageSelector'
import OutputConsole from './components/OutputConsole'
import SettingsPanel from './components/SettingsPanel'
import Toolbar from './components/Toolbar'
import { useAppSettings } from './hooks/useAppSettings'
import { useCodeStore } from './hooks/useCodeStore'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { executeCode } from './utils/executor'

function App() {
  const { code, language, setCode, setLanguage } = useCodeStore()
  const { settings, updateSettings } = useAppSettings()
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState<string>('')
  const editorRef = useRef<any>(null)

  const handleRun = async () => {
    setIsRunning(true)
    setError('')
    setOutput('')

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

  // Setup keyboard shortcuts
  useKeyboardShortcuts({
    onRun: handleRun,
    onCopy: handleCopy,
    onPaste: handlePaste,
    onClear: handleClear,
  })

  return (
    <div
      className={`flex flex-col h-screen overflow-hidden safe-top safe-bottom safe-left safe-right transition-colors duration-200 ${
        settings.theme === 'dark' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Header */}
      <header
        className={`border-b p-4 flex items-center justify-between flex-shrink-0 flex-wrap gap-4 ${
          settings.theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'
        }`}
      >
        <h1 className="text-2xl font-bold text-secondary">Code Runner</h1>
        <div className="flex items-center gap-4 ml-auto flex-wrap">
          <LanguageSelector language={language} onLanguageChange={setLanguage} />
          <SettingsPanel settings={settings} onUpdateSettings={updateSettings} />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 gap-2 p-2 overflow-hidden flex-col md:flex-row">
        {/* Editor Section */}
        <div
          className={`flex flex-col flex-1 rounded-lg overflow-hidden border ${
            settings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
          }`}
        >
          <Toolbar
            onRun={handleRun}
            onCopy={handleCopy}
            onPaste={handlePaste}
            onClear={handleClear}
            isRunning={isRunning}
            language={language}
          />
          <CodeEditor ref={editorRef} code={code} language={language} onChange={setCode} />
        </div>

        {/* Output Section */}
        <div
          className={`flex flex-col flex-1 rounded-lg overflow-hidden border ${
            settings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
          }`}
        >
          <OutputConsole output={output} error={error} isRunning={isRunning} />
        </div>
      </div>
    </div>
  )
}

export default App
