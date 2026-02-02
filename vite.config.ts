import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('md-editor-v3') || id.includes('markdown-it') || id.includes('highlight.js') || id.includes('codemirror')) {
              return 'md';
            }
            if (id.includes('@tsparticles')) {
              return 'particles';
            }
            if (id.includes('vue') || id.includes('vue-router') || id.includes('pinia')) {
              return 'framework';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})
