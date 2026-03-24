import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/users": { target: "http://127.0.0.1:5000", changeOrigin: true },
      "/student": { target: "http://127.0.0.1:5000", changeOrigin: true },
      "/attendance": { target: "http://127.0.0.1:5000", changeOrigin: true },
    },
  },
});
