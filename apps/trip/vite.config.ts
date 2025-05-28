import path from 'node:path';

import ViteYaml from '@modyfi/vite-plugin-yaml';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  envPrefix: 'REACT_APP_',
  base: '/',
  server: {
    port: 2826,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
  define: {
    'process.env': process.env,
  },
  build: {
    outDir: 'build',
  },
  plugins: [react(), ViteYaml(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, '../../Libs'),
    },
  },
  css: {
    modules: {
      // This is the default value, but you can customize it if needed
      generateScopedName: '[local]__[hash:base64:5]',
    },
  },
});
