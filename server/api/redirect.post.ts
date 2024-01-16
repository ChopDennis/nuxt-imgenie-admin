export default defineEventHandler((event) => {
  setResponseStatus(event, 400);
  return {
    code: "KY_V0001",
    message: "登入驗證失敗，請重新登入",
    data: null,
  };
});
