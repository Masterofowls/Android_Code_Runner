// Mock C execution - would use actual compilation in production
export async function executeC(code) {
    try {
        // For offline support, would need to embed a C compiler like Emscripten
        const error = `C execution not available in browser sandbox.\nFor full support, use Tauri backend or Emscripten compilation.\nCode submitted: ${code.substring(0, 50)}...`;
        return { output: '', error };
    }
    catch (err) {
        return {
            output: '',
            error: err instanceof Error ? err.message : 'C execution error',
        };
    }
}
