import type { ThemeDefinition } from "vuetify";
import colours from "vuetify/util/colors";

// for colours, see: https://vuetifyjs.com/en/styles/colors/#material-colors

export const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: colours.grey.lighten4,
    surface: colours.shades.white,
    primary: colours.indigo.lighten1,
    secondary: colours.brown.lighten1,
    error: colours.red.darken1,
    warning: colours.deepOrange.darken1,
    success: colours.green.darken1,
    info: colours.blue.darken1,
  },
};

export const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: colours.grey.darken4,
    surface: colours.shades.black,
    primary: colours.indigo.darken1,
    secondary: colours.brown.darken1,
    error: colours.red.lighten1,
    warning: colours.deepOrange.lighten1,
    success: colours.green.lighten1,
    info: colours.blue.lighten1,
  },
};
