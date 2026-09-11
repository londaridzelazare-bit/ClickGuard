import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative asset URLs so the build can be served from any path — a static
  // host's subdirectory, a preview URL, or a file:// open — not just the root.
  base: "./",
  plugins: [react()],
  build: { outDir: "dist", sourcemap: true },
  server: { port: 5173 },
});
