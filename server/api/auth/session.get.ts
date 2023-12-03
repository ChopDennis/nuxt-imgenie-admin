export default eventHandler((event) => {
  const cookie = getHeader(event, "cookie");
  const accessToken = getHeader(event, "authorization");
  const refreshToken = cookie?.split("=")[1];
  if (!cookie || !accessToken) {
    return { code: "P0001", message: "登入失敗" };
  }
  return {
    code: "A0001",
    message: "登入成功",
    accessToken,
    refreshToken,
  };
});
