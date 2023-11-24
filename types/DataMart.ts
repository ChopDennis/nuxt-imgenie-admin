declare global {
  interface DataMartListRes {
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

  interface DataMartListMap {
    connName: string;
    dataMartName: string;
    dbType: string;
    icon: string;
    isActivate: boolean;
    rowNumber: number;
    updateTime: string;
  }
}

export {};
