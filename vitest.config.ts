import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    isolate: false,
    globals: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    setupFiles: "./src/tests/setupTests.ts",
  },
});
