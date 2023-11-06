import { useDbConnectionApi } from "~/composables/useApi";
import type { DbCategoriesRes, DbConnectionRes } from "~/types/DbConnectionRes";

export const useDbConnectionStore = defineStore("dbConnection", {
  state: () => {
    return {
      dbConnectionList: [] as DbConnectionRes[],
      dbCategories: [] as DbCategoriesRes[],
      testConnectionStatus: false,
    };
  },

  actions: {
    async getDbConnectionList() {
      const data = await useDbConnectionApi("list");
      this.dbConnectionList = data.data as DbConnectionRes[];
    },

    async getDbCategories() {
      const data = await useDbConnectionApi("dbs");
      this.dbCategories = data.data as DbCategoriesRes[];
    },

    async testConnection() {
      const data = await useDbConnectionApi("test-connection", {
        dbType: "postgresql",
        connInfo:
          '{"host":"10.0.1.13","port":"5432","username":"imgenie_datamart","password":"imgenie_datamart","database":"iMGenie_mart","ssl":{"CAFile":"1234"}}',
      });
      this.testConnectionStatus = data.data as any;
    },
  },
});
