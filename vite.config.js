import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

const setAliasPath = (path) => fileURLToPath(new URL(path, import.meta.url));

const aliases = {
    '@': setAliasPath('./src'),
    '@api': setAliasPath('./src/shared/api'),
    '@axios': setAliasPath('./src/shared/api/axiosInstance'),
    '@assets': setAliasPath('./src/shared/assets'),
    '@styles': setAliasPath('./src/app/styles'),
    '@use': setAliasPath('./src/shared/lib/hooks'),
    '@directives': setAliasPath('./src/shared/helpers/directives'),
    '@UI': setAliasPath('./src/shared/UI'),
    // FSD
    '@app': setAliasPath('./src/app'),
    '@pages': setAliasPath('./src/pages'),
    '@widgets': setAliasPath('./src/widgets'),
    '@features': setAliasPath('./src/features'),
    '@entities': setAliasPath('./src/entities'),
    '@shared': setAliasPath('./src/shared')
};

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    // const isProd = env.NODE_ENV === 'production';
    // const isDev = env.NODE_ENV === 'development';

    const clientURL = env.VITE_CLIENT_URL;
    const serverURL = env.VITE_BACKEND_URL;

    return {
        plugins: [vue()],
        define: {
            __APP__CLIENT__DOMAIN__: JSON.stringify(clientURL),
            __APP__SERVER__DOMAIN__: JSON.stringify(serverURL)
        },
        resolve: {
            alias: {
                ...aliases
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
    };
});
