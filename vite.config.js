import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev proxy: any call to /api is forwarded to the Python (FastAPI) backend,
// so you never deal with CORS locally. Change target if backend runs elsewhere.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
