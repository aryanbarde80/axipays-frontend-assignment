import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setupTests.js",
    css: true,
    include: ["src/**/*.{test,spec}.{js,jsx}"]
  }
});
