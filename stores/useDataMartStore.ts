export const useDataMartStore = defineStore("dataMart", {
  state: () => {
    return {
      dataMartList: [] as DataMartListRes[],
      dataMartListMap: [] as DataMartListMap[],
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

        this.dataMartList = data;
        this.mapDataMartList();
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
    },
    mapDataMartList() {
      const mappingData = _useMap(this.dataMartList, (list, index) => {
        return {
          ...list,
          rowNumber: index + 1,
        };
      });
      this.dataMartListMap = mappingData;
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
  },
});
