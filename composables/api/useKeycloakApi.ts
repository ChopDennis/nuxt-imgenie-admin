import { jwtDecode } from "jwt-decode";

enum Api {
  Login = "/api/admin/manager-login",
  Refresh = "/api/admin/refreshToken",
}

export interface Credentials {
  account: string;
  password: string;
}

export default function useKeycloakApi() {
  const accessToken = useCookie("AccessToken");
  const refreshToken = useCookie("RefreshToken");

  const checkAuth = () => {
    if (accessToken.value) {
      const decodedToken = jwtDecode(accessToken.value);
      if (decodedToken.exp) {
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const isTokenExpire = expirationTime - currentTime <= 60 * 1000;
        // console.log(
        //   `AccessToken will expire in: ${Math.ceil(
        //     (expirationTime - currentTime) / 60 / 1000,
        //   )} mins`,
        // );
        if (isTokenExpire) {
          accessToken.value = null;
        }
      }
    }
    return new Promise<boolean>((resolve) => {
      resolve(!isEmpty(accessToken.value));
    });
  };

  const login = async (credentials: Credentials) => {
    const { data, status } = await useApi<{
      accessToken: string;
      refreshToken: string;
    }>(Api.Login, {
      params: credentials,
    });
    if (status.value === "success") {
      accessToken.value = data.value.data.accessToken;
      refreshToken.value = data.value.data.refreshToken;
      navigateTo("/db-connection");
    }
  };

  const refresh = async () => {
    if (refreshToken.value) {
      const decodedToken = jwtDecode(refreshToken.value);
      const expirationTime = decodedToken.exp ? decodedToken.exp * 1000 : 0;
      const currentTime = Date.now();
      const isTokenExpire = expirationTime - currentTime <= 60 * 1000;
      // console.log(
      //   `RefreshToken will expire in: ${Math.ceil(
      //     (expirationTime - currentTime) / 3600 / 1000,
      //   )} hours`,
      // );
      if (isTokenExpire) {
        refreshToken.value = null;
        navigateTo("/");
        return false;
      } else {
        const { data, status } = await useApi<{
          accessToken: string;
          refreshToken: string;
        }>(Api.Refresh, {
          params: {
            refreshToken: refreshToken.value,
          },
        });
        accessToken.value = data.value.data.accessToken;
        refreshToken.value = data.value.data.refreshToken;
        return status.value === "success";
      }
    } else {
      navigateTo("/");
      return false;
    }
  };

  const logout = () => {
    const accessToken = useCookie("AccessToken");
    const refreshToken = useCookie("RefreshToken");
    accessToken.value = null;
    refreshToken.value = null;
    navigateTo("/");
  };

  return {
    login,
    refresh,
    logout,
    checkAuth,
  };
}
