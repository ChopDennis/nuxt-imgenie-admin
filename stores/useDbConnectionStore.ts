export const useDbConnectionStore = defineStore("dbConnection", {
  state: () => {
    return {
      dbConnListMap: [] as DbConnListMap[],
      dbConnTypesRes: [] as DbConnTypesRes[],
      dbConnQueryRes: {} as DbConnQueryRes,
      dbConnSetForm: {} as DbConnSetForm,
      dbConnSetId: "",
      dbConnSetType: "",
      dbConnSetTitle: "",
      dbConnSaveRes: {} as DbConnSaveRes,
      dbConnSetIsNew: false as boolean,
      dbConnSetActivate: false as boolean,
      dbConnTestRes: null as boolean | null,
      dbConnDialog: {
        categories: false,
        connSetting: false,
      } as {
        categories: boolean;
        connSetting: boolean;
      },
    };
  },

  actions: {
    async getDbConnList(cached: boolean) {
      const data = await useDbConnectionApi("all", null, cached, true);
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

      this.dbConnListMap = mappingData as DbConnListMap[];
    },

    async getDbConnTypes() {
      const data = await useDbConnectionApi("dbs", null, true);
      this.dbConnTypesRes = data.data as DbConnTypesRes[];
    },

    async getDbConnQuery(id: string) {
      const data = await useDbConnectionApi("query", {
        connId: id,
      });

      this.dbConnQueryRes = data.data as DbConnQueryRes;

      const { connName, connInfo, dbType, connId, isActivate } =
        data.data as DbConnQueryRes;
      const { ssl, host, port, username, password, database } = connInfo;
      this.dbConnSetForm = {
        connName,
        host,
        port,
        username,
        password,
        database,
        ...ssl,
      };
      this.dbConnSetId = connId;
      this.dbConnSetType = dbType;
      this.dbConnSetActivate = isActivate;
    },

    async getDbConnSave() {
      const { connName, ...connInfo } = this.dbConnSetForm;
      const params = {
        connId: this.dbConnSetIsNew ? "" : this.dbConnSetId,
        connName,
        dbType: this.dbConnSetType,
        connInfo: JSON.stringify(connInfo),
        isActivate: this.dbConnSetActivate,
      };

      await useDbConnectionApi("save", params); // TODO: 要寫入回傳
      await this.getDbConnList(false);
      this.dbConnDialog.connSetting = false;
    },

    async getDbConnTest() {
      const { _, ...connInfo } = this.dbConnSetForm;
      const data = await useDbConnectionApi("test-connection", {
        dbType: this.dbConnSetType,
        connInfo: JSON.stringify(connInfo),
      });
      this.dbConnTestRes = data.data as boolean;
    },

    async getDbConnUpdate(
      connId: string,
      isActivate: boolean,
    ): Promise<boolean> {
      const data = await useDbConnectionApi("update", {
        connId,
        isActivate,
      });
      return data.code === ApiResponseCode.Success;
    },

    resetDbConnSetForm() {
      this.dbConnSetForm = {
        connName: "",
        host: "",
        port: "",
        username: "",
        password: "",
        database: "",
        ssl: {},
      };
    },

    onCloseDbConnSetForm() {
      this.dbConnDialog.categories = this.dbConnSetIsNew;
      this.resetDbConnSetForm();
      this.dbConnTestRes = null;
    },
  },
});
