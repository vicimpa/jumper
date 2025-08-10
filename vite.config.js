import { defineConfig } from "vite";

export default defineConfig({
  root: './src',
  publicDir: '../public',
  server: { host: true, port: 3000 },
  build: { emptyOutDir: true, outDir: '../dist' },
  plugins: []
});