import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { apiDevPlugin } from "./vite-api-dev-plugin";

export default defineConfig({
  plugins: [react(), tailwindcss(), apiDevPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./attached_assets"),
    },
  },
});
