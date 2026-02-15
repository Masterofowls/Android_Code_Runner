import path from 'path'

// Turbopack configuration for high-performance bundling
// Turbopack provides 700x faster builds than Webpack with incremental compilation

const config = {
  root: process.cwd(),
  publicDir: 'public',
  base: '/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  server: {
    middlewareMode: false,
    hmr: true,
    port: 5173,
    strictPort: false,
    host: 'localhost',
  },

  build: {
    target: 'es2020',
    minify: 'terser',
    sourcemap: false,
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    reportCompressedSize: false,
  },

  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
    target: 'es2020',
  },

  css: {
    postcss: './postcss.config.js',
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'zustand', 'lucide-react', '@tauri-apps/api'],
  },

  // Use esbuild for development (Turbopack-like speed)
  // For production, builds run through optimized chain
  define: {
    __DEV__: JSON.stringify(true),
  },
}

export default config
