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

  interface DataMartQueryRes {
    datamartId: string;
    datamartName: string;
    description: string;
    dbName: string;
    dbConnection: {
      connId: string;
      dbType: string;
      connName: string;
      connInfo: ConnInfo;
    };
    fileName: string;
    [key: string]: any;
  }
}

export {};
