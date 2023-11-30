export const useDataMartStore = defineStore("dataMart", {
  state: () => {
    return {
      dataMartListRes: [] as DataMartListRes[],
      dataMartList: [] as DataMartListMap[],
      dataMartQueryRes: {} as DataMartQueryRes,
      dataMartInfo: {} as DataMartInfo,
    };
  },

  // TODO: try catch
  actions: {
    async getDataMartList(cached: boolean, loading: boolean) {
      try {
        const { data } = await useApi(ApiDataMart.List, {
          cached,
          loading,
        });

        this.dataMartListRes = data;
        this.mapDataMartList();
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
    },

    mapDataMartList() {
      const mappingData = _useMap(this.dataMartListRes, (list, index) => {
        return {
          ...list,
          rowNumber: index + 1,
        };
      });
      this.dataMartList = mappingData;
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

    async getDataMartQuery(datamartId: string) {
      const { data } = await useApi(ApiDataMart.Update, {
        params: {
          datamartId,
        },
      });
      this.dataMartQueryRes = data;
      this.mapDataMartInfo();
    },

    mapDataMartInfo() {
      // const { datamartId, datamartName, dbName, description, dbConnection } =
      //   this.dataMartQueryRes;
      // const { connId } = dbConnection;
      // this.dataMartInfo = {
      //   datamartName,
      //   description,
      // }
    },

    resetDataMartForm() {
      this.dataMartInfo = {
        datamartName: "",
        description: "",
        dbConnection: {
          connId: "",
          dbType: "",
          connName: "",
          connInfo: {
            username: "",
            password: "",
            host: "",
            port: "",
            database: "",
          },
        },
        DBML: "",
      };
    },
  },
});
