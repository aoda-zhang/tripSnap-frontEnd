import path from "node:path";
import ViteYaml from "@modyfi/vite-plugin-yaml";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  envPrefix: "REACT_APP_",
  base: "/",
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: `@use "@/shared/assets/styles/theme.scss" as *;
        @use "@/shared/assets/styles/medias.scss" as *;
        @use "@/shared/assets/styles/font.scss" as *;
        @use "@/shared/assets/styles/common.scss" as *;`,
      },
    },
  },
});
