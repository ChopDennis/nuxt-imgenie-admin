export const useDbConnectionStore = defineStore("dbConnection", {
  state: () => {
    return {
      dbConnectionList: [] as MappingDbConnectionList[],
      dbCategories: [] as DbCategoriesRes[],
      testConnectionStatus: false,
    };
  },

  actions: {
    async getDbConnectionList() {
      const data = await useDbConnectionApi("list");
      const mappingData = _useMap(
        data.data as DbConnectionRes[],
        (list, index) => {
          const { connInfo, dbType, connName, ...rest } = list;
          return {
            ...rest,
            connTypeName: `${_useUpperFirst(dbType)}-${connName}`,
            connInfoHostPort: `${connInfo.host}:${connInfo.port}`,
            connInfoDatabase: connInfo.database,
            rowNumber: index + 1,
          };
        },
      );

      this.dbConnectionList = mappingData as MappingDbConnectionList[];
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
