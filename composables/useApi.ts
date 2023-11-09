// TODO: type Methods = "GET" | "POST" | "DELETE" | "PUT"

enum Api {
  dbConnection = "/api/dbConnection",
}

export const useDbConnectionApi = async (
  url: string,
  params?: any,
): Promise<ApiResponse> => {
  // const nuxtApp = useNuxtApp();
  let result: ApiResponse = {};

  const { data, error } = await useFetch(`${Api.dbConnection}/${url}`, {
    method: "post",
    body: {
      ...params,
    },
    lazy: true,
    deep: false,
    // getCachedData: (key) => nuxtApp.payload.data[key],
  });
  if (error.value) {
    console.error("useFetch 錯誤訊息: ", error.value.data); // eslint-disable-line no-console
    result = error.value.data.data as ApiResponse;
  } else {
    console.log(`useFetch ${Api.dbConnection}/${url} - ${formatCurrentTime()}`); // eslint-disable-line no-console
    result = data.value as ApiResponse;
    // console.log(JSON.stringify(result.data)); // eslint-disable-line no-console
  }
  return result;
};
