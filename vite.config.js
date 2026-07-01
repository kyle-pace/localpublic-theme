import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import tailwindcss from '@tailwindcss/vite';

const fullReload = {
  handleHotUpdate({ file,server }) {
    setTimeout(() => {
      server.openBrowser();
    }, 500);
    return [];
  },
};

export default defineConfig({
  server: {
    port: 2468,
    reload: false,
    proxy: {
      '/': {
        target: 'http://127.0.0.1:2368',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    origin: 'http://127.0.0.1:2368',
    open: '/',
  },
  build: {
    minify: 'esbuild',
    manifest: true,
    outDir: 'assets/built',
    assetsDir: 'assets/src',
    rollupOptions: {
      input: {
        app: 'assets/src/js/index.js'
      },
      output: {
        assetFileNames: "app.[ext]",
        chunkFileNames: "app.[ext]",
        entryFileNames: "[name].js"
      },
    },
  },
  esbuild: {
    minifyIdentifiers: false,
    keepNames: true,
  },
  shared: {
    css: {
      postcss: 'postcss.config.js'
    }
  },
  plugins: [
    tailwindcss(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      renderLegacyChunks: false
    }),
    fullReload
  ]
}) 