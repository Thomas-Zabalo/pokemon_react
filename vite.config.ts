import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [react(), tailwindcss()],
    base: isProd ? "/pokemon/" : "/",
    server: {
      port: 5173,
    },
    build: {
      outDir: "dist",
    },
    preview: {
      port: 4173,
      strictPort: true,
    },
  };
});