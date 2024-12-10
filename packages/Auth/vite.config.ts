import path from "node:path";
import ViteYaml from "@modyfi/vite-plugin-yaml";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  envPrefix: "REACT_APP_",
  server: {
    port: 3001,
    proxy: {
      "/api/v1": {
        target: "http://localhost:2826",
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
  define: {
    "process.env": process.env,
  },
  build: {
    outDir: "build",
  },
  plugins: [react(), ViteYaml()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/shared/assets/styles/theme.scss";
        @import "./src/shared/assets/styles/medias.scss";
        @import "./src/shared/assets/styles/font.scss";
        @import "./src/shared/assets/styles/common.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
