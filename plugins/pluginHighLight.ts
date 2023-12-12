import hljs from "highlight.js";

export default defineNuxtPlugin((NuxtApp) => {
  NuxtApp.vueApp.directive("highlight", function (element) {
    const blocks = element.querySelectorAll("pre code");
    blocks.forEach((block: any) => {
      hljs.highlightElement(block);
    });
  });
});
