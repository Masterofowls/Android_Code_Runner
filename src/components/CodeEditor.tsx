import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { forwardRef, useEffect, useRef, useState, type ReactElement } from 'react'
import type { Language } from '../types/language'

interface CodeEditorProps {
  code: string
  language: Language
  onChange: (code: string) => void
}

const languageMap: { [key in Language]: string } = {
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python',
  c: 'c',
  cpp: 'cpp',
  sql: 'sql',
  bash: 'bash',
}

const CodeEditor = forwardRef<HTMLTextAreaElement, CodeEditorProps>(
  ({ code, language, onChange }: CodeEditorProps, ref): ReactElement => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const highlightRef = useRef<HTMLPreElement>(null)
    const lineNumbersRef = useRef<HTMLDivElement>(null)
    const [lineCount, setLineCount] = useState(1)

    const syncScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
      const target = e.target as HTMLTextAreaElement
      if (highlightRef.current) {
        highlightRef.current.scrollTop = target.scrollTop
        highlightRef.current.scrollLeft = target.scrollLeft
      }
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = target.scrollTop
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value
      onChange(value)
      updateHighlight(value)
    }

    const updateHighlight = (text: string) => {
      if (highlightRef.current) {
        try {
          const highlighted = hljs.highlight(text, {
            language: languageMap[language] || 'plaintext',
            ignoreIllegals: true,
          }).value
          highlightRef.current.innerHTML = highlighted
          setLineCount(text.split('\n').length)
        } catch (e) {
          highlightRef.current.textContent = text
        }
      }
    }

    useEffect(() => {
      updateHighlight(code)
    }, [code, language])

    useEffect(() => {
      if (textareaRef.current) {
        (ref as any).current = textareaRef.current
      }
    }, [ref])

    return (
      <div className="flex h-full overflow-hidden" style={{ background: 'var(--editor-bg)' }}>
        {/* Line Numbers */}
        <div
          ref={lineNumbersRef}
          className="flex-shrink-0 select-none overflow-hidden"
          style={{
            background: 'var(--editor-gutter)',
            color: 'var(--text-muted)',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            paddingRight: '0.875rem',
            paddingLeft: '0.75rem',
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', 'Consolas', monospace",
            fontSize: 'clamp(0.875rem, 4vw, 0.9375rem)',
            lineHeight: '1.8',
            textAlign: 'right',
            minWidth: '48px',
            borderRight: '1px solid var(--glass-border)',
          }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={i + 1}
              style={{
                opacity: 0.5,
                transition: 'opacity 0.15s',
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Editor Area */}
        <div className="flex-1 relative overflow-hidden">
          {/* Syntax Highlight Layer */}
          <pre
            ref={highlightRef}
            className="absolute inset-0 m-0 overflow-hidden pointer-events-none"
            style={{
              padding: '1rem',
              background: 'var(--editor-bg)',
              color: '#c9d1d9',
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', 'Consolas', monospace",
              fontSize: 'clamp(0.875rem, 4vw, 0.9375rem)',
              lineHeight: '1.8',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              zIndex: 1,
            }}
          />

          {/* Textarea Input Layer */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleChange}
            onScroll={syncScroll}
            spellCheck="false"
            wrap="soft"
            className="focus-glow"
            style={{
              position: 'absolute',
              inset: 0,
              margin: 0,
              padding: '1rem',
              backgroundColor: 'transparent',
              color: 'transparent',
              caretColor: 'var(--editor-cursor)',
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', 'Consolas', monospace",
              fontSize: 'clamp(0.875rem, 4vw, 0.9375rem)',
              lineHeight: '1.8',
              border: 'none',
              outline: 'none',
              resize: 'none',
              zIndex: 2,
              width: '100%',
              height: '100%',
              tabSize: 2,
            }}
          />
        </div>
      </div>
    )
  }
)

CodeEditor.displayName = 'CodeEditor'

export default CodeEditor
