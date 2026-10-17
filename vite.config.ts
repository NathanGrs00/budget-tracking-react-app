/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // Relative paths so the build works on GitHub Pages (served from /budget-tracking-react-app/)
    // and anywhere else. Routing uses the URL hash, so no server rewrites are needed.
    base: "./",
    test: {
        environment: "jsdom",
        setupFiles: ["./src/test/setup.ts"],
    },
});
