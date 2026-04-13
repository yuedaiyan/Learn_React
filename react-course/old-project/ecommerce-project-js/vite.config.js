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
    build: {
        outDir: "../ecommerce-backend/dist",
    },
});
// TODO: (Optional)尝试:删除AWS: https://www.youtube.com/watch?v=TtPXvEcE11E&t=36608s 10:37:00
// TODO: 观看:如何部署网页 youtube视频: https://www.youtube.com/watch?v=p1QU3kLFPdg&t=899s
// TODO: 观看:什么是后端 youtube视频: https://www.youtube.com/watch?v=XBu54nfzxAQ
