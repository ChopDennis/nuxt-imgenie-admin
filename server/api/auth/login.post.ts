export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  const body = await readBody(event);
  const { account, password } = body;

  // const txnseq = getHeader(event, "txnseq");
  // const isEncrypt = getHeader(event, "is_encrypt");
  const response: any = await $fetch(`${baseUrl}/keycloak/login`, {
    method: "post",
    headers: {
      TXNSEQ: "1645a8fa-efe1-4fa6-8d36-768f7266bf23",
      // IS_ENCRYPT: isEncrypt as string,
    },
    body: JSON.stringify({
      account,
      password,
    }),
  });

  return response.data;
});
