export async function executeJavaScript(code) {
    return new Promise((resolve) => {
        let output = '';
        let error = '';
        const originalLog = console.log;
        const originalError = console.error;
        try {
            // Capture console output
            console.log = (...args) => {
                output += args.map((arg) => String(arg)).join(' ') + '\n';
            };
            console.error = (...args) => {
                error += args.map((arg) => String(arg)).join(' ') + '\n';
            };
            // Execute code with timeout
            const timeoutId = setTimeout(() => {
                throw new Error('Execution timeout (5s)');
            }, 5000);
            // Use Function constructor for safe execution
            const func = new Function(code);
            func();
            clearTimeout(timeoutId);
            resolve({ output: output.trimEnd(), error: error || undefined });
        }
        catch (err) {
            error = err instanceof Error ? err.message : String(err);
            resolve({ output: output.trimEnd(), error });
        }
        finally {
            console.log = originalLog;
            console.error = originalError;
        }
    });
}
