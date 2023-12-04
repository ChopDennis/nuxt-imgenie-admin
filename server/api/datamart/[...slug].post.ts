export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  const url = event.context.params?.slug;

  let body: any;
  if (url === "datamart/save") {
    body = await readFormData(event);
  } else {
    body = await readBody(event);
  }

  const headers = new Headers();
  headers.append("TXNSEQ", getHeader(event, "TXNSEQ") as string);
  headers.append("IS_ENCRYPT", getHeader(event, "IS_ENCRYPT") as string);
  headers.append("REFRESH_TOKEN", getHeader(event, "REFRESH_TOKEN") as string);
  headers.append("Authorization", getHeader(event, "Authorization") as string);

  const response = await $fetch(`${baseUrl}/datamart/${url}`, {
    method: "post",
    headers,
    body,
  });

  return response;
});
