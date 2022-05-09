import { ConfigEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import { exec } from 'child_process';


export default defineConfig(({ command }: ConfigEnv) => {
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
        resolve: {
            alias: {
                '@': path.resolve(__dirname + '/resources/ts'),
            }
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
            vue(),
            {
                name: 'blade',
                handleHotUpdate({ file, server }) {
                    if (file.endsWith('.blade.php')) {
                        server.ws.send({
                            type: 'full-reload',
                            path: '*',
                        });
                    }
                },
            },
            {
                name: 'rebuildRoutes',
                handleHotUpdate({file, server}) {
                    if (file.includes('routes') && file.endsWith('.php')) {
                        exec('yarn routes');
                        server.ws.send({
                            type: 'full-reload',
                            path: '*',
                        })
                    }
                }
            },
        ],
        optimizeDeps: {
            include: [
                "@inertiajs/inertia",
                "@inertiajs/inertia-vue3",
                "axios",
                "vue"
            ],
        },
    }
})
