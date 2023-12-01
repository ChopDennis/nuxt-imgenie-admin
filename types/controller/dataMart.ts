declare global {
  interface DataMartTable {
    connName: string;
    dataMartName: string;
    dbType: string;
    icon: string;
    isActivate: boolean;
    rowNumber: number;
    updateTime: string;
  }

  interface DataMartInfo {
    datamartId?: string;
    datamartName: string;
    description: string;
    dbConnection?: {
      connId: string;
      dbType: string;
      connName: string;
      connInfo: ConnInfo;
    };
    DBML?: any;
    [key: string]: any;
  }
}

export {};
