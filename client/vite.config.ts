import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { ValidateEnv } from "@julr/vite-plugin-validate-env";
import { z } from "zod";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    ValidateEnv({
      validator: "zod",
      schema: {
        VITE_BACKEND_URL: z.string().url(),
      },
    }),
    TanStackRouterVite(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
});
