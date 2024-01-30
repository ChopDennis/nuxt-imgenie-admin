enum DataMartApi {
  All = "/api/datamart/datamart/all",
  List = "/api/datamart/datamart/list",
  Update = "/api/datamart/datamart/update",
  Query = "/api/datamart/datamart/query",
  Save = "/api/datamart/datamart/save",
  Export = "/api/datamart/datamart/export-file",
}

export const getDataMartListApi = () =>
  useApi<DataMartList[]>(DataMartApi.List);

export default function useDataMartApi() {
  const dataMartStore = useDataMartStore();

  const getTable = async () => {
    const { data } = await useApi<DataMartList[]>(DataMartApi.All);
    const res = data.value;
    dataMartStore.table = _useMap(res.data, (list) => {
      const {
        datamartId: id,
        dataMartName,
        connName,
        dbType,
        connId,
        isActivate,
        isConnUpdated,
      } = list;
      return {
        id,
        dataMartName,
        connId,
        connName,
        dbType,
        isActivate,
        isConnUpdated,
      };
    });
  };

  const getQuery = async (id: string) => {
    const datamartId = id;
    if (!datamartId) return;
    const { data } = await useApi<DataMartQuery>(DataMartApi.Query, {
      params: {
        datamartId,
      },
    });
    const res = data.value;
    dataMartStore.query = res.data;

    const { dbConnection, ...rest } = dataMartStore.query;
    const { connInfo, ...conn } = dbConnection;
    const { host, database } = connInfo;
    dataMartStore.setting = {
      ...rest,
      ...conn,
      host,
      database,
      fileName: "",
      isActivate: true,
    };
  };

  const getExport = async (id: string) => {
    const datamartId = id;
    if (!datamartId) return;
    const { data } = await useApi(DataMartApi.Export, {
      params: {
        datamartId,
      },
    });
    const contentDisposition = localStorage.getItem("Content-Disposition");
    if (contentDisposition) {
      dataMartStore.setting.fileName = contentDisposition.split("''")[1];
    }
    const dbml = data.value as unknown;
    return new File([dbml as Blob], `${dataMartStore.setting.fileName}`, {
      type: "application/octet-stream",
    });
  };

  const sendSave = async (params: FormData) => {
    const { data } = await useApi(DataMartApi.Save, {
      params,
      loading: true,
    });
    const save = data.value as ApiResponse;
    if (save.code === ApiResponseCode.Success) {
      dataMartStore.isEdit = false;
      await getTable();
    }
  };

  const sendUpdate = async (datamartId: string, isActivate: boolean) => {
    const { data } = await useApi(DataMartApi.Update, {
      params: {
        datamartId,
        isActivate,
      },
    });
    const res = data.value as ApiResponse;
    return res.code === ApiResponseCode.Success;
  };

  const resetForm = () => {
    dataMartStore.setting = {
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
    dataMartStore.dbml = null;
  };

  return {
    getTable,
    getDataMartListApi,
    getQuery,
    getExport,
    sendSave,
    sendUpdate,
    resetForm,
  };
}
