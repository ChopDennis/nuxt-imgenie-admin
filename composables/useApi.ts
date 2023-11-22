// TODO: type Methods = "GET" | "POST" | "DELETE" | "PUT"
import { encryptData, decryptData } from "./crypto";

export const useLoading = () => {
  return useState<boolean>("isLoading", () => false);
};

export const useApi = async (
  url: string,
  params?: any,
  cached: boolean = false,
  loading: boolean = false,
  encryptDataField: string | null = null,
): Promise<ApiResponse> => {
  const nuxtApp = useNuxtApp();
  let result: ApiResponse = {};
  const isLoading = useLoading();

  // Encrypt the specified data field if provided
  if (encryptDataField && params && params[encryptDataField]) {
    params[encryptDataField] = encryptData(params[encryptDataField]);
  }

  const { data, error } = await useFetch(url, {
    method: "post",
    body: {
      ...params,
    },
    getCachedData: (key) => (cached ? nuxtApp.payload.data[key] : null),
    onRequest({ request }) {
      console.log("request", request);
      isLoading.value = loading;
    },
    onResponse() {
      isLoading.value = false;
    },
    onResponseError() {
      // console.error(
      //   `useFetch 錯誤訊息: ${response._data.data.code}-${response._data.data.message}`,
      // );
    },
  });
  if (error.value) {
    console.error("useFetch 錯誤訊息: ", error.value.data.data); // eslint-disable-line no-console
    result = error.value.data.data as ApiResponse;
  } else {
    console.log(`useFetch ${url} - ${formatCurrentTime()}`); // eslint-disable-line no-console
    // Decrypt the response if needed
    if (data && encryptDataField && data[encryptDataField]) {
      data[encryptDataField] = decryptData(data[encryptDataField], key);
    }
    result = data.value as ApiResponse;
    // console.log(JSON.stringify(result.data)); // eslint-disable-line no-console
  }
  return result;
};
