import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Base public path - important for Vercel deployments
  base: '/',
  // Build configuration
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@tailwindcss/vite'],
          // Add other large dependencies here
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  // Server configuration (development only)
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // Environment variables configuration
  define: {
    'process.env': process.env,
    __APP_ENV__: JSON.stringify(process.env.VITE_MODE || 'development'),
  }
})