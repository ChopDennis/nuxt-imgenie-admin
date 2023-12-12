export default defineNuxtPlugin({
  name: "my-plugin",
  enforce: "pre",
  hooks: {
    "app:beforeMount": async () => {
      const { refreshToken, status, refresh } = useAuth();
      if (refreshToken.value && status.value === "unauthenticated")
        await refresh();
    },
  },
  env: {
    islands: true,
  },
});
