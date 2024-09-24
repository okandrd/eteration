import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
console.log("Loaded vitest config");
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setupTest.js",
  },
});
