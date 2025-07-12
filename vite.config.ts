import { fileURLToPath, URL } from "node:url";
import process from "node:process";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
    base: "",
    plugins: [
        vue({
            template: { transformAssetUrls },
        }),
        vuetify({
            autoImport: true,
        }),
    ],
    build: {
        target: "esnext",
    },
    optimizeDeps: {
        exclude: ["vuetify", "vue-router"],
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
