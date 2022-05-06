import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig(({ command }) => {
    return {
        base: command === 'build' ? '/dist/' : '',
        publicDir: false,
        build: {
            manifest: true,
            outDir: "public/dist",
            rollupOptions: {
                input: "resources/ts/app.ts",
            },
        },
        server: {
            strictPort: true,
            port: 3030,
            // https: true,
            hmr: {
                host: "localhost",
            },
        },
        plugins: [
            vue()
        ],
        optimizeDeps: {
            include: [
                "@inertiajs/inertia",
                "@inertiajs/inertia-vue3",
                "axios",
                "vue"
            ],
        },
    };
});
//# sourceMappingURL=vite.config.js.map