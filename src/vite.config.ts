import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    laravel({
      input: ["resources/css/app.css", "resources/js/app.tsx"],
      refresh:true,
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "./resources/js"),
    },
  },
  assetsInclude: ["**/*.svg", "**/*.csv"],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    hmr: {
        host: '127.0.0.1',
    },
    watch: {
      usePolling: true,
      ignored: ["**/storage/**", "**/vendor/**", "**/node_modules/**"],
    },
  },
});
