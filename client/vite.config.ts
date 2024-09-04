import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { ValidateEnv } from "@julr/vite-plugin-validate-env";
import { z } from "zod";

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
});
