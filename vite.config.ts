/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="node" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { dependencies } from "./package.json";

const groupedDeps = ["react", "react-dom", "react-icons"];

function renderChunks(deps: Record<string, string>) {
  const chunks: Record<string, string[]> = {};

  for (const key in deps) {
    if (!groupedDeps.includes(key)) {
      chunks[key] = [key];
    }
  }

  return chunks;
}

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: "eslint --ext .ts,.tsx src",
      },
    }),
  ],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    manifest: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: groupedDeps,
          ...renderChunks(dependencies),
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
  },
});
