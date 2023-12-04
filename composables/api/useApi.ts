import { v4 as uuidv4 } from "uuid";

export const useLoading = () => {
  return useState<boolean>("isLoading", () => false);
};

export const useApi = async (
  url: string,
  options?: ApiOptions,
): Promise<ApiResponse> => {
  const nuxtApp = useNuxtApp();
  let result: ApiResponse = {};
  let body: any = {};
  let isEncrypt: boolean = false;

  const { token, refreshToken } = useAuth();

  const isLoading = useLoading();
  const uuid = uuidv4();

  if (options && options.params) {
    body = options.params;
  }

  if (options && options.encrypt) {
    body = {
      data: encryptData(body, uuid),
    };
    isEncrypt = true;
  }

  const headers = new Headers();
  headers.append("TXNSEQ", uuid);
  headers.append("IS_ENCRYPT", `${isEncrypt}`);
  headers.append("REFRESH_TOKEN", refreshToken.value as string);
  headers.append("Authorization", token.value as string);

  const { data, error } = await useFetch(url, {
    method: "post",
    headers,
    body,
    getCachedData: (key) =>
      options?.cached ? nuxtApp.payload.data[key] : null,
    onRequest() {
      isLoading.value = options?.loading ?? false;
    },
    onResponse() {
      isLoading.value = false;
    },
  });
  if (error.value) {
    console.error("useFetch 錯誤訊息: ", error.value.data.data); // eslint-disable-line no-console
    result = error.value.data.data as ApiResponse;
  } else {
    console.log(`useFetch ${url} - ${formatCurrentTime()}`); // eslint-disable-line no-console
    result = data.value as ApiResponse;
    if (options?.decrypt) {
      result.data = decryptData(result.data, uuid);
    }
  }
  return result;
};
