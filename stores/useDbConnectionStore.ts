export const useDbConnectionStore = defineStore("dbConnection", {
  state: () => {
    return {
      dbConnList: [] as DbConnListMap[],
      dbCategories: [] as DbCategoriesRes[],
      dbConnQueryRes: {} as DbConnQueryRes,
      dbConnSetForm: {} as DbConnSetForm,
      dbConnSetId: "",
      dbConnSetType: "",
      dbConnSaveRes: {} as DbConnSaveRes,
      dbConnTestRes: null as boolean | null,
    };
  },

  actions: {
    async getDbConnList(cached: boolean) {
      const data = await useDbConnectionApi("list", null, cached, true);
      const mappingData = _useMap(
        data.data as DbConnListRes[],
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

      this.dbConnList = mappingData as DbConnListMap[];
    },

    async getDbCategories() {
      const data = await useDbConnectionApi("dbs", null, true);
      this.dbCategories = data.data as DbCategoriesRes[];
    },

    async getDbConnQuery(id: string) {
      const data = await useDbConnectionApi("query", {
        connId: id,
      });

      this.dbConnQueryRes = data.data as DbConnQueryRes;

      const { connName, connInfo, dbType, connId } =
        data.data as DbConnQueryRes;
      this.dbConnSetForm = {
        connName,
        ...connInfo,
      };
      this.dbConnSetId = connId;
      this.dbConnSetType = dbType;
    },

    async setDbConnSave(form: DbConnSetForm, isNewConn: boolean = false) {
      if (isNewConn) this.dbConnSetId = "";
      const { connName, ...connInfo } = form;
      const params = {
        connId: this.dbConnSetId,
        connName,
        dbType: this.dbConnSetType,
        connInfo: JSON.stringify(connInfo),
        isActivate: true, // TODO: 不應該寫死
      };
      await useDbConnectionApi("save", params); // // TODO: 要寫入回傳
    },

    async testConnection(dbType: string, connInfo: ConnInfo) {
      const data = await useDbConnectionApi("test-connection", {
        dbType,
        connInfo: JSON.stringify(connInfo),
      });
      this.dbConnTestRes = data.data as boolean;
    },
  },
});
