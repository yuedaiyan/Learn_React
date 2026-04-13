import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        open: "/",
        proxy: {
            "/api": {
                target: "http://localhost:3000",
            },
            "/images": {
                target: "http://localhost:3000",
            },
        },
    },
    build: {
        outDir:'../ecommerce-backend/dist'
    }
});
// TODO: 尝试删除AWS 10:37:00
