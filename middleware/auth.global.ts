import useKeycloakApi from "~/composables/api/useKeycloakApi";

export default defineNuxtRouteMiddleware(async (to) => {
  const isLogin = await useKeycloakApi().checkAuth();
  if (to.path === "/" && isLogin) return navigateTo("db-connection");
  if (to.path !== "/" && !isLogin) {
    const isRefresh = await useKeycloakApi().refresh();
    if (!isRefresh) return navigateTo("/");
  }
});
