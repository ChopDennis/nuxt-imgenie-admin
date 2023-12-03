export default eventHandler(async (event) => {
  const body = await readBody<{ refreshToken: string }>(event);

  if (!body.refreshToken) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized, no refreshToken in payload",
    });
  }
});
