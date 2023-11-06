export default defineNuxtRouteMiddleware((_to, _from) => {
  // if (to.params.id === "1") {
  //   return abortNavigation();
  // }
  // // In a real app you would probably not redirect every route to `/`
  // // however it is important to check `to.path` before redirecting or you
  // // might get an infinite redirect loop
  // if (to.path !== "/") {
  //   return navigateTo("/");
  // }

  // defineNuxtRouteMiddleware() 輔助函示：定義 route middleware
  // navigateTo() 輔助函示：導航到其他頁面
  // abortNavigation() 輔助函示：中斷導航，顯示錯誤資訊以及跳到錯誤頁面

  const isLoggedIn = false; // 判斷是否登入

  if (!isLoggedIn) {
    return navigateTo("/login");
  }
});
