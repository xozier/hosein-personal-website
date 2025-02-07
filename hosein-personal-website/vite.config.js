import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'public/about.html',
        contact: 'public/contact.html',
        personal: 'public/personal.html',
        professional: 'public/professional.html'
      }
    }
  }
}) 