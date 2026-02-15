import { useEffect } from 'react'
import { setupKeyboardShortcuts } from '../utils/shortcuts'

interface UseKeyboardShortcutsProps {
  onRun?: () => void
  onCopy?: () => void
  onPaste?: () => void
  onClear?: () => void
}

export function useKeyboardShortcuts({
  onRun,
  onCopy,
  onPaste,
  onClear,
}: UseKeyboardShortcutsProps) {
  useEffect(() => {
    const cleanup = setupKeyboardShortcuts({
      onRun,
      onCopy,
      onPaste,
      onClear,
    })

    return cleanup
  }, [onRun, onCopy, onPaste, onClear])
}
