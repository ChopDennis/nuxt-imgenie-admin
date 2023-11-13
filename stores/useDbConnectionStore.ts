export const useDbConnectionStore = defineStore("dbConnection", {
  state: () => {
    return {
      dbConnectionList: [] as MappingDbConnectionList[],
      dbCategories: [] as DbCategoriesRes[],
      dbConnSetting: {} as DbQueryRes,
      dbConnSetForm: {} as DbConnSetForm,
      testConnectionStatus: null,
      dbConnSetId: "",
      dbConnSetType: "",
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

    async getDbConnSetting(id: string) {
      const data = await useDbConnectionApi("query", {
        connId: id,
      });

      this.dbConnSetting = data.data as DbQueryRes;

      const { connName, connInfo, dbType, connId } = data.data as DbQueryRes;
      const { ssl, ...rest } = connInfo;
      this.dbConnSetForm = {
        connName,
        ...rest,
        isSSL: ssl.isSSL ?? false,
        isClientCertificate: ssl.isClientCertificate ?? false,
        // "Server Certificate": ssl.ca ?? null,
        // "Client Certificate": ssl.clientCertificate ?? null,
        // "Client Key": ssl.clientKey ?? null,
      };
      this.dbConnSetId = connId;
      this.dbConnSetType = dbType;
    },

    async setDbConnSetting(
      connName: string,
      connInfo: {},
      isActive: boolean = false,
    ) {
      if (isActive) this.dbConnSetId = "";
      const data = await useDbConnectionApi("save", {
        connId: this.dbConnSetId,
        connName,
        dbType: this.dbConnSetType,
        connInfo: JSON.stringify(connInfo),
        isActive,
      });
      this.testConnectionStatus = data.data as any;
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
