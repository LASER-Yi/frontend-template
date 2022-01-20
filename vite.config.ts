import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import { defineConfig } from "vite";
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
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
});
