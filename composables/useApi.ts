import { v4 as uuidv4 } from "uuid";
import { jwtDecode } from "jwt-decode";
import type { AsyncData } from "nuxt/dist/app/composables";

export const useLoading = () => {
  return useState<boolean>("isLoading", () => false);
};

export const useApi = (
  url: string,
  options?: ApiOptions,
): AsyncData<ApiResponse | Blob, Error | null> => {
  const nuxtApp = useNuxtApp();
  const headers = new Headers();
  const uuid = uuidv4();
  const isLoading = useLoading();
  const { token, refresh, status } = useAuth();

  let isTokenValid = false;
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

  if (status.value === "authenticated" && token.value) {
    const jwtExp = jwtDecode(token.value).exp;
    if (jwtExp) {
      const expDate = new Date(jwtExp * 1000);
      const currentDate = new Date();
      expDate.setMinutes(expDate.getMinutes() - 1);
      isTokenValid = currentDate < expDate;
    }
  } else {
    // refresh();
    throw new Error("登入驗證失敗");
  }

  return useFetch(url, {
    method: "post",
    headers,
    body,
    async onRequest() {
      if (!isTokenValid) await refresh();
      if (token.value) headers.append("Authorization", token.value);
      headers.append("TXNSEQ", uuid);
      headers.append("IS_ENCRYPT", _useToString(isEncrypt));
      headers.append("ID_TOKEN", uuid.replace(/-/g, ""));
      isLoading.value = options?.loading ?? false;
    },
    onResponse({ response }) {
      isLoading.value = false;
      if (url === "/api/datamart/datamart/export-file") {
        console.log(url);
        console.log(response.headers.has("Content-Disposition"));
        console.log(response.headers.get("Content-Disposition"));
        if (response.headers.has("content-disposition")) {
          if (response.headers.get("content-disposition")) {
            localStorage.setItem(
              "fileName",
              response.headers.get("Content-Disposition") as string,
            );
          }
        }
      }

      console.log(`useFetch ${url} success`); // eslint-disable-line no-console
    },
    onResponseError({ response }) {
      console.error("useFetch error: ", response._data.data); // eslint-disable-line no-console
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
