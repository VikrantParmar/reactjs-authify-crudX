import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_APP_BASE_NAME,
  /* esbuild: {
    loader: 'jsx', // Set the loader for .js files to JSX
    include: /\.js$/, // Apply this configuration only to .js files
  }, */
  /* define: {
    global: 'window'
  }, */
  optimizeDeps: {
    include: ["@mui/material", "@emotion/react", "@emotion/styled"],
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3001,
    hmr: {
      overlay: false // Disable the overlay for development mode
    }
  },
  preview: {
    // this ensures that the browser opens upon preview start
    open: true,
    // this sets a default port to 3000
    port: 3001
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
})
