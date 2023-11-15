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
      const data = await useDbConnectionApi("list", null, cached, true);
      const mappingData = _useMap(
        _useReverse(
          _useSortBy(data.data as DbConnListRes[], [
            "updateTime",
            "isActivate",
          ]),
        ),
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
      this.dbConnSetForm = {
        connName,
        ...connInfo,
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
        database: "",
        host: "",
        port: "",
        username: "",
        password: "",
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
