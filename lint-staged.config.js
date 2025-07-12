/**
 * @see https://github.com/lint-staged/lint-staged#configuration
 * @type {import('lint-staged').Configuration}
 */
const config = {
    "*.{ts,vue}": ["prettier --check", "eslint --max-warnings 0"],
};
export default config;
