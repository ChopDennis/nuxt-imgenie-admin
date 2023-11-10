export const useDbConnectionStore = defineStore("dbConnection", {
  state: () => {
    return {
      dbConnectionList: [] as MappingDbConnectionList[],
      dbCategories: [] as DbCategoriesRes[],
      dbConnSetting: {} as DbQueryRes,
      dbConnSetForm: {} as DbConnSetForm,
      testConnectionStatus: false,
    };
  },

  actions: {
    async getDbConnectionList(cached: boolean) {
      const data = await useDbConnectionApi("list", null, cached, true);
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
      const data = await useDbConnectionApi("dbs", null, true);
      this.dbCategories = data.data as DbCategoriesRes[];
    },

    async getDbConnSetting(connId: string) {
      const data = await useDbConnectionApi("query", {
        connId,
      });

      this.dbConnSetting = data.data as DbQueryRes;

      const { connName, connInfo, dbType } = data.data as DbQueryRes;
      const { ssl } = connInfo;
      this.dbConnSetForm = {
        連線名稱: connName,
        主機名稱或IP: connInfo.host,
        通訊埠: connInfo.port,
        使用者名稱: connInfo.username,
        密碼: connInfo.password,
        資料庫名稱: connInfo.database,
        dbType,
        啟用SSL: ssl.isSSL ?? false,
        啟用用戶端驗證: ssl.isClientCertificate ?? false,
        // "Server Certificate": ssl.ca ?? null,
        // "Client Certificate": ssl.clientCertificate ?? null,
        // "Client Key": ssl.clientKey ?? null,
      };
    },

    async testConnection(dbType: string, connInfo: {}) {
      const data = await useDbConnectionApi("test-connection", {
        dbType,
        connInfo: JSON.stringify(connInfo),
      });
      this.testConnectionStatus = data.data as any;
    },
  },
});
