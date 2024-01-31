enum DataMartApi {
  All = "/api/datamart/datamart/all",
  List = "/api/datamart/datamart/list",
  Update = "/api/datamart/datamart/update",
  Query = "/api/datamart/datamart/query",
  Save = "/api/datamart/datamart/save",
  Export = "/api/datamart/datamart/export-file",
  Used = "/api/datamart/datamart/used",
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
    let confirm = true;
    const result = await checkUsed(dataMartStore.setting.datamartId);
    if (!isEmpty(result)) {
      const message = `<div class="text-base" style="color:#20222F">請確定是否送出修改內容 ?</div><div class="pt-2" style="color:#999999">修改資料模型，任何連接此設定的ChatSQL對話將受到影響。<br>確定要儲存？</div>`;
      confirm = await ElMessageBox.confirm(message, {
        confirmButtonText: "取消",
        cancelButtonText: "確定",
        dangerouslyUseHTMLString: true,
        closeOnClickModal: false,
        type: "error",
        showClose: false,
      })
        .then(() => {
          return false;
        })
        .catch(() => {
          return true;
        });
    }
    if (confirm) {
      const { data } = await useApi(DataMartApi.Save, {
        params,
        loading: true,
      });
      const save = data.value as ApiResponse;
      if (save.code === ApiResponseCode.Success) {
        dataMartStore.isEdit = false;
        await getTable();
      }
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

  const checkUsed = async (datamartId: string) => {
    const { data } = await useApi(DataMartApi.Used, {
      params: {
        datamartId,
      },
    });

    return data.value.data;
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
    checkUsed,
    resetForm,
  };
}
