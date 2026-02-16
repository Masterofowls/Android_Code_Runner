import { Check, Copy, Terminal, Trash2, X } from 'lucide-react'
import { useState } from 'react'

interface OutputConsoleProps {
  output: string
  error?: string
  isRunning: boolean
  onClear: () => void
  onClose: () => void
  visible: boolean
}

export default function OutputConsole({
  output,
  error,
  isRunning,
  onClear,
  onClose,
  visible,
}: OutputConsoleProps) {
  const [copied, setCopied] = useState(false)

  if (!visible) return null

  const handleCopy = async () => {
    const textToCopy = error || output
    if (!textToCopy) return

    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy console output:', err)
    }
  }

  const handleClear = () => {
    if (output || error) {
      if (confirm('Clear console output?')) {
        onClear()
      }
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-t border-[#333]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#333]">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-gray-400" />
          <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">
            Console
          </span>
          {isRunning && (
            <span className="text-xs text-yellow-500 ml-2 animate-pulse">● Running...</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!output && !error}
            className="p-1 hover:bg-[#333] rounded text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            title="Copy Output"
          >
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
          <button
            onClick={handleClear}
            disabled={!output && !error}
            className="p-1 hover:bg-[#333] rounded text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            title="Clear"
          >
            <Trash2 size={14} />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#333] rounded text-gray-400 hover:text-white"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Output Area */}
      <div className="flex-1 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap">
        {error ? (
          <div className="text-red-400">{error}</div>
        ) : output ? (
          <div className="text-gray-300">{output}</div>
        ) : (
          <div className="text-gray-600 italic">
            No output to display. Run your code to see results.
          </div>
        )}
      </div>
    </div>
  )
}
