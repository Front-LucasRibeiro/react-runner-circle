import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Fix para Apollo Client
      'graphql': 'graphql/index.js'
    }
  },
  optimizeDeps: {
    include: ['graphql']
  }
})
