import { readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import process from "node:process";
import { type CommonServerOptions, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

const isDevelopment = process.env.NODE_ENV === "development";
// const isProduction = process.env.NODE_ENV === "production";

function readFileAsString(path: string): string | undefined {
  try {
    return readFileSync(new URL(path, import.meta.url)).toString("ascii");
  } catch (_e) {
    return undefined;
  }
}

function httpsConfig(): CommonServerOptions["https"] {
  if (isDevelopment) {
    const cert = readFileAsString("./certs/cert.pem");
    const key = readFileAsString("./certs/key.pem");
    const passphrase = readFileAsString("./certs/passphrase.txt");
    return cert && key ? { cert, key, passphrase } : undefined;
  }
  return undefined;
}
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
  server: {
    // allowedHosts: true,
    https: httpsConfig(),
    // proxy: {
    //   "^/api/": {
    //     target: "http://localhost:8080/",
    //     autoRewrite: true,
    //     changeOrigin: true,
    //   },
    // },
  },
});
