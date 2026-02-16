import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import * as React from 'react';
export function CodeTabs({ codes, defaultValue, className, onCopy, copyButton = true, }) {
    const [copied, setCopied] = React.useState(null);
    const tabs = Object.entries(codes);
    const firstKey = tabs[0]?.[0];
    const activeDefault = defaultValue || firstKey;
    const handleCopy = async (language, content) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(language);
            onCopy?.(content);
            setTimeout(() => setCopied(null), 2000);
        }
        catch (err) {
            console.error('Failed to copy:', err);
        }
    };
    if (!tabs.length) {
        return null;
    }
    return (_jsxs(Tabs, { defaultValue: activeDefault, className: cn('w-full', className), children: [_jsx(TabsList, { children: tabs.map(([language]) => (_jsx(TabsTrigger, { value: language, children: language }, language))) }), tabs.map(([language, code]) => (_jsx(TabsContent, { value: language, className: "relative", children: _jsxs("div", { className: "relative", children: [_jsx("pre", { className: "rounded-lg bg-neutral-950 p-4 overflow-x-auto", children: _jsx("code", { className: "text-neutral-50 text-sm font-mono", children: code }) }), copyButton && (_jsx(Button, { variant: "ghost", size: "sm", className: "absolute top-2 right-2", onClick: () => handleCopy(language, code), children: copied === language ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "h-4 w-4 mr-1" }), "Copied"] })) : (_jsxs(_Fragment, { children: [_jsx(Copy, { className: "h-4 w-4 mr-1" }), "Copy"] })) }))] }) }, language)))] }));
}
export const CodeTabsDemo = () => {
    return (_jsx(CodeTabs, { codes: {
            npm: 'npm install @shadcn/ui',
            yarn: 'yarn add @shadcn/ui',
            pnpm: 'pnpm add @shadcn/ui',
            bun: 'bun add @shadcn/ui',
        } }));
};
