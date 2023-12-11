export default eventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  const body = await readBody<{ refreshToken: string }>(event);

  if (!body.refreshToken) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized, no refreshToken in payload",
    });
  }

  const headers = new Headers();
  headers.append("TXNSEQ", "1645a8fa-efe1-4fa6-8d36-768f7266bf23");
  // headers.append("REFRESH_TOKEN", body.refreshToken);

  const response: any = await $fetch(`${baseUrl}/keycloak/refreshToken`, {
    method: "post",
    headers,
    body,
  });

  return response.data;
});
