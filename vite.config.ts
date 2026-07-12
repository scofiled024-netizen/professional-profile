import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { apiDevPlugin } from "./vite-api-dev-plugin";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }

  return {
    plugins: [react(), tailwindcss(), apiDevPlugin()],
    server: {
      host: "127.0.0.1",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./attached_assets"),
      },
    },
  };
});
