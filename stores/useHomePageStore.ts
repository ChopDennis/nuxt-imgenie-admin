export const useHomepageStore = defineStore("homepage", {
  state: () => ({
    products: [
      {
        productTitle: "ChatSQL",
        icon: "product-sql",
        productText: "",
        productLink: "/chat/sql/default",
      },
      {
        productTitle: "ChatChart",
        icon: "product-chart",
        productText: "",
        productLink: "/chat/sql/default",
      },
      {
        productTitle: "ChatOther",
        icon: "product-other",
        productText: "",
        productLink: "/chat/sql/default",
      },
    ],
    isLogin: false,
    userName: "User Name",
  }),

  actions: {
    submitLogin() {
      this.isLogin = true;
    },
  },
});
