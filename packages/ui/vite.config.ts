import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      // Ship the raw token file alongside the bundle so a consumer can load
      // *only* the tokens (for a marketing page, an email, a docs site)
      // without pulling in every component's CSS.
      name: "clickguard-copy-tokens",
      closeBundle() {
        const dist = resolve(__dirname, "dist");
        mkdirSync(dist, { recursive: true });
        copyFileSync(resolve(__dirname, "src/styles/tokens.css"), resolve(dist, "tokens.css"));
      },
    },
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: () => "clickguard-ui.js",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: { assetFileNames: "clickguard-ui.[ext]" },
    },
    cssCodeSplit: false,
    sourcemap: true,
    emptyOutDir: true,
  },
});
