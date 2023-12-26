export const useDataMartStore = defineStore("dataMart", {
  state: () => {
    return {
      dataMartListRes: [] as DataMartListRes[],
      dataMartQueryRes: {} as DataMartQueryRes,
      dataMartQueryFileName: "" as string,
      dataMartTable: [] as DataMartTable[],
      dataMartSetForm: {
        connId: "",
        connName: "",
        datamartId: "",
        dbType: "",
        database: "",
        datamartName: "",
        description: "",
        dbName: "",
        host: "",
        isActivate: true,
      } as DataMartSetForm,
      dataMartFileName: "",
    };
  },

  actions: {
    async getDataMartTable(options?: ApiOptions) {
      try {
        const { data, execute } = await useApi(ApiDataMart.List, {
          ...options,
          immediate: false,
        });
        await execute();
        const table = data.value as ApiResponse;
        this.dataMartTable = _useMap(
          table.data as DataMartListRes[],
          (list) => {
            const { datamartId, ...rest } = list;
            return {
              id: datamartId,
              ...rest,
            };
          },
        );
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
    },
    async getDataMartUpdate(datamartId: string, isActivate: boolean) {
      try {
        const { data } = await useApi(ApiDataMart.Update, {
          params: {
            datamartId,
            isActivate,
          },
        });
        const update = data.value as ApiResponse;
        return update.code === ApiResponseCode.Success;
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      }
    },

    async getDataMartQuery() {
      const route = useRoute();
      try {
        const { data } = await useApi(ApiDataMart.Query, {
          params: {
            datamartId: route.query.datamartId,
          },
        });
        const query = data.value as ApiResponse;
        this.dataMartQueryRes = query.data;
        const { dbConnection, fileName, ...rest } = this.dataMartQueryRes;
        const { connInfo, ...conn } = dbConnection;
        const { host, database } = connInfo;
        this.dataMartSetForm = {
          ...rest,
          ...conn,
          host,
          database,
          isActivate: true,
        };
        this.dataMartQueryFileName = fileName;
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
    },

    async getDataMartSave(params: FormData) {
      try {
        const { data } = await useApi(ApiDataMart.Save, {
          params,
          loading: true,
        });
        const save = data.value as ApiResponse;
        return save.code === ApiResponseCode.Success;
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      }
    },

    async getDataMartExport(datamartId: string): Promise<Blob | undefined> {
      let dbml;
      try {
        const { data } = await useApi(ApiDataMart.Export, {
          params: {
            datamartId,
          },
        });
        dbml = data.value as Blob;
        this.dataMartFileName = localStorage
          .getItem("fileName")
          ?.split("''")[1] as string;
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      }
      return dbml;
    },

    resetDataMartSetForm() {
      this.dataMartSetForm = {
        connId: "",
        connName: "",
        datamartId: "",
        dbType: "",
        database: "",
        datamartName: "",
        description: "",
        dbName: "",
        host: "",
        isActivate: true,
      };
    },
  },
});
