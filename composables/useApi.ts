// TODO: type Methods = "GET" | "POST" | "DELETE" | "PUT"

enum Api {
  datamart = "/api/datamart",
  chatsql = "/api/chatsql",
  note = "/api/note",
}

export const useDataMartApi = async (
  url: string,
  params?: any,
): Promise<ApiResponse> => {
  let result: ApiResponse = {};

  const { data, error } = await useFetch(`${Api.datamart}/${url}`, {
    method: "post",
    body: {
      ...params,
    },
  });
  if (error.value) {
    console.error("useFetch 錯誤訊息: ", error.value.data); // eslint-disable-line no-console
    result = error.value.data.data as ApiResponse;
  } else {
    console.log("useFetch 正確訊息: ", data.value); // eslint-disable-line no-console
    result = data.value as ApiResponse;
  }
  return result;
};

export const useChatSqlApi = async (
  url: string,
  params?: any,
): Promise<ApiResponse> => {
  let result: ApiResponse = {};
  const { data, error } = await useFetch(`${Api.chatsql}/${url}`, {
    method: "post",
    body: params,
  });
  if (error.value) {
    console.error("useFetch 錯誤訊息: ", error.value.data); // eslint-disable-line no-console
    result = error.value.data.data as ApiResponse;
  } else {
    console.log("useFetch 正確訊息: ", data.value); // eslint-disable-line no-console
    result = data.value as ApiResponse;
  }
  return result;
};

export const useNoteApi = async (
  url: string,
  params?: any,
): Promise<ApiResponse> => {
  let result: ApiResponse = {};
  const { data, error } = await useFetch(`${Api.note}/${url}`, {
    method: "post",
    body: params,
  });
  if (error.value) {
    console.error("useFetch 錯誤訊息: ", error.value.data); // eslint-disable-line no-console
    result = error.value.data.data as ApiResponse;
  } else {
    console.log("useFetch 正確訊息: ", data.value); // eslint-disable-line no-console
    result = data.value as ApiResponse;
  }
  return result;
};
