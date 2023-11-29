export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  const url = event.context.params?.slug;
  const body = await readBody(event);
  const txnseq = getHeader(event, "txnseq");
  const isEncrypt = getHeader(event, "is_encrypt");
  const response = await $fetch(`${baseUrl}/datamart/${url}`, {
    method: "post",
    headers: {
      TXNSEQ: txnseq as string,
      IS_ENCRYPT: isEncrypt as string,
    },
    body: JSON.stringify({
      ...body,
    }),
  });

  return response;
});
