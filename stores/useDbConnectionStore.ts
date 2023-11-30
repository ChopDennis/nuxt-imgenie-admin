export const useDbConnectionStore = defineStore("dbConnection", {
  state: () => {
    return {
      dbConnListMap: [] as DbConnListMap[],
      dbConnTypesRes: [] as DbConnTypesRes[],
      dbConnSetForm: {} as DbConnSetForm,
      dbConnSetId: "",
      dbConnSetType: "",
      dbConnSetTitle: "",
      dbConnSetName: "",
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

  // TODO: try catch
  actions: {
    async getDbConnList(cached: boolean, loading: boolean) {
      try {
        const { data } = await useApi(ApiDbConnection.List, {
          cached,
          loading,
          // decrypt: true,
        });
        const mappingData = _useMap(data as DbConnListRes[], (list, index) => {
          const { connInfo, dbType, connName, ...rest } = list;
          const { host, port, database } = connInfo;
          return {
            ...rest,
            connTypeName: `${_useUpperFirst(dbType)}-${connName}`,
            connInfoHostPort: `${host}:${port}`,
            connInfoDatabase: database,
            rowNumber: index + 1,
          };
        });

        this.dbConnListMap = mappingData;
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
    },

    async getDbConnTypes() {
      const { data } = await useApi(ApiDbConnection.Types, { cached: true });
      this.dbConnTypesRes = data;
    },

    async getDbConnQuery(id: string) {
      const { data } = await useApi(ApiDbConnection.Query, {
        params: {
          connId: id,
        },
        decrypt: true,
      });
      const { connName, connInfo, dbType, connId, isActivate } =
        data as DbConnQueryRes;
      const { ssl, host, port, username, password, database } =
        connInfo as ConnInfo;
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
      this.dbConnSetTitle = _useUpperFirst(dbType);
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

      await useApi(ApiDbConnection.Save, {
        params,
        encrypt: true,
        decrypt: true,
      });
      await this.getDbConnList(false, false);
      this.dbConnDialog.connSetting = false;
    },

    async getDbConnTest() {
      const { connName, ...connInfo } = this.dbConnSetForm;
      const data = await useApi(ApiDbConnection.Test, {
        params: {
          dbType: this.dbConnSetType,
          connInfo: JSON.stringify(connInfo),
        },
        encrypt: true,
      });
      this.dbConnSetName = connName;
      this.dbConnTestRes = data.data as boolean;
    },

    async getDbConnUpdate(
      connId: string,
      isActivate: boolean,
    ): Promise<boolean> {
      const data = await useApi(ApiDbConnection.Update, {
        params: {
          connId,
          isActivate,
        },
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
        ssl: {
          isSSL: false,
          isClientCertificate: false,
          ca: "",
          clientCertificate: "",
          clientKey: "",
        },
      };
    },

    onCloseDbConnSetForm() {
      this.dbConnDialog.categories = this.dbConnSetIsNew;
      this.resetDbConnSetForm();
      this.dbConnTestRes = null;
    },
  },
});
