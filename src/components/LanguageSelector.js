import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { LANGUAGE_CONFIG } from '../utils/languageConfig';
export default function LanguageSelector({ language, onLanguageChange }) {
    const languages = useMemo(() => {
        return ['javascript', 'typescript', 'python', 'c', 'cpp'];
    }, []);
    return (_jsxs("div", { className: "flex gap-2 items-center", children: [_jsx("label", { className: "text-gray-300 text-sm font-medium", children: "Language:" }), _jsx("select", { value: language, onChange: (e) => onLanguageChange(e.target.value), className: "px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary", children: languages.map((lang) => (_jsx("option", { value: lang, children: LANGUAGE_CONFIG[lang].name }, lang))) })] }));
}
