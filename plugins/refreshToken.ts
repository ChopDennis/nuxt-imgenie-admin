import { jwtDecode } from "jwt-decode";
export default defineNuxtPlugin({
  name: "my-plugin",
  enforce: "pre",
  hooks: {
    "app:beforeMount": async () => {
      let isTokenValid;
      const { refreshToken, status, refresh, signOut } = useAuth();
      if (refreshToken.value && status.value === "unauthenticated") {
        const jwtExp = jwtDecode(refreshToken.value).exp;
        if (jwtExp) {
          const expDate = new Date(jwtExp * 1000);
          const currentDate = new Date();
          expDate.setHours(expDate.getHours() - 1);
          isTokenValid = currentDate < expDate;
        }
      }

      if (isTokenValid) {
        await refresh();
      } else {
        await signOut({ callbackUrl: "/" });
      }
    },
  },
  env: {
    islands: true,
  },
});
