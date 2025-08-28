import { defineConfig } from "vite";

export default defineConfig({
  base: './',
  root: './src',
  publicDir: '../public',
  server: { host: true, port: 3000 },
  build: { emptyOutDir: true, outDir: '../dist' },
  plugins: []
});