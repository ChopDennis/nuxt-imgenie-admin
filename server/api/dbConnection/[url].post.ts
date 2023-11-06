import { uuid } from "vue-uuid";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  const userId = config.public.auth;
  const url = getRouterParam(event, "url");
  const body = await readBody(event);

  const response = await $fetch(`${baseUrl}/datamart/dbconnection/${url}`, {
    method: "post",
    headers: {
      TXNSEQ: uuid.v1(),
    },
    body: JSON.stringify({
      userId,
      ...body,
    }),
  });

  return response;
});
