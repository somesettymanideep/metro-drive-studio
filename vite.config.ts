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
  customLogger: logger,
}));
