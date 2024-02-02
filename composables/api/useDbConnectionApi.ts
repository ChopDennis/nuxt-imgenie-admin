enum Api {
  Table = "/api/datamart/dbconnection/all",
  List = "/api/datamart/dbconnection/list",
  Types = "/api/datamart/dbconnection/dbs",
  Save = "/api/datamart/dbconnection/save",
  Test = "/api/datamart/dbconnection/test-connection",
  Query = "/api/datamart/dbconnection/query",
  Update = "/api/datamart/dbconnection/update",
  Schemas = "/api/datamart/dbconnection/schemas",
  Used = "/api/datamart/dbconnection/used",
}

export const openConnectionSetting = () => {
  return useState<boolean>("isConnSetting", () => false);
};

export const openConnectionTypes = () => {
  return useState<boolean>("isConnTypes", () => false);
};

export default function useDbConnectionApi() {
  const dbConnStore = useDbConnectionStore();

  /** @description Get all of database connection. */
  const getTable = async () => {
    const { data } = await useApi<ConnectionList[]>(Api.Table, {
      loading: true,
    });
    const res = data.value;
    dbConnStore.table = _useMap(res.data, (list) => {
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
  };

  /** @description Get types of database. */
  const getTypes = async () => {
    const { data } = await useApi<ConnectionTypes[]>(Api.Types, {
      cached: true,
    });
    const res = data.value;
    dbConnStore.types = res.data;
  };

  /** @description Get the list of activate database connection. */
  const getList = async () => {
    const { data } = await useApi<ConnectionList[]>(Api.List);
    const res = data.value;
    dbConnStore.list = _useMap(res.data, (list) => {
      const { connInfo, dbType, connName, connId } = list;
      const { host, port, database } = connInfo;
      return {
        connId,
        dbType,
        connName,
        host: `${host}: ${port}`,
        database,
      };
    });
  };

  /** @description Get schemas of the database. */
  const getSchemas = async (connId: string) => {
    const { data } = await useApi<string[]>(Api.Schemas, {
      params: { connId },
    });
    const res = data.value;
    dbConnStore.schemas = res.data;
  };

  /** @description Get detail of the database connection. */
  const getQuery = async (connId: string) => {
    const { data } = await useApi<ConnectionList>(Api.Query, {
      params: {
        connId,
      },
      decrypt: true,
    });
    const res = data.value;
    const { connName, connInfo, dbType, isActivate } = res.data;
    const { ssl, host, port, username, password, database } = connInfo;
    dbConnStore.select = {
      connId,
      dbType,
      connName,
      host,
      database,
    };
    dbConnStore.setting = {
      connId,
      form: {
        connName,
        host,
        port,
        username,
        password,
        database,
        ...ssl,
      },
      dbType,
      dialogTitle: "",
      isActivate,
    };
    await getTypes();
    dbConnStore.setting.dialogTitle =
      _useFind(dbConnStore.types, ["itemId", dbType])?.title ?? "";
  };

  /** @description Send Request after saving database connection. */
  const sendSave = async () => {
    const { connId, dbType, isActivate } = dbConnStore.setting;
    const { connName, ...connInfo } = dbConnStore.setting.form;
    const params = {
      connId,
      connName,
      dbType,
      connInfo: JSON.stringify(connInfo),
      isActivate,
    };
    const { status } = await useApi(Api.Save, {
      params,
      encrypt: true,
      decrypt: true,
      loading: true,
    });
    if (status.value === "success") {
      await getTable();
    }
    resetForm();
  };

  /** @description Send Request while switch connection status. */
  const sendUpdate = async (
    connId: string,
    isActivate: boolean,
  ): Promise<boolean> => {
    const { data } = await useApi(Api.Update, {
      params: {
        connId,
        isActivate,
      },
      loading: true,
    });
    const res = data.value as ApiResponse;
    return res.code === ApiResponseCode.Success;
  };

  /** @description Send Request while click test-connection button. */
  const sendTest = async () => {
    dbConnStore.test.status = null;
    const dbType = dbConnStore.setting.dbType;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { connName, ...info } = dbConnStore.setting.form;
    const connInfo = JSON.stringify(info);
    const params = {
      dbType,
      connInfo,
    };

    const { data, status } = await useApi<any>(Api.Test, {
      params,
      encrypt: true,
      loading: true,
    });

    if (status.value === "success") {
      const res = data.value;
      console.log(res.code); // eslint-disable-line no-console
      if (res.code === ApiResponseCode.Success) {
        dbConnStore.test.status = true;
        dbConnStore.test.message = "連線成功";
      } else {
        dbConnStore.test.status = false;
        dbConnStore.test.message = res.message as string;
      }
    }
  };

  const checkUsed = async (connId: string) => {
    const { data } = await useApi(Api.Used, {
      params: {
        connId,
      },
    });

    return data.value.data;
  };

  const resetForm = () => {
    const isConnSetting = openConnectionSetting();
    isConnSetting.value = false;
    dbConnStore.setting.dbType = "";
    dbConnStore.test.status = null;
    dbConnStore.setting = {
      connId: "",
      dbType: "",
      dialogTitle: "",
      isActivate: true,
      form: {
        connName: "",
        host: "",
        port: "",
        username: "",
        password: "",
        database: "",
      },
    };
  };

  return {
    sendTest,
    sendUpdate,
    sendSave,
    getTable,
    getTypes,
    getList,
    getQuery,
    getSchemas,
    checkUsed,
    resetForm,
  };
}
