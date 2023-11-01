import {defineConfig} from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'components': fileURLToPath(new URL('./src/components', import.meta.url)),
      'pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      'assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      'icons': fileURLToPath(new URL('./src/assets/icons', import.meta.url)),
      'img': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
      'fonts': fileURLToPath(new URL('./src/assets/fonts', import.meta.url)),
    }
  }
})
