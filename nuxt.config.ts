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
  auth: {
    provider: {
      type: "refresh",
      pages: {
        login: "/",
      },
      token: {
        signInResponseTokenPointer: "/accessToken",
        maxAgeInSeconds: 60 * 14,
      },
      refreshToken: {
        signInResponseRefreshTokenPointer: "/refreshToken",
        maxAgeInSeconds: 60 * 60 * 24,
      },
    },
    // baseURL: "https://imgenie-app-admin-pcpt4o333q-de.a.run.app",
    baseURL: "http://localhost:3000",
    // globalAppMiddleware: {
    //   isEnabled: true,
    // },
    session: {
      enableRefreshPeriodically: false,
      enableRefreshOnWindowFocus: false,
    },
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
    "@sidebase/nuxt-auth",
    "nuxt-security",
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
  routeRules: {
    "/api/datamart/datamart/save": {
      security: {
        xssValidator: false,
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "https://imgenie-app-gl-pcpt4o333q-de.a.run.app/v1",
    },
  },
});
