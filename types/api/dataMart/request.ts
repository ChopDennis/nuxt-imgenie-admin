declare global {
  interface DataMartSaveRes {
    datamartId: string;
    dataMartName: string;
    description: string;
    dbType: string;
    connId: string;
    connName: string;
    icon: string;
    isActivate: boolean;
    updateTime: string;
  }
}

export {};
