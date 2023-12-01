export const useDataMartStore = defineStore("dataMart", {
  state: () => {
    return {
      dataMartTable: [
        {
          connName: "",
          dataMartName: "",
          dbType: "",
          icon: "",
          isActivate: false,
          rowNumber: 0,
          updateTime: "",
        },
      ] as DataMartTable[],
      dataMartInfo: {} as DataMartInfo,
    };
  },

  actions: {
    async getList(
      cached: boolean,
      loading: boolean,
    ): Promise<DataMartListRes[]> {
      let response;
      try {
        const { data } = await useApi(ApiDataMart.List, {
          cached,
          loading,
        });

        response = data;
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
      return response;
    },

    async getUpdate(datamartId: string, isActivate: boolean): Promise<boolean> {
      const data = await useApi(ApiDataMart.Update, {
        params: {
          datamartId,
          isActivate,
        },
      });
      return data.code === ApiResponseCode.Success;
    },

    async getQuery(datamartId: string): Promise<DataMartQueryRes> {
      let response;
      try {
        const { data } = await useApi(ApiDataMart.Update, {
          params: {
            datamartId,
          },
        });
        response = data;
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
      return response;
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
