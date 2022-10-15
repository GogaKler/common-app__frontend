import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    server: {},
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            // api & axios
            '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
            '@axios': fileURLToPath(new URL('./src/api/config', import.meta.url)),
            // Main structure
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
            '@libs': fileURLToPath(new URL('./src/helpers/libs', import.meta.url)),
            '@styles': fileURLToPath(new URL('./src/app/styles', import.meta.url)),
            '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
            '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
            // Custom UI
            '@UI': fileURLToPath(new URL('./src/shared/UI', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                  @import '@styles/theme/theme.scss';
                  @import '@styles/variables/variables.scss';
                  @import '@styles/main';
                `
            }
        }
    }
});
