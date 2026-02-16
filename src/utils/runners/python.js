let pyodide = null;
let pyodideLoading = null;
async function initPyodide() {
    if (pyodide)
        return;
    if (pyodideLoading)
        return pyodideLoading;
    pyodideLoading = (async () => {
        try {
            // @ts-ignore
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js';
            document.head.appendChild(script);
            await new Promise((resolve) => {
                script.onload = resolve;
            });
            // @ts-ignore
            pyodide = await globalThis.loadPyodide();
        }
        catch (error) {
            throw new Error(`Failed to load Pyodide: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    })();
    await pyodideLoading;
}
export async function executePython(code) {
    try {
        // Initialize Pyodide if not already done
        await initPyodide();
        if (!pyodide) {
            return {
                output: '',
                error: 'Python runtime (Pyodide) is loading. Please try again in a moment.',
            };
        }
        // Capture stdout
        const originalLog = console.log;
        const originalError = console.error;
        let capturedOutput = '';
        // Override console methods to capture output
        console.log = (...args) => {
            capturedOutput += args.map((arg) => String(arg)).join(' ') + '\n';
            originalLog(...args);
        };
        console.error = (...args) => {
            capturedOutput += args.map((arg) => String(arg)).join(' ') + '\n';
            originalError(...args);
        };
        try {
            // Run the Python code
            pyodide.runPython(`
import sys
from io import StringIO

# Capture stdout
old_stdout = sys.stdout
sys.stdout = StringIO()

try:
  exec("""${code.replace(/"/g, '\\"')}""")
except Exception as e:
  sys.stdout.write(f"Error: {str(e)}")
  import traceback
  traceback.print_exc()

output = sys.stdout.getvalue()
sys.stdout = old_stdout
`);
            // Get the output
            const output = pyodide.globals.get('output');
            capturedOutput = output ? output.toString() : capturedOutput;
            console.log = originalLog;
            console.error = originalError;
            return { output: capturedOutput || 'No output' };
        }
        catch (error) {
            console.log = originalLog;
            console.error = originalError;
            const errorMsg = error instanceof Error ? error.message : String(error);
            return { output: '', error: errorMsg };
        }
    }
    catch (err) {
        return {
            output: '',
            error: `Python execution error: ${err instanceof Error ? err.message : 'Unknown error'}. Pyodide may be loading. Please ensure you have an internet connection.`,
        };
    }
}
