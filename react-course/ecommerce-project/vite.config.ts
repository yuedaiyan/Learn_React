import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [["babel-plugin-react-compiler", { target: "19" }]],
            },
        }),
    ],
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
    // --- TODO:Claude Code对无法联合编译的解决方法,之前的前后端联合build,只能用于AWS,现在可以运行在github page上了
    // preview: {
    //     proxy: {
    //         "/api": {
    //             target: "http://localhost:3000",
    //         },
    //         "/images": {
    //             target: "http://localhost:3000",
    //         },
    //     },
    // },
    build: {
        outDir: "../ecommerce-backend/dist",
    },
});
// TODO: (Optional)删除AWS: https://www.youtube.com/watch?v=TtPXvEcE11E&t=36608s 10:37:00
