import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { CheckCircleIcon, ChevronDownIcon, CircleIcon, Code, XCircleIcon } from 'lucide-react';
const getStatusBadge = (status) => {
    const labels = {
        running: 'Running',
        completed: 'Completed',
        error: 'Error',
    };
    const icons = {
        running: _jsx(CircleIcon, { className: "size-3 animate-pulse text-blue-600" }),
        completed: _jsx(CheckCircleIcon, { className: "size-3 text-green-600" }),
        error: _jsx(XCircleIcon, { className: "size-3 text-red-600" }),
    };
    return (_jsxs(Badge, { className: "gap-1.5 rounded-full text-xs", variant: "secondary", children: [icons[status], labels[status]] }));
};
export const Sandbox = ({ className, ...props }) => (_jsx(Collapsible, { className: cn('not-prose group mb-4 w-full overflow-hidden rounded-md border', className), defaultOpen: true, ...props }));
export const SandboxHeader = ({ className, title, state, ...props }) => (_jsxs(CollapsibleTrigger, { className: cn('flex w-full items-center justify-between gap-4 p-3', className), ...props, children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Code, { className: "size-4 text-muted-foreground" }), _jsx("span", { className: "font-medium text-sm", children: title }), getStatusBadge(state)] }), _jsx(ChevronDownIcon, { className: "size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" })] }));
export const SandboxContent = ({ className, ...props }) => (_jsx(CollapsibleContent, { className: cn('data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in', className), ...props }));
export const SandboxTabs = ({ className, ...props }) => (_jsx(Tabs, { className: cn('w-full gap-0', className), ...props }));
export const SandboxTabsBar = ({ className, ...props }) => (_jsx("div", { className: cn('flex w-full items-center border-border border-t border-b', className), ...props }));
export const SandboxTabsList = ({ className, ...props }) => (_jsx(TabsList, { className: cn('h-auto rounded-none border-0 bg-transparent p-0', className), ...props }));
export const SandboxTabsTrigger = ({ className, ...props }) => (_jsx(TabsTrigger, { className: cn('rounded-none border-0 border-transparent border-b-2 px-4 py-2 font-medium text-muted-foreground text-sm transition-colors data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none', className), ...props }));
export const SandboxTabContent = ({ className, ...props }) => (_jsx(TabsContent, { className: cn('mt-0 text-sm', className), ...props }));
/** Demo component for preview */
export default function SandboxDemo() {
    const sampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`;
    const sampleOutput = `> fibonacci(10)
55`;
    return (_jsx("div", { className: "w-full max-w-lg p-4", children: _jsxs(Sandbox, { children: [_jsx(SandboxHeader, { title: "Code Execution", state: "completed" }), _jsx(SandboxContent, { children: _jsxs(SandboxTabs, { defaultValue: "code", children: [_jsx(SandboxTabsBar, { children: _jsxs(SandboxTabsList, { children: [_jsx(SandboxTabsTrigger, { value: "code", children: "Code" }), _jsx(SandboxTabsTrigger, { value: "console", children: "Console" })] }) }), _jsx(SandboxTabContent, { value: "code", children: _jsx("pre", { className: "overflow-auto bg-muted/30 p-4 font-mono text-xs", children: sampleCode }) }), _jsx(SandboxTabContent, { value: "console", children: _jsx("pre", { className: "overflow-auto bg-muted/30 p-4 font-mono text-xs text-green-600", children: sampleOutput }) })] }) })] }) }));
}
