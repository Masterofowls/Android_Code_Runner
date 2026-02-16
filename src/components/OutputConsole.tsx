import {
  AlertCircle as ErrorIcon,
  Loader2,
  CheckCircle as SuccessIcon,
  Terminal,
} from 'lucide-react'

interface OutputConsoleProps {
  output: string
  error: string
  isRunning: boolean
}

export default function OutputConsole({ output, error, isRunning }: OutputConsoleProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        className="flex-none flex items-center gap-2.5 px-4 py-3 border-b border-[var(--glass-border)]"
        style={{ background: 'var(--editor-line-bg)' }}
      >
        {isRunning ? (
          <>
            <Loader2 size={16} className="text-[var(--warning)] spinner" />
            <span className="text-sm font-bold text-[var(--warning)]">Running...</span>
          </>
        ) : error ? (
          <>
            <ErrorIcon size={16} className="text-[var(--error)]" />
            <span className="text-sm font-bold text-[var(--error)]">Error</span>
          </>
        ) : output ? (
          <>
            <SuccessIcon size={16} className="text-[var(--success)]" />
            <span className="text-sm font-bold text-[var(--success)]">Output</span>
          </>
        ) : (
          <>
            <Terminal size={16} className="text-[var(--text-muted)]" />
            <span className="text-sm font-bold text-[var(--text-muted)]">Console</span>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {/* Empty state */}
        {!output && !error && !isRunning && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 opacity-60">
            <Terminal size={40} className="text-[var(--text-muted)]" strokeWidth={1.5} />
            <p className="text-[var(--text-muted)] text-sm font-medium">
              Run your code to see output here
            </p>
          </div>
        )}

        {/* Running state */}
        {isRunning && (
          <div className="flex flex-col items-center justify-center h-full gap-5">
            <div className="w-12 h-12 rounded-full border-3 border-[var(--accent-from)] border-t-transparent spinner" />
            <p className="text-[var(--text-secondary)] text-sm font-semibold">Executing code...</p>
          </div>
        )}

        {/* Error output */}
        {error && (
          <div
            className="rounded-xl p-4"
            style={{
              background: 'var(--error-bg)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
          >
            <pre
              className="text-sm whitespace-pre-wrap break-words"
              style={{
                color: '#fca5a5',
                fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', monospace",
                fontSize: 'clamp(0.875rem, 4vw, 0.9375rem)',
                lineHeight: '1.7',
              }}
            >
              {error}
            </pre>
          </div>
        )}

        {/* Success output */}
        {output && !isRunning && (
          <div
            className="rounded-xl p-4"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <pre
              className="text-sm whitespace-pre-wrap break-words"
              style={{
                color: '#86efac',
                fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', monospace",
                fontSize: 'clamp(0.875rem, 4vw, 0.9375rem)',
                lineHeight: '1.7',
              }}
            >
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
