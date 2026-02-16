import type { ExecutionResult } from '../../types/language'

// Declare sql.js on window
declare global {
  interface Window {
    initSqlJs: (config?: { locateFile?: (file: string) => string }) => Promise<{
      Database: new () => unknown
    }>
  }
}

// Using sql.js for in-browser SQLite execution
let sqlJs: unknown = null
let sqlJsLoading: Promise<void> | null = null

async function initSqlJs(): Promise<void> {
  if (sqlJs) return
  if (sqlJsLoading) return sqlJsLoading

  sqlJsLoading = (async () => {
    try {
      // Wait for sql.js to be available on window
      let attempts = 0
      while (typeof window.initSqlJs !== 'function' && attempts < 50) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        attempts++
      }

      if (typeof window.initSqlJs !== 'function') {
        throw new Error('Failed to load SQL.js library. Check your internet connection.')
      }

      // Initialize sql.js
      const SQL = await window.initSqlJs({
        locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
      })

      sqlJs = SQL
    } catch (error) {
      throw new Error(
        `Failed to initialize SQL.js: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  })()

  await sqlJsLoading
}

export async function executeSql(code: string): Promise<ExecutionResult> {
  try {
    await initSqlJs()

    if (!sqlJs) {
      return {
        output: '',
        error: 'SQL runtime (sql.js) is loading. Please try again in a moment.',
      }
    }

    // Create an in-memory database
    const SqlModule = sqlJs as { Database: new () => unknown }
    const db = new SqlModule.Database()
    let output = ''

    try {
      // Split by semicolon to handle multiple statements
      const statements = code.split(';').filter((stmt) => stmt.trim())

      for (const statement of statements) {
        const trimmed = statement.trim()
        if (!trimmed) continue

        try {
          const dbTyped = db as {
            exec: (sql: string) => Array<{ columns: string[]; values: unknown[][] }>
          }
          const result = dbTyped.exec(trimmed)

          if (result.length > 0) {
            // Output table results
            for (const res of result) {
              output += `\n📊 Table: ${res.columns.length} columns\n`
              output += '--'.repeat(30) + '\n'

              // Print column headers
              output += res.columns.join(' | ') + '\n'
              output += '-'.repeat(res.columns.length * 15) + '\n'

              // Print rows
              for (const row of res.values) {
                output += row.map((val: unknown) => String(val)).join(' | ') + '\n'
              }
            }
            output += '\n'
          } else {
            // Non-SELECT statement
            if (trimmed.toUpperCase().startsWith('SELECT')) {
              output += '✓ Query executed: No results\n'
            } else {
              output += `✓ Statement executed successfully\n`
            }
          }
        } catch (err) {
          output += `❌ Error in statement: ${trimmed.substring(0, 50)}...\n`
          output += `Error: ${err instanceof Error ? err.message : String(err)}\n\n`
        }
      }

      const dbTyped = db as { close: () => void }
      dbTyped.close()

      return { output: output || 'SQL executed successfully with no output' }
    } catch (error) {
      const dbTyped = db as { close: () => void }
      dbTyped.close()
      throw error
    }
  } catch (err) {
    return {
      output: '',
      error: `SQL execution error: ${err instanceof Error ? err.message : 'Unknown error'}. Ensure you have an internet connection to load sql.js.`,
    }
  }
}
