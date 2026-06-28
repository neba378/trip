import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Serve backend-uploaded images (trip photos, payment receipts) through the
    // dev origin so /uploads/<file> resolves without rewriting every <img src>.
    proxy: {
      '/uploads': 'http://localhost:5000',
    },
  },
})
