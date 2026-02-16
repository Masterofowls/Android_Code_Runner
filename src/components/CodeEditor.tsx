import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { Clipboard, Copy, Trash2 } from 'lucide-react'
import { forwardRef, useEffect, useRef, useState } from 'react'
import type { Language } from '../types/language'
// Standard utility class merger
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface CodeEditorProps {
  code: string
  language: Language
  onChange: (value: string) => void
  readOnly?: boolean
  className?: string
}

const languageMap: Record<string, string> = {
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python',
  c: 'c',
  cpp: 'cpp',
  sql: 'sql',
  bash: 'bash',
}

const CodeEditor = forwardRef<HTMLTextAreaElement, CodeEditorProps>(
  ({ code, language, onChange, readOnly, className }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const PreRef = useRef<HTMLPreElement>(null)
    
    // Simple state for line numbers
    const [lineCount, setLineCount] = useState(1)

    // Sync scroll
    const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
      if (PreRef.current) {
        PreRef.current.scrollTop = e.currentTarget.scrollTop
        PreRef.current.scrollLeft = e.currentTarget.scrollLeft
      }
    }

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code)
      } catch (err) {
        console.error('Failed to copy!', err)
      }
    }

    const handlePaste = async () => {
      try {
        const text = await navigator.clipboard.readText()
        if (readOnly) return
        
        // Find current selection or cursor position if ref exposed
        // For simplicity, we just append or replace
        // But better is to respect cursor position if possible
        // Since we are using a controlled component via props, we need to call onChange
        // However, we don't have cursor position here easily without ref access inside component
        // Let's just use the ref.current
        if (textareaRef.current) {
            const start = textareaRef.current.selectionStart
            const end = textareaRef.current.selectionEnd
            const newCode = code.substring(0, start) + text + code.substring(end)
            onChange(newCode)
            
            // Restore cursor position
            setTimeout(() => {
                if(textareaRef.current) {
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + text.length
                    textareaRef.current.focus()
                }
            }, 0)
        } else {
            onChange(text)
        }
      } catch (err) {
        console.error('Failed to paste!', err)
      }
    }

    const handleClear = () => {
        if (readOnly) return
        if (confirm('Clear all code?')) {
            onChange('')
        }
    }

    // Handle Change
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value
      onChange(val)
      setLineCount(val.split('\n').length)
    }

    // Highlight effect
    useEffect(() => {
        if (PreRef.current) {
             const codeToHighlight = code || ' ' // ensure non-empty
             try {
                 const highlighted = hljs.highlight(codeToHighlight, {
                     language: languageMap[language] || 'plaintext',
                     ignoreIllegals: true
                 }).value
                 // We need to add a trailing space/newline for display consistency if it ends with one
                 PreRef.current.innerHTML = highlighted + (code.endsWith('\n') ? '<br>' : '')
             } catch (e) {
                 PreRef.current.textContent = code
             }
        }
        setLineCount(code.split('\n').length)
    }, [code, language])


    // Forward Ref
    useEffect(() => {
        if (!ref) return
        if (typeof ref === 'function') {
            ref(textareaRef.current)
        } else {
            ref.current = textareaRef.current
        }
    }, [ref])

    return (
        <div className={cn("relative flex w-full h-full overflow-hidden bg-[#1e1e1e] font-mono text-sm", className)}>
            {/* Line Numbers */}
            <div className="flex-none flex flex-col items-end min-w-[3rem] px-2 py-4 text-gray-500 bg-[#1e1e1e] select-none border-r border-[#333]"> 
               {Array.from({length: lineCount}).map((_, i) => (
                   <div key={i} className="leading-6 h-6">{i + 1}</div>
               ))}
            </div>

            {/* Editor Area */}
            <div className="relative flex-1 h-full overflow-hidden group">
                {/* Formatting Tools */}
                <div className="absolute top-2 right-2 z-50 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                        onClick={handleCopy}
                        className="p-1.5 text-gray-400 hover:text-white bg-[#2d3748]/80 hover:bg-[#4a5568] rounded backdrop-blur-sm transition-colors"
                        title="Copy"
                    >
                        <Copy size={14} />
                    </button>
                    {!readOnly && (
                        <>
                            <button 
                                onClick={handlePaste} // This might need async wrapper locally if not already
                                className="p-1.5 text-gray-400 hover:text-white bg-[#2d3748]/80 hover:bg-[#4a5568] rounded backdrop-blur-sm transition-colors"
                                title="Paste"
                            >
                                <Clipboard size={14} />
                            </button>
                            <button 
                                onClick={handleClear}
                                className="p-1.5 text-gray-400 hover:text-red-400 bg-[#2d3748]/80 hover:bg-[#4a5568] rounded backdrop-blur-sm transition-colors"
                                title="Clear"
                            >
                                <Trash2 size={14} />
                            </button>
                        </>
                    )}
                </div>

                {/* Highlight Layer (Background) */}
                <pre
                    ref={PreRef}
                    aria-hidden="true"
                    className="absolute inset-0 m-0 p-4 font-mono text-sm leading-6 pointer-events-none whitespace-pre overflow-hidden text-gray-300"
                    style={{ tabSize: 4 }} 
                ></pre>

                {/* Input Layer (Foreground) */}
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={handleChange}
                    onScroll={handleScroll}
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    readOnly={readOnly}
                    className="absolute inset-0 w-full h-full m-0 p-4 font-mono text-sm leading-6 bg-transparent text-transparent caret-white resize-none border-0 outline-none overflow-auto whitespace-pre z-10"
                    style={{ 
                        tabSize: 4, 
                        color: 'transparent',
                    }}
                />
            </div>
        </div>
    )
  }
)

CodeEditor.displayName = "CodeEditor"

export default CodeEditor
