import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion'],
  },
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('node_modules/three-')) return 'three'
          if (id.includes('@react-three') || id.includes('node_modules/postprocessing')) return 'r3f'
          if (id.includes('gsap') || id.includes('framer-motion') || id.includes('node_modules/motion') || id.includes('lenis'))
            return 'motion'
          return undefined
        },
      },
    },
  },
})
