import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    // 1. BASE PATH: Crucial for GitHub Pages
    // Use '/' for username.github.io repos
    base: '/', 

    plugins: [react(), tailwindcss()],
    
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        // Sets '@' to point to your root directory
        '@': path.resolve(__dirname, '.'),
      },
    },

    build: {
      // 2. BUILD SETTINGS: Ensures clean output
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      // Minification makes your site load faster in production
      minify: 'terser',
    },

    server: {
      // HMR settings for your development environment
      hmr: process.env.DISABLE_HMR !== 'true',
      port: 5173,
      host: true,
    },
  };
});
