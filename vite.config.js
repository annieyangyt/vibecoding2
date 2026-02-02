import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 8888,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
