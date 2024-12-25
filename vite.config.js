import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            ssr: 'resources/js/ssr.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
                compilerOptions: {
                    compatConfig: {
                        MODE: 2
                    }
                }
            },
        }),
    ],
    ssr: {
        noExternal: ['primevue', 'vue-final-modal', '@inertiajs/vue3']
    },
});
