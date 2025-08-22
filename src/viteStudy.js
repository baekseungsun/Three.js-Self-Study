



import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    base: '/Three.js-Self-Study/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './assets'),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://jsonplaceholder.typicode.com',
                changeOrigin: true,
                rewrite: p => p.replace(/^\/api/, ''),
            },
        },
    },
});