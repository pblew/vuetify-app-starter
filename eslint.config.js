import pluginVue from "eslint-plugin-vue";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

export default defineConfigWithVueTs(
    {
        files: ["**/*.{ts,vue}"],
        rules: {
            "@typescript-eslint/explicit-module-boundary-types": 0,
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
        },
    },
    {
        ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
    },
    pluginVue.configs["flat/recommended"],
    vueTsConfigs.recommended,
    skipFormatting,
);
