declare global {
  interface DataMartListRes {
    datamartId: string;
    description: string;
    connId: string;
    connName: string;
    dbType: string;
    icon: string;
    updateTime: string;
    dataMartName: string;
    isActivate: boolean;
  }
}

export {};
