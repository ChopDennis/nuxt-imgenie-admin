export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  const url = event.context.params?.slug;
  const headers = new Headers();
  let body: any;

  if (url === "datamart/save") {
    body = await readFormData(event);
  } else {
    body = await readBody(event);
  }

  headers.append("TXNSEQ", getHeader(event, "TXNSEQ") as string);
  headers.append("IS_ENCRYPT", getHeader(event, "IS_ENCRYPT") as string);
  headers.append("Authorization", getCookie(event, "AccessToken") as string);

  const response = await $fetch(`${baseUrl}/datamart/${url}`, {
    method: "post",
    headers,
    body,
    onRequest({ request }) {
      console.log(
        "New Request ==============================================================",
      );
      console.log("getRequestURL - ", request);
      console.log("getRequestHeaders - ", headers);
      console.log("getRequestBody - ", body);
    },
    onResponse({ response }) {
      if (response.headers.has("content-disposition")) {
        if (response.headers.get("content-disposition")) {
          appendResponseHeader(
            event,
            "content-disposition",
            response.headers.get("content-disposition") as string,
          );
        }
      }
    },
  }).catch((error) => {
    if (url !== "dbconnection/test-connection") {
      setResponseStatus(event, 400, `${url} fetch error`);
    }
    return error.data;
  });

  return response;
});
