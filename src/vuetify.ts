import { createVuetify } from "vuetify";
import { dark, light } from "./themes.ts";
import { Theme } from "./theme/ThemeStore.ts";

const vuetify = createVuetify({
  defaults: {
    VBtn: {
      class: "text-uppercase",
      style: "letter-spacing: 0.105em;",
    },
    VTextField: {
      persistentPlaceholder: true,
    },
    VTextarea: {
      persistentPlaceholder: true,
    },
  },
  theme: {
    defaultTheme: Theme.LIGHT,
    themes: { light, dark },
  },
});

export default vuetify;
