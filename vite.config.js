import { resolve } from 'path'

export default {
    root: resolve(__dirname, 'src'),
    base: '',
    build: {
        sourcemap: true,
        outDir: '../dist',
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'src/index.html'),
                migration: resolve(__dirname, 'src/migration.html'),
                tribute: resolve(__dirname, 'src/tribute.html'),
            },
        },
    },
    resolve: {
        alias: {
            '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
        }
    },
    server: {
        port: 8080
    },
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: [
                    'import',
                    'color-functions',
                    'global-builtin',
                    'legacy-js-api',
                    'if-function'
                ],
            },
        },
    },
}
