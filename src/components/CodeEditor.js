import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useEffect, useRef } from 'react';
const CodeEditor = forwardRef(({ code, onChange }, ref) => {
    const localRef = useRef(null);
    const editorRef = ref || localRef;
    useEffect(() => {
        // Load Monaco Editor dynamically
        const script = document.createElement('script');
        script.src =
            'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.50.0/min/vs/loader.min.js';
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);
    const handleChange = (e) => {
        onChange(e.target.value);
    };
    return (_jsx("div", { className: "flex flex-col flex-1 overflow-hidden", children: _jsx("div", { className: "flex-1 overflow-auto bg-gray-950", children: _jsx("textarea", { ref: editorRef, value: code, onChange: handleChange, className: "w-full h-full p-4 bg-gray-950 text-gray-100 font-mono text-sm border-0 outline-none resize-none", spellCheck: "false", wrap: "soft", style: {
                    fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                    lineHeight: '1.6',
                    tabSize: 2,
                } }) }) }));
});
CodeEditor.displayName = 'CodeEditor';
export default CodeEditor;
