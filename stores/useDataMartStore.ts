export const useDataMartStore = defineStore("dataMart", {
  state: () => {
    return {
      dataMartList: [] as DataMartListRes[],
    };
  },

  // TODO: try catch
  actions: {
    async getDataMartList(cached: boolean) {
      try {
        const { data } = await useApi(ApiDataMart.List, {
          cached,
          loading: true,
        });
        this.dataMartList = data;
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
    },
  },
});
