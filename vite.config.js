import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   base: '/Portfolio/',
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
// })

export default defineConfig({
  base: '/Portfolio/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // SEO: esbuild minification for faster load (better Core Web Vitals)
    minify: 'esbuild',
  },
  esbuild: {
    drop: ['console', 'debugger'], // Remove console.log in production
  }
})
