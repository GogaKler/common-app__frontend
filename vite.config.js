import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

/*
 * TODO: Не работают variables scss. Пофиксить в ближайшее время
 * */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(
        new URL('./src/components', import.meta.url)
      ),
      '@libs': fileURLToPath(new URL('./src/libs', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@/styles/main';
        `
      }
    }
  }
});
