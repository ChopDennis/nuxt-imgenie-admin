export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  const body = await readBody(event);

  const response: any = await $fetch(`${baseUrl}/keycloak/manager-login`, {
    method: "post",
    headers: {
      TXNSEQ: "1645a8fa-efe1-4fa6-8d36-768f7266bf23",
    },
    body,
  });

  return response.data;
});
