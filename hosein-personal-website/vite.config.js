import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'public/about.html'),
        contact: resolve(__dirname, 'public/contact.html'),
        personal: resolve(__dirname, 'public/personal.html'),
        professional: resolve(__dirname, 'public/professional.html'),
        projects: resolve(__dirname, 'public/project-detail.html')
      },
    },
  },
})