export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  const userId = config.public.auth;
  const url = event.context.params?.slug;
  const body = await readBody(event);

  const response = await $fetch(`${baseUrl}/datamart/${url}`, {
    method: "post",
    headers: {
      TXNSEQ: "",
    },
    body: JSON.stringify({
      userId,
      ...body,
    }),
  });

  return response;
});
