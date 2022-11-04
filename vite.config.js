import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    server: {
        host: true
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            // api & axios config
            '@api': fileURLToPath(new URL('./src/shared/api', import.meta.url)),
            '@axios': fileURLToPath(new URL('./src/app/config/api', import.meta.url)),
            // Main structure
            '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
            '@styles': fileURLToPath(new URL('./src/app/styles', import.meta.url)),
            '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
            // Libraries
            '@libs': fileURLToPath(new URL('./src/shared/libs', import.meta.url)),
            // UI
            '@UI': fileURLToPath(new URL('./src/shared/UI', import.meta.url)),
            // Use Utils
            '@use': fileURLToPath(new URL('./src/shared/utils', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import '@styles/main';
                `
            }
        }
    }
});
