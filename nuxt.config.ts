// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: [
    "primevue/resources/themes/lara-light-teal/theme.css",
    "@/assets/css/main.css",
    "primeicons/primeicons.css",
  ],
  devtools: {
    enabled: false,
  },
  imports: {
    dirs: ["./stores/**", "./types/**"],
  },
  lodash: {
    prefix: "_",
  },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-lodash",
    "nuxt-primevue",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  primevue: {
    usePrimeVue: true,
    options: {
      unstyled: false,
      ripple: true,
    },
    components: {
      prefix: "Prime",
      include: ["InputText", "Button", "DataTable", "Column", "Dialog"],
    },
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
  },
  runtimeConfig: {
    public: {
      apiBase: "https://imgenie-app-gl-pcpt4o333q-de.a.run.app/v1",
      auth: "3ba0811a-8eb3-e61f-fa5e-8aef80ab2cfc",
    },
  },
});
