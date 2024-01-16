// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify, type ThemeDefinition } from "vuetify";

const theme = {
  dark: false,
  colors: {
    "rating-red": "#dc2626",
    "rating-orange": "#ea580c",
    "rating-yellow": "#ca8a04",
    "rating-green": "#16a34a",
    "rating-blue": "#2563eb",
    "blueish-50": "#f1f8fe",
    "blueish-100": "#e3effb",
    "blueish-200": "#c0e1f7",
    "blueish-300": "#88c8f1",
    "blueish-400": "#49ace7",
    "blueish-500": "#2293d5",
    "blueish-600": "#1474b5",
    "blueish-700": "#115d93",
    "blueish-800": "#124e78",
    "blueish-900": "#154365",
    "blueish-950": "#0e2b43",
    "accent-50": "#fffeeb",
    "accent-100": "#fffcc6",
    "accent-200": "#fff888",
    "accent-300": "#ffee49",
    "accent-400": "#ffe020",
    "accent-500": "#f2bb05",
    "accent-600": "#dd9602",
    "accent-700": "#b86c05",
    "accent-800": "#95520b",
    "accent-900": "#7a430d",
    "accent-950": "#462402",
    "tertiary-50": "#fff8ed",
    "tertiary-100": "#ffefd4",
    "tertiary-200": "#ffdba8",
    "tertiary-300": "#ffc071",
    "tertiary-400": "#ff9b38",
    "tertiary-500": "#fe7c11",
    "tertiary-600": "#ef6107",
    "tertiary-700": "#d74e09",
    "tertiary-800": "#9d390f",
    "tertiary-900": "#7e3110",
    "tertiary-950": "#441606",
    "surface-50": "#f1f5f8",
    background: "#f1f5f8",
    "on-background": "#314049",
    surface: "#fff",
    "on-surface": "#314049",
    "surface-100": "#ebf1f5",
    "surface-200": "#d1dde6",
    "surface-300": "#a8c1d1",
    "surface-400": "#7a9fb8",
    "surface-500": "#59819b",
    "surface-600": "#436a84",
    "surface-700": "#38576b",
    "surface-800": "#324957",
    "surface-900": "#314049",
    "surface-950": "#202b31",
  },
} satisfies ThemeDefinition;

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: "theme",
      themes: {
        theme,
      },
    },
    defaults: {
      global: {
        density: "comfortable",
        hideDetails: true,
        flat: true
      },
      VSelect: {
        variant: "outlined",
        bgColor: "surface",
      },
      VCard: {
        border: true
      }
    },
  });
  app.vueApp.use(vuetify);
});
