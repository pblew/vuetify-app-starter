import { createVuetify } from "vuetify";
import { dark, light } from "./themes.ts";
import { Theme } from "./theme/ThemeStore.ts";

const vuetify = createVuetify({
  defaults: {
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
