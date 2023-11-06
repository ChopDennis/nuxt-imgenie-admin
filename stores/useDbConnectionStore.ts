import { useDbConnectionApi } from "~/composables/useApi";
import type { DbConnectionRes } from "~/types/DbConnectionRes";

export const useDbConnectionStore = defineStore("dbConnection", {
  state: () => {
    return {
      dbConnectionList: [] as DbConnectionRes[],
    };
  },

  actions: {
    async getDbConnectionList() {
      const data = await useDbConnectionApi("list");
      this.dbConnectionList = data.data as DbConnectionRes[];
    },
  },
});
