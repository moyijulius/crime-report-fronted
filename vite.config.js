import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Remove the css.postcss section completely
  optimizeDeps: {
    exclude: [
      '@tailwindcss/oxide',
      '@tailwindcss/node'
    ]
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [
        /@tailwindcss\/.*/,
        /node:.*/,
        'fs',
        'path',
        'child_process'
      ]
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  }
})