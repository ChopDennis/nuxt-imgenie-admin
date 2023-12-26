export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  const url = event.context.params?.slug;
  const headers = new Headers();
  let body: any;

  if (url === "datamart/save") {
    body = await readFormData(event);
    headers.append("id_token", getHeader(event, "id_token") as string);
  } else {
    body = await readBody(event);
  }

  headers.append("TXNSEQ", getHeader(event, "TXNSEQ") as string);
  headers.append("IS_ENCRYPT", getHeader(event, "IS_ENCRYPT") as string);
  headers.append("REFRESH_TOKEN", getHeader(event, "REFRESH_TOKEN") as string);
  headers.append("Authorization", getHeader(event, "Authorization") as string);

  const response = await $fetch(`${baseUrl}/datamart/${url}`, {
    method: "post",
    headers,
    body,
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
  });

  return response;
});
