import { fileURLToPath, URL } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: {
        "@tests": fileURLToPath(new URL("./tests", import.meta.url)),
      },
    },
    test: {
      globals: true,
      // globalSetup: ["./tests/globalSetup.ts"],
      // setupFiles: ["./tests/beforeSuite.ts"],
      environment: "happy-dom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      server: {
        deps: {
          inline: ["vuetify", "vue-router"],
        },
      },
      coverage: {
        cleanOnRerun: true,
        exclude: ["*.config.js", "*.config.ts", "src/vueRouter.ts", "src/vuetify.ts", "tests/**"],
        include: ["**/*.ts", "**/*.vue"],
        reporter: ["lcovonly", "text"],
        reportOnFailure: true,
      },
      reporters: ["junit", "verbose"],
      outputFile: {
        junit: "logs/junit.xml",
      },
    },
  }),
);
