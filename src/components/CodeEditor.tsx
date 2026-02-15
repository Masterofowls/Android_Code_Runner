import { forwardRef, useEffect, useRef, type ReactElement } from 'react'
import type { Language } from '../types/language'

interface CodeEditorProps {
  code: string
  language: Language
  onChange: (code: string) => void
}

const CodeEditor = forwardRef<HTMLTextAreaElement, CodeEditorProps>(
  ({ code, onChange }: CodeEditorProps, ref): ReactElement => {
    const localRef = useRef<HTMLTextAreaElement>(null)
    const editorRef = (ref as any) || localRef

    useEffect(() => {
      // Load Monaco Editor dynamically
      const script = document.createElement('script')
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.50.0/min/vs/loader.min.js'
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value)
    }

    return (
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto bg-gray-950">
          <textarea
            ref={editorRef as React.Ref<HTMLTextAreaElement>}
            value={code}
            onChange={handleChange}
            className="w-full h-full p-4 bg-gray-950 text-gray-100 font-mono text-sm border-0 outline-none resize-none"
            spellCheck="false"
            wrap="soft"
            style={{
              fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              lineHeight: '1.6',
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
