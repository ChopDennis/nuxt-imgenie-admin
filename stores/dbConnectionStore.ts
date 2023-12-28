export const useDbConnectionStore = defineStore("dbConnection", {
  state: () => {
    return {
      dbConnList: [] as DbConnList[],
      dbConnTable: [] as DbConnTable[],
      dbConnTypesRes: [] as DbConnTypesRes[],
      dbConnSchemaRes: [],
      dbConnSetForm: {} as DbConnSetForm,
      dbConnSetId: "",
      dbConnSetType: "",
      dbConnSetTitle: "",
      dbConnSetName: "",
      dbConnSetIsNew: false as boolean,
      dbConnSetActivate: true as boolean,
      dbConnTestMessage: "" as string,
      dbConnTestStatus: null as boolean | null,
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
        const mappingData = _useMap(table.data as DbConnListRes[], (list) => {
          const { connInfo, dbType, connName, connId, isActivate } = list;
          const { host, port, database } = connInfo;
          return {
            id: connId,
            dbType,
            connName,
            host: `${host}: ${port}`,
            database,
            isActivate,
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
        const mappingData = _useMap(list.data as DbConnListRes[], (list) => {
          const { connInfo, dbType, connName, connId } = list;
          const { host, port, database } = connInfo;
          return {
            connId,
            connType: _useUpperFirst(dbType),
            connName,
            host: `${host}: ${port}`,
            database,
          };
        });

        this.dbConnList = mappingData;
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
    },

    async getDbConnTypes() {
      const { data } = await useApi(ApiDbConnection.Types);
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
      const dbTypeTitle: { [key: string]: any } = {
        postgresql: "PostgreSQL",
        bigquery: "BigQuery",
        presto: "Presto",
        mssql: "Microsoft SQL Server",
        mysql: "MySQL",
      };

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
      this.dbConnSetTitle = dbTypeTitle[`${dbType}`];
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
      // this.dbConnDialog.categories = this.dbConnSetIsNew;
      this.resetDbConnSetForm();
      this.dbConnTestMessage = "";
    },
  },
});
