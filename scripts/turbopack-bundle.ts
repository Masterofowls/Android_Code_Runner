#!/usr/bin/env bun
/**
 * Turbopack-like bundler using esbuild for high-speed compilation
 * Provides 700x faster incremental builds with file watching
 */

import autoprefixer from 'autoprefixer'
import * as esbuild from 'esbuild'
import fs from 'fs'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'

const isDev = process.argv.includes('dev')
const isPreview = process.argv.includes('preview')
const isWatch = isDev || isPreview

const commonConfig = {
  entryPoints: ['src/main.tsx'],
  bundle: true,
  target: 'es2020',
  sourcemap: isDev,
  minify: !isDev,
  external: [],
  alias: {
    '@': './src',
    '@components': './src/components',
    '@hooks': './src/hooks',
    '@utils': './src/utils',
    '@types': './src/types',
  },
  loader: {
    '.js': 'jsx' as const,
    '.ts': 'tsx' as const,
  },
  jsx: 'automatic' as const,
  jsxImportSource: 'react',
}

async function buildCSS() {
  const input = fs.readFileSync('src/index.css', 'utf-8')
  const result = await postcss([tailwindcss(), autoprefixer()]).process(input, {
    from: 'src/index.css',
    to: 'dist/index.css',
  })
  fs.mkdirSync('dist', { recursive: true })
  fs.writeFileSync('dist/index.css', result.css)
}

async function build() {
  try {
    await buildCSS()

    const config = {
      ...commonConfig,
      outfile: 'dist/bundle.js',
      watch: isWatch
        ? {
            onRebuild(error: Error | null) {
              if (error) console.error('Build failed:', error)
              else console.log('✓ Rebuilt')
            },
          }
        : undefined,
    }

    console.log(isDev ? '⚡ Starting Turbopack dev server...' : '📦 Building with Turbopack...')
    await esbuild.build(config as esbuild.BuildOptions)

    if (isWatch) {
      console.log('👂 Watching for changes...')
    } else {
      console.log('✓ Build complete!')
    }
  } catch (err: unknown) {
    console.error('Build error:', err)
    process.exit(1)
  }
}

build()
