import { defineConfig } from 'vite';

export default defineConfig({
  // 使用相对路径，部署到任意子路径或域名下脚本都能正确加载
  base: './',
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
