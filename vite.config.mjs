import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  build: {
    // outDir: "build",
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      plugins: [
        visualizer({
          open: true, // opens the report in the browser automatically
          filename: "build/stats.html", // where the report is saved
        }),
      ],
    },
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new'],
  },
});
