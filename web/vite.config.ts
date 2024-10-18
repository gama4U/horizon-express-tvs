import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: 'window', // Polyfill global as window for browser
  },
  build: {
    outDir: "dist", // Specify the output directory
    emptyOutDir: true, // Clears the output directory before building
  },
});
