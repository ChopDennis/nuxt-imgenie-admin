export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  const body = await readBody(event);
  const Authorization = getRequestHeader(event, "Authorization");
  const headers = new Headers();
  if (Authorization) headers.append("Authorization", Authorization);
  headers.append("TXNSEQ", "1645a8fa-efe1-4fa6-8d36-768f7266bf23");
  const response: any = await $fetch(`${baseUrl}/keycloak/test`, {
    method: "post",
    headers,
    body,
  });

  return response;
});
