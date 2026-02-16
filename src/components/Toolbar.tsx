import { Tooltip } from '@heroui/react'
import {
  Trash2 as ClearIcon,
  Copy as CopyIcon,
  Clipboard as PasteIcon,
  Play as PlayIcon,
} from 'lucide-react'
import type { Language } from '../types/language'

interface ToolbarProps {
  onRun: () => void
  onCopy: () => void
  onPaste: () => void
  onClear: () => void
  isRunning: boolean
  language: Language
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

export default function Toolbar({
  onRun,
  onCopy,
  onPaste,
  onClear,
  isRunning,
  language,
}: ToolbarProps) {
  return (
    <div
      className="flex-none flex items-center justify-between px-3 py-2 border-b border-[var(--glass-border)]"
      style={{ background: 'var(--editor-line-bg)' }}
    >
      {/* Left: Run + Language badge */}
      <div className="flex items-center gap-2.5">
        {/* Run Button (desktop only — mobile uses FAB) */}
        <Tooltip content={`Run (Ctrl+Enter)`}>
          <button
            onClick={onRun}
            disabled={isRunning}
            className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition-all active:scale-95 disabled:opacity-50 btn-accent"
          >
            {isRunning ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full spinner" />
                Running
              </>
            ) : (
              <>
                <PlayIcon size={14} />
                Run
              </>
            )}
          </button>
        </Tooltip>

        {/* Language Badge */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide"
          style={{
            background: 'var(--bg-surface)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: languageColors[language] }}
          />
          {language}
        </div>
      </div>

      {/* Right: Action buttons */}
      <div className="flex items-center gap-1">
        <Tooltip content="Copy code">
          <button
            onClick={onCopy}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-all"
          >
            <CopyIcon size={15} />
          </button>
        </Tooltip>

        <Tooltip content="Paste code">
          <button
            onClick={onPaste}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-all"
          >
            <PasteIcon size={15} />
          </button>
        </Tooltip>

        <Tooltip content="Clear">
          <button
            onClick={onClear}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--error)] hover:bg-[var(--error-bg)] transition-all"
          >
            <ClearIcon size={15} />
          </button>
        </Tooltip>
      </div>
    </div>
  )
}
