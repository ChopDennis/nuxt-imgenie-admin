export class DataMartController {
  private store;
  constructor() {
    this.store = useDataMartStore();
  }

  async getList(): Promise<DataMartListRes[]> {
    await this.store.getDataMartTable();
    return this.store.dataMartListRes;
  }

  async getTable(): Promise<DataMartTable[]> {
    const list = await this.getList();

    this.store.dataMartTable = _useMap(list, (list, index) => {
      return {
        ...list,
        rowNumber: index + 1,
      };
    });
    return this.store.dataMartTable;
  }

  // async queryMart() {
  //   const route = useRoute();
  //   const info = await this.store.getQuery(route.query.datamartId as string);
  //   this.store.dataMartInfo = info;
  // }

  // async changeActivate(connId: string, isActivate: boolean): Promise<boolean> {
  //   return await this.store.getUpdate(connId, isActivate);
  // }

  // addMart() {
  //   this.store.resetDataMartForm();
  //   navigateTo({ path: "/data-mart/edit" });
  // }
}
