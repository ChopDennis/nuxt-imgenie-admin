// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  build: {
    transpile: ["primevue"],
  },
  css: [
    "~/assets/style/tailwind.css",
    "primevue/resources/themes/lara-light-blue/theme.css",
    "~/assets/style/main.css",
  ],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  elementPlus: {
    /** Options */
  },
  imports: {
    dirs: ["./stores/**", "./types/**"],
  },
  lodash: {
    prefix: "_",
  },

  modules: [
    "@pinia/nuxt",
    "@element-plus/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-lodash",
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
  runtimeConfig: {
    public: {
      apiBase: "https://imgenie-app-gl-pcpt4o333q-de.a.run.app/v1",
      auth: "3ba0811a-8eb3-e61f-fa5e-8aef80ab2cfc",
    },
  },
});
