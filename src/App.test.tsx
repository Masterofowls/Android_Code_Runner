import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import App from './App'

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Code2: () => <div data-testid="icon-code2" />,
  FileCode2: () => <div data-testid="icon-filecode2" />,
  Menu: () => <div data-testid="icon-menu" />,
  Play: () => <div data-testid="icon-play" />,
  Settings: () => <div data-testid="icon-settings" />,
  Terminal: () => <div data-testid="icon-terminal" />,
  X: () => <div data-testid="icon-x" />,
}))

// Mock CodeEditor since Monaco is heavy
vi.mock('./components/CodeEditor', () => ({
  default: ({ code, onChange }: any) => (
    <textarea data-testid="code-editor" value={code} onChange={(e) => onChange(e.target.value)} />
  ),
}))

// Mock OutputConsole
vi.mock('./components/OutputConsole', () => ({
  default: ({ output }: any) => <div data-testid="output-console">{output}</div>,
}))

describe('App Component', () => {
  it('renders correctly', () => {
    render(<App />)
    expect(screen.getByText('CodeRunner')).toBeInTheDocument()
    expect(screen.getByTestId('code-editor')).toBeInTheDocument()
  })

  it('switches language and updates greeting', async () => {
    render(<App />)

    // Find the select dropdown
    const select = screen.getByRole('combobox')

    // Change to Python
    fireEvent.change(select, { target: { value: 'python' } })

    // Wait for the code to update to Python greeting
    await waitFor(() => {
      const editor = screen.getByTestId('code-editor') as HTMLTextAreaElement
      expect(editor.value).toContain("print('Hello, World!')")
    })
  })

  it('does not overwrite custom code when switching language', async () => {
    render(<App />)

    const editor = screen.getByTestId('code-editor')

    // User types custom code
    fireEvent.change(editor, { target: { value: 'console.log("My Custom Code");' } })

    // Switch language
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'cpp' } })

    // Should NOT change to C++ greeting
    await waitFor(() => {
      // Just execute immediate check, but waitFor ensures state updates settled
      expect(editor).toHaveValue('console.log("My Custom Code");')
    })
  })
})
