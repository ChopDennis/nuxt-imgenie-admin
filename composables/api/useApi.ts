import { v4 as uuidv4 } from "uuid";
import type { AsyncData } from "nuxt/dist/app/composables";

interface ApiResponse<T = any> {
  code: string;
  message: string;
  data: T;
}

interface ApiOptions {
  params?: any | null;
  cached?: boolean;
  loading?: boolean;
  encrypt?: boolean;
  decrypt?: boolean;
  immediate?: boolean;
}

export type { ApiResponse, ApiOptions };

export enum ApiResponseCode {
  Success = "GL_A0001",
}

export const useLoading = () => {
  return useState<boolean>("isLoading", () => false);
};

export const useApi = async <T>(
  url: string,
  options?: ApiOptions,
): Promise<AsyncData<ApiResponse<T>, Error | null>> => {
  const nuxtApp = useNuxtApp();
  const headers = new Headers();
  const uuid = uuidv4();
  const isLoading = useLoading();

  const isLogin = await useKeycloakApi().checkAuth();
  if (!_useIncludes(url, "admin") && !isLogin) {
    await useKeycloakApi().refresh();
  }

  let body: any = {};
  let isEncrypt: boolean = false;

  if (options && options.params) {
    body = options.params;
  }

  if (options && options.encrypt) {
    body = {
      data: encryptData(body, uuid),
    };
    isEncrypt = true;
  }

  return useFetch(url, {
    method: "post",
    headers,
    body,
    onRequest() {
      headers.append("TXNSEQ", uuid);
      headers.append("IS_ENCRYPT", _useToString(isEncrypt));
      headers.append(
        "ID_TOKEN",
        uuid.replace(/-/g, "").split("").reverse().join("").toString(),
      );
      isLoading.value = options?.loading ?? false;
    },
    onResponse({ response }) {
      isLoading.value = false;
      if (url === "/api/datamart/datamart/export-file") {
        if (response.headers.has("content-disposition")) {
          if (response.headers.get("content-disposition")) {
            localStorage.setItem(
              "fileName",
              response.headers.get("Content-Disposition") as string,
            );
          }
        }
      }
      if (response._data.code === ApiResponseCode.Success) {
        if (
          url === "/api/datamart/datamart/save" ||
          url === "/api/datamart/dbconnection/save"
        ) {
          ElNotification({
            title: "系統訊息",
            message: "儲存成功",
            type: "success",
            duration: 3000,
          });
        }
        if (url === "/api/admin/manager-login") {
          ElNotification({
            title: "系統訊息",
            message: "登入成功",
            type: "success",
            duration: 3000,
          });
        }
        console.log(`useFetch ${url} success`); // eslint-disable-line no-console
      }
    },
    onResponseError({ response }) {
      ElNotification({
        title: `系統錯誤－${response._data.code}`,
        message: _useToString(response._data.message),
        type: "error",
        duration: 3000,
      });
      console.log(response._data); // eslint-disable-line no-console
      if (response._data.code === "KY_V0001") {
        navigateTo("/");
      }
    },
    getCachedData: (key) =>
      options?.cached ? nuxtApp.payload.data[key] : null,
    transform: (response: ApiResponse) => {
      if (options?.decrypt) response.data = decryptData(response.data, uuid);
      return response;
    },
    immediate: options?.immediate,
  });
};
