export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  const url = event.context.params?.slug;
  const body = await readBody(event);
  const headers = new Headers();

  headers.append("TXNSEQ", getHeader(event, "TXNSEQ") as string);
  const response: any = await $fetch(`${baseUrl}/admin/${url}`, {
    method: "post",
    headers,
    body,
    onResponse({ response }) {
      if (response._data.code !== "GL_A0001") {
        setResponseStatus(event, 400, "");
      }
    },
  }).catch((error) => {
    return error.data;
  });

  return response;
});
