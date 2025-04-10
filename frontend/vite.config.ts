import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html')
    }
  },
  server: {
    port: 3000,
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' https://intexstorage2025.blob.core.windows.net data:; frame-ancestors 'none'; font-src 'self' fonts.gstatic.com data:; connect-src 'self' https://intex-winter-backend-had2hmbubbgfczd8.eastus-01.azurewebsites.net; object-src 'none'; base-uri 'self'; form-action 'self';",
    }
  },
});
