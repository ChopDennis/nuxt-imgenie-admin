export const useDataMartStore = defineStore("dataMart", {
  state: () => {
    return {
      dataMartListRes: [] as DataMartListRes[],
      dataMartQueryRes: {} as DataMartQueryRes,
      dataMartTable: [] as DataMartTable[],
      dataMartInfo: {} as DataMartInfo,
    };
  },

  actions: {
    async getDataMartList(cached: boolean, loading: boolean) {
      try {
        const { data } = await useApi(ApiDataMart.List, {
          cached,
          loading,
        });
        const table = _useMap(data as DataMartListRes[], (list, index) => {
          return {
            ...list,
            rowNumber: index + 1,
          };
        });
        this.dataMartTable = table;
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
    },
    async getDataMartUpdate(
      datamartId: string,
      isActivate: boolean,
    ): Promise<boolean> {
      const data = await useApi(ApiDataMart.Update, {
        params: {
          datamartId,
          isActivate,
        },
      });
      return data.code === ApiResponseCode.Success;
    },

    async getDataMartQuery() {
      const route = useRoute();
      try {
        const { data } = await useApi(ApiDataMart.Query, {
          params: {
            datamartId: route.query.datamartId,
          },
        });
        this.dataMartInfo = data as DataMartInfo;
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
    },

    async getDataMartSave(params: FormData) {
      try {
        const { data } = await useApi(ApiDataMart.Save, {
          params,
        });
        console.log("getDataMartSave", data);
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
    },

    async getDataMartExport(datamartId: string): Promise<Blob> {
      let data: any;
      try {
        data = await useApi(ApiDataMart.Export, {
          params: {
            datamartId,
          },
        });
        console.log("getDataMartExport", data);
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
      return data;
    },

    // resetDataMartForm() {
    //   this.dataMartInfo = {
    //     datamartName: "",
    //     description: "",
    //     dbConnection: {
    //       connId: "",
    //       dbType: "",
    //       connName: "",
    //       connInfo: {
    //         username: "",
    //         password: "",
    //         host: "",
    //         port: "",
    //         database: "",
    //       },
    //     },
    //     DBML: "",
    //   };
    // },
  },
});
