import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // headers: {
    //   'Content-Security-Policy':
    //     "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';style-src 'self' fonts.googleapis.com  ; img-src 'self' data:; fram-ancestors 'none'; font-src 'self' fonts.gstatic.com data:; connect-src 'self' https://localhost:5000; object-src 'none'; base-uri 'self'; form-action 'self';",
    // }
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' https://intexstorage2025.blob.core.windows.net data:; frame-ancestors 'none'; font-src 'self' fonts.gstatic.com data:; connect-src 'self' https://localhost:5000; object-src 'none'; base-uri 'self'; form-action 'self';",
    },
  },
});
