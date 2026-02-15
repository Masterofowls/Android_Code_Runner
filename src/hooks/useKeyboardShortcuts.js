import { useEffect } from 'react';
import { setupKeyboardShortcuts } from '../utils/shortcuts';
export function useKeyboardShortcuts({ onRun, onCopy, onPaste, onClear, }) {
    useEffect(() => {
        const cleanup = setupKeyboardShortcuts({
            onRun,
            onCopy,
            onPaste,
            onClear,
        });
        return cleanup;
    }, [onRun, onCopy, onPaste, onClear]);
}
