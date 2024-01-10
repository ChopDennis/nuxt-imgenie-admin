enum Api {
  List = "/api/datamart/datamart/all",
  Update = "/api/datamart/datamart/update",
  Query = "/api/datamart/datamart/query",
  Save = "/api/datamart/datamart/save",
  Export = "/api/datamart/datamart/export-file",
}

export default function dataMartApi() {
  const store = useDataMartStore();

  const getTable = async () => {
    const { data } = await useApi<DataMartList[]>(Api.List);
    const res = data.value;
    store.table = _useMap(res.data, (list) => {
      const {
        datamartId: id,
        dataMartName,
        connName,
        dbType,
        isActivate,
      } = list;
      return {
        id,
        dataMartName,
        connName,
        dbType,
        isActivate,
      };
    });
  };

  const getQuery = async () => {
    const datamartId = _useToString(useRoute().query.datamartId);
    const { data } = await useApi<DataMartQuery>(Api.Query, {
      params: {
        datamartId,
      },
    });
    const res = data.value;
    store.query = res.data;

    const { dbConnection, ...rest } = store.query;
    const { connInfo, ...conn } = dbConnection;
    const { host, database } = connInfo;
    store.setting = {
      ...rest,
      ...conn,
      host,
      database,
      fileName: "",
      isActivate: true,
    };
  };

  const getExport = async () => {
    const datamartId = _useToString(useRoute().query.datamartId);
    const { data } = await useApi(Api.Export, {
      params: {
        datamartId,
      },
    });
    const dbml = data.value as unknown;
    store.setting.fileName = localStorage
      .getItem("fileName")
      ?.split("''")[1] as string;
    return dbml as Blob;
  };

  const sendSave = async (params: FormData) => {
    const { data } = await useApi(Api.Save, {
      params,
      loading: true,
    });
    const save = data.value as ApiResponse;
    if (save.code === ApiResponseCode.Success) {
      await getTable();
      // resetForm();
    }
    return save.code === ApiResponseCode.Success;
  };

  const sendUpdate = async (datamartId: string, isActivate: boolean) => {
    const { data } = await useApi(Api.Update, {
      params: {
        datamartId,
        isActivate,
      },
    });
    const res = data.value as ApiResponse;
    return res.code === ApiResponseCode.Success;
  };

  const resetForm = () => {
    store.setting = {
      connId: "",
      connName: "",
      datamartId: "",
      dbType: "",
      database: "",
      datamartName: "",
      description: "",
      dbName: "",
      fileName: "",
      host: "",
      isActivate: true,
    };
    store.dbml = null;
  };

  return {
    getTable,
    getQuery,
    getExport,
    sendSave,
    sendUpdate,
    resetForm,
  };
}
