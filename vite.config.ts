import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib';

  return {
    plugins: [
      vue(),
      ...(isLib
        ? [
            dts({
              include: ['src/index.ts', 'src/types.ts', 'src/components/**/*.vue'],
            }),
          ]
        : []),
    ],
    build: isLib
      ? {
          outDir: 'dist',
          emptyOutDir: true,
          copyPublicDir: false,
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'VueBorderBeam',
            formats: ['es', 'cjs'],
            fileName: format => (format === 'es' ? 'index.js' : 'index.cjs'),
          },
          rollupOptions: {
            external: ['vue'],
            output: {
              exports: 'named',
              globals: {
                vue: 'Vue',
              },
            },
          },
        }
      : {
          outDir: 'demo-dist',
          emptyOutDir: true,
        },
  };
});
