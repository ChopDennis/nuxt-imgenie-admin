export default defineEventHandler((event) => {
  console.log("New request: ", getRequestURL(event));
  console.log("request headers: ", getHeaders(event));
  console.log("txnseq: ", getHeader(event, "txnseq"));
});
