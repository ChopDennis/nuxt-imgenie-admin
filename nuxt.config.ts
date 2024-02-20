// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition:
      process.env.NODE_ENV === "production"
        ? {
            name: "page",
            mode: "out-in",
          }
        : false,
  },
  css: ["@/assets/css/main.css"],
  devtools: {
    enabled: false,
  },
  imports: {
    dirs: ["./stores/**", "./types/**", "composables/**"],
  },
  lodash: {
    prefix: "_use",
  },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-lodash",
    "@element-plus/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "Noto Sans TC": true,
        },
      },
    ],
  ],
  elementPlus: {
    importStyle: "scss",
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
        },
      },
    },
  },
});
