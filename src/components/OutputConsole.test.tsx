import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import OutputConsole from './OutputConsole'

// Mock Lucide icons to avoid rendering complexities?
// No, they are simple functional components, usually fine.
// If specific tests fail, we can mock them.

describe('OutputConsole', () => {
  const mockOnClear = vi.fn()
  const mockOnClose = vi.fn()
  const defaultProps = {
    output: 'test output',
    error: '',
    isRunning: false,
    onClear: mockOnClear,
    onClose: mockOnClose,
    visible: true,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    })
    // Mock window.confirm
    global.confirm = vi.fn(() => true)
  })

  it('renders output correctly', () => {
    render(<OutputConsole {...defaultProps} />)
    expect(screen.getByText('test output')).toBeInTheDocument()
  })

  it('renders error correctly', () => {
    render(<OutputConsole {...defaultProps} output="" error="execution error" />)
    expect(screen.getByText('execution error')).toBeInTheDocument()
    // Should have red color class - strictly checking class names can be brittle but good for verifying intent
    expect(screen.getByText('execution error')).toHaveClass('text-red-400')
  })

  it('does not render when visible is false', () => {
    const { container } = render(<OutputConsole {...defaultProps} visible={false} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('calls onClear when clear button is clicked and confirmed', () => {
    render(<OutputConsole {...defaultProps} />)

    const clearBtn = screen.getByTitle('Clear')
    fireEvent.click(clearBtn)

    expect(global.confirm).toHaveBeenCalledWith('Clear console output?')
    expect(mockOnClear).toHaveBeenCalled()
  })

  it('does NOT call onClear when cancelled', () => {
    ;(global.confirm as any).mockReturnValue(false)
    render(<OutputConsole {...defaultProps} />)

    const clearBtn = screen.getByTitle('Clear')
    fireEvent.click(clearBtn)

    expect(global.confirm).toHaveBeenCalled()
    expect(mockOnClear).not.toHaveBeenCalled()
  })

  it('copies text to clipboard', async () => {
    render(<OutputConsole {...defaultProps} />)

    const copyBtn = screen.getByTitle('Copy Output')
    fireEvent.click(copyBtn)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test output')

    // Check if icon changes (simulated by finding the check icon or just waiting)
    // The implementation switches icon.
    // We can check if the button content changes or simply trust the function call.
    // Let's verify the clipboard call primarily.
  })

  it('disables buttons when no output', () => {
    render(<OutputConsole {...defaultProps} output="" error="" />)

    const copyBtn = screen.getByTitle('Copy Output')
    const clearBtn = screen.getByTitle('Clear')

    expect(copyBtn).toBeDisabled()
    expect(clearBtn).toBeDisabled()
  })
})
