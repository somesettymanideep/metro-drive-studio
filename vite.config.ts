import { defineConfig, createLogger } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

const logger = createLogger();
const originalWarn = logger.warn;

logger.warn = (msg, options) => {
  if (msg.includes("dynamic import cannot be analyzed by Vite")) {
    return;
  }
  originalWarn(msg, options);
};

// Use GitHub Pages base only for production builds.
// Lovable preview / dev server must serve from "/".
export default defineConfig(({ command }) => ({
  base: "/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: { host: "::", port: 8080 },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (
              id.includes("/react/") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom") ||
              id.includes("react-helmet-async")
            ) {
              return "vendor-react";
            }
            if (id.includes("recharts") || id.includes("/d3-") || id.includes("victory-vendor")) {
              return "vendor-charts";
            }
            if (id.includes("@supabase")) {
              return "vendor-supabase";
            }
            if (id.includes("framer-motion")) {
              return "vendor-framer";
            }
            if (id.includes("lucide-react")) {
              return "vendor-lucide";
            }
            if (id.includes("lenis") || id.includes("embla-carousel")) {
              return "vendor-ui";
            }
          }
        },
      },
    },
  },
  customLogger: logger,
}));
