import { Clipboard, Copy, Play, Trash2 } from 'lucide-react'
import type { Language } from '../types/language'

interface ToolbarProps {
  onRun: () => void
  onCopy: () => void
  onPaste: () => void
  onClear: () => void
  isRunning: boolean
  language: Language
}

export default function Toolbar({
  onRun,
  onCopy,
  onPaste,
  onClear,
  isRunning,
  language,
}: ToolbarProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-700 flex-shrink-0 flex-wrap">
      <button
        onClick={onRun}
        disabled={isRunning}
        className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Run code (Ctrl+Enter)"
      >
        <Play size={18} />
        <span className="hidden sm:inline">{isRunning ? 'Running...' : 'Run'}</span>
      </button>

      <div className="w-px h-6 bg-gray-700 hidden sm:block" />

      <button
        onClick={onCopy}
        className="p-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
        title="Copy code"
      >
        <Copy size={18} />
      </button>

      <button
        onClick={onPaste}
        className="p-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
        title="Paste code"
      >
        <Clipboard size={18} />
      </button>

      <button
        onClick={onClear}
        className="p-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
        title="Clear code and output"
      >
        <Trash2 size={18} />
      </button>

      <div className="ml-auto text-xs text-gray-400 hidden sm:block">{language.toUpperCase()}</div>
    </div>
  )
}
