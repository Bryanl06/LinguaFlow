import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    proxy: {
      '/api': {
        target:       'http://localhost:3000',
        changeOrigin: true,
        // Cabeceras de seguridad en desarrollo
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.error('[proxy]', err.message)
          })
        },
      },
    },
    // Cabeceras de seguridad para el servidor de desarrollo
    headers: {
      'X-Frame-Options':           'DENY',
      'X-Content-Type-Options':    'nosniff',
      'Referrer-Policy':           'strict-origin-when-cross-origin',
      'Permissions-Policy':        'camera=(), microphone=(self), geolocation=()',
      'Content-Security-Policy':   [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",  // unsafe-eval necesario para Vite HMR en dev
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https:",
        "media-src 'self' blob: https:",
        "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.dictionaryapi.dev https://api.languagetool.org https://speech.platform.bing.com https://translate.google.com",
        "frame-src https://www.youtube.com https://youtube.com",
        "object-src 'none'",
      ].join('; '),
    },
  },

  build: {
    // Generar source maps solo en desarrollo — nunca en producción
    sourcemap: false,
    // Advertir si un chunk supera 1MB
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Separar vendors para mejor caché
        manualChunks: {
          react:    ['react', 'react-dom'],
          router:   ['react-router-dom'],
          query:    ['@tanstack/react-query'],
          charts:   ['recharts'],
          motion:   ['framer-motion'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },

  // Evitar exponer variables de entorno no prefijadas con VITE_
  envPrefix: 'VITE_',
})