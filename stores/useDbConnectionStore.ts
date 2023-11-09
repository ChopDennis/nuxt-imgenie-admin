export const useDbConnectionStore = defineStore("dbConnection", {
  state: () => {
    return {
      dbConnectionList: [] as MappingDbConnectionList[],
      dbCategories: [] as DbCategoriesRes[],
      dbConnSetting: [] as DbQueryRes,
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

    async getDbConnSetting(connId: string) {
      const data = await useDbConnectionApi("query", {
        connId,
      });
      console.log("useDbConnectionApi", data.data);

      const { connName, connInfo, dbType } = data.data as DbQueryRes;
      // const { ssl } = connInfo.ssl;
      this.dbConnSetting = {
        連線名稱: connName as string,
        主機名稱或IP: connInfo.host as string,
        通訊埠: connInfo.port as string,
        使用者名稱: connInfo.username as string,
        密碼: connInfo.password as string,
        資料庫名稱: connInfo.database as string,
        dbType,
        // 啟用SSL: ssl.isSSL ?? false,
        // 啟用用戶端驗證: ssl.isClientCertificate ?? false,
        // "Server Certificate": ssl.ca ?? null,
        // "Client Certificate": ssl.clientCertificate ?? null,
        // "Client Key": ssl.clientKey ?? null,
      };
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
