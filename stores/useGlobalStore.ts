import { filename } from "pathe/utils";

export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      isSideMenuCollapse: false,
      dbConnIcons: {} as { [key: string]: any },
    };
  },

  actions: {
    dynamicImportDbConnectionIcons() {
      // 所有 import.meta.glob 的參數都必须以字面量傳入。"不"可以在其中使用變量或函式。
      const glob = import.meta.glob("@/assets/icons/dbConnection/*.svg", {
        eager: true,
      });
      const imageUrls = Object.fromEntries(
        Object.entries(glob).map(([key, value]: [string, any]) => [
          filename(key),
          value.default,
        ]),
      );
      this.dbConnIcons = imageUrls;
    },
  },
});
