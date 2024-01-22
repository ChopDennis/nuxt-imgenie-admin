export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  const url = event.context.params?.slug;
  const body = await readBody(event);
  const headers = new Headers();
  headers.append("TXNSEQ", getHeader(event, "TXNSEQ") as string);
  if (url !== "manager-login" && url !== "refreshToken") {
    headers.append("Authorization", getCookie(event, "AccessToken") as string);
  }
  const response: any = await $fetch(`${baseUrl}/admin/${url}`, {
    method: "post",
    headers,
    body,
    onResponse({ response }) {
      if (response._data.code !== "GL_A0001") {
        setResponseStatus(event, 400, "");
      }
    },
    onRequest({ request }) {
      console.log(
        "New Request ==============================================================",
      );
      console.log("getRequestURL - ", request);
      console.log("getRequestHeaders - ", headers);
      console.log("getRequestBody - ", body);
    },
  }).catch((error) => {
    return error.data;
  });

  return response;
});
