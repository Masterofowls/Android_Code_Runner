export const KEYBOARD_SHORTCUTS = {
    run: { key: 'Enter', ctrl: true, label: 'Run Code' },
    copy: { key: 'C', ctrl: true, shift: true, label: 'Copy' },
    paste: { key: 'V', ctrl: true, shift: true, label: 'Paste' },
    clear: { key: 'L', ctrl: true, shift: true, label: 'Clear' },
};
export function setupKeyboardShortcuts(callbacks) {
    const handleKeyDown = (e) => {
        // Run: Ctrl+Enter
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            callbacks.onRun?.();
        }
        // Copy: Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            callbacks.onCopy?.();
        }
        // Paste: Ctrl+Shift+V
        if (e.ctrlKey && e.shiftKey && e.key === 'V') {
            e.preventDefault();
            callbacks.onPaste?.();
        }
        // Clear: Ctrl+Shift+L
        if (e.ctrlKey && e.shiftKey && e.key === 'L') {
            e.preventDefault();
            callbacks.onClear?.();
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
}
