import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // headers: {
    //   'Content-Security-Policy': 
    //     "default-src 'self'; " +
    //     "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com; " +
    //     "script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com; " +
    //     "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; " +
    //     "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; " +
    //     "img-src 'self' data: https://*.googleusercontent.com; " +
    //     "frame-src 'self' https://accounts.google.com; " +
    //     "font-src 'self' https://fonts.gstatic.com data:; " +
    //     "connect-src 'self' https://localhost:5000 https://accounts.google.com https://www.googleapis.com; " +
    //     "object-src 'none'; " +
    //     "base-uri 'self'; " +
    //     "form-action 'self';"
    // }
  },
})
