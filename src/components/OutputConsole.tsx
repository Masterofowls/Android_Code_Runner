interface OutputConsoleProps {
  output: string
  error: string
  isRunning: boolean
}

export default function OutputConsole({
  output,
  error,
  isRunning,
}: OutputConsoleProps) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="px-4 py-3 bg-gray-900 border-b border-gray-700 flex-shrink-0">
        <h2 className="text-sm font-semibold text-gray-300">
          {isRunning ? '⏳ Running...' : '✓ Output'}
        </h2>
      </div>

      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {error && (
          <div className="text-red-400 mb-2">
            <div className="font-semibold text-red-500">Error:</div>
            <pre className="whitespace-pre-wrap break-words">{error}</pre>
          </div>
        )}

        {output && (
          <div className="text-green-400">
            <pre className="whitespace-pre-wrap break-words">{output}</pre>
          </div>
        )}

        {!output && !error && !isRunning && (
          <div className="text-gray-500 italic">Output will appear here...</div>
        )}
      </div>
    </div>
  )
}
