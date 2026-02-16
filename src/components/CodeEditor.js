import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
const languageMap = {
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python',
  c: 'c',
  cpp: 'cpp',
  sql: 'sql',
  bash: 'bash',
}
const CodeEditor = forwardRef(({ code, language, onChange }, ref) => {
  const textareaRef = useRef(null)
  const highlightRef = useRef(null)
  const lineNumbersRef = useRef(null)
  const [lineCount, setLineCount] = useState(1)
  const syncScroll = (e) => {
    const target = e.target
    if (highlightRef.current) {
      highlightRef.current.scrollTop = target.scrollTop
      highlightRef.current.scrollLeft = target.scrollLeft
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = target.scrollTop
    }
  }
  const handleChange = (e) => {
    const value = e.target.value
    onChange(value)
    updateHighlight(value)
  }
  const updateHighlight = (text) => {
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
      ref.current = textareaRef.current
    }
  }, [ref])
  return _jsxs('div', {
    className: 'flex h-full overflow-hidden',
    style: { background: 'var(--editor-bg)' },
    children: [
      _jsx('div', {
        ref: lineNumbersRef,
        className: 'flex-shrink-0 select-none overflow-hidden',
        style: {
          background: 'var(--editor-gutter)',
          color: 'var(--text-muted)',
          paddingTop: '0.75rem',
          paddingBottom: '0.75rem',
          paddingRight: '0.75rem',
          paddingLeft: '0.5rem',
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', 'Consolas', monospace",
          fontSize: '0.8125rem',
          lineHeight: '1.7',
          textAlign: 'right',
          minWidth: '42px',
          borderRight: '1px solid var(--glass-border)',
        },
        children: Array.from({ length: lineCount }, (_, i) =>
          _jsx(
            'div',
            { style: { opacity: 0.5, transition: 'opacity 0.15s' }, children: i + 1 },
            i + 1
          )
        ),
      }),
      _jsxs('div', {
        className: 'flex-1 relative overflow-hidden',
        children: [
          _jsx('pre', {
            ref: highlightRef,
            className: 'absolute inset-0 m-0 overflow-hidden pointer-events-none',
            style: {
              padding: '0.75rem',
              background: 'var(--editor-bg)',
              color: '#c9d1d9',
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', 'Consolas', monospace",
              fontSize: '0.8125rem',
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              zIndex: 1,
            },
          }),
          _jsx('textarea', {
            ref: textareaRef,
            value: code,
            onChange: handleChange,
            onScroll: syncScroll,
            spellCheck: 'false',
            wrap: 'soft',
            className: 'focus-glow',
            style: {
              position: 'absolute',
              inset: 0,
              margin: 0,
              padding: '0.75rem',
              backgroundColor: 'transparent',
              color: 'transparent',
              caretColor: 'var(--editor-cursor)',
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', 'Consolas', monospace",
              fontSize: '0.8125rem',
              lineHeight: '1.7',
              border: 'none',
              outline: 'none',
              resize: 'none',
              zIndex: 2,
              width: '100%',
              height: '100%',
              tabSize: 2,
            },
          }),
        ],
      }),
    ],
  })
})
CodeEditor.displayName = 'CodeEditor'
export default CodeEditor
