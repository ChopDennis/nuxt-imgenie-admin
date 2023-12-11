export const useDbConnectionStore = defineStore("dbConnection", {
  state: () => {
    return {
      dbConnListMap: [] as DbConnListMap[],
      dbConnTypesRes: [] as DbConnTypesRes[],
      dbConnSchemaRes: [],
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
      dbConnSelectDb: "",
      dbConnSelectConn: "",
      dbConnSetTable: {} as {
        dbType: string;
        connName: string;
        host: string;
        database: string;
      },
      dbConnTable: [] as DbConnListMap[],
    };
  },

  actions: {
    async getDbConnTable(options?: ApiOptions) {
      try {
        const { data, execute } = await useApi(ApiDbConnection.All, {
          ...options,
          immediate: false,
        });
        await execute();
        const table = data.value as ApiResponse;
        const mappingData = _useMap(table.data, (list, index) => {
          const { connInfo, dbType, connName, ...rest } = list;
          const { host, port, database } = connInfo;
          return {
            ...rest,
            connType: _useUpperFirst(dbType),
            connName,
            connInfoHostPort: `${host}:${port}`,
            connInfoDatabase: database,
            rowNumber: index + 1,
          };
        });

        this.dbConnTable = mappingData;
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
    },
    async getDbConnActiveList() {
      try {
        const { data } = await useApi(ApiDbConnection.List);
        const list = data.value as ApiResponse;
        const mappingData = _useMap(
          list.data as DbConnListRes[],
          (list, index) => {
            const { connInfo, dbType, connName, ...rest } = list;
            const { host, port, database } = connInfo;
            return {
              ...rest,
              connType: _useUpperFirst(dbType),
              connName,
              connInfoHostPort: `${host}:${port}`,
              connInfoDatabase: database,
              rowNumber: index + 1,
            };
          },
        );

        this.dbConnListMap = mappingData;
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
    },

    async getDbConnTypes() {
      const { data } = await useApi(ApiDbConnection.Types, { cached: true });
      const types = data.value as ApiResponse;
      this.dbConnTypesRes = types.data;
    },

    async getDbConnSchemas(id: string) {
      const { data } = await useApi(ApiDbConnection.Schemas, {
        params: { connId: id },
      });
      const schemas = data.value as ApiResponse;
      this.dbConnSchemaRes = schemas.data;
    },

    async getDbConnQuery(id: string) {
      const { data } = await useApi(ApiDbConnection.Query, {
        params: {
          connId: id,
        },
        decrypt: true,
      });
      const query = data.value as ApiResponse;

      const { connName, connInfo, dbType, connId, isActivate } =
        query.data as DbConnQueryRes;
      const { ssl, host, port, username, password, database } =
        connInfo as ConnInfo;
      this.dbConnSetTable = {
        dbType,
        connName,
        host,
        database,
      };
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
      await this.getDbConnTable();
      this.dbConnDialog.connSetting = false;
    },

    async getDbConnTest() {
      const { connName, ...connInfo } = this.dbConnSetForm;
      const { data } = await useApi(ApiDbConnection.Test, {
        params: {
          dbType: this.dbConnSetType,
          connInfo: JSON.stringify(connInfo),
        },
        encrypt: true,
      });
      const test = data.value as ApiResponse;
      this.dbConnSetName = connName;
      this.dbConnTestRes = test.data as boolean;
    },

    async getDbConnUpdate(
      connId: string,
      isActivate: boolean,
    ): Promise<boolean> {
      const { data } = await useApi(ApiDbConnection.Update, {
        params: {
          connId,
          isActivate,
        },
      });
      const update = data.value as ApiResponse;
      return update.code === ApiResponseCode.Success;
    },

    resetDbConnSetForm() {
      this.dbConnSetForm = {
        connName: "",
        host: "",
        port: "",
        username: "",
        password: "",
        database: "",
        // ssl: {
        //   isSSL: false,
        //   isClientCertificate: false,
        //   ca: "",
        //   clientCertificate: "",
        //   clientKey: "",
        // },
      };
    },

    onCloseDbConnSetForm() {
      this.dbConnDialog.categories = this.dbConnSetIsNew;
      this.resetDbConnSetForm();
      this.dbConnTestRes = null;
    },
  },
});
