import { createVuetify } from "vuetify";
import { dark, light, Theme } from "./Theme";

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
