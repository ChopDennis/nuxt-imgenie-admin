// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: ["@/assets/css/main.css", "@/assets/css/element-plus.css"],
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
