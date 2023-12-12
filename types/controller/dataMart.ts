declare global {
  interface DataMartTable {
    connName: string;
    dataMartName: string;
    dbType: string;
    icon: string;
    isActivate: boolean;
    updateTime: string;
  }

  interface DataMartInfo {
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
    DBML?: any;
    [key: string]: any;
  }

  interface DataMartSetForm {
    connId: string;
    connName: string;
    datamartId: string;
    dbType: string;
    database: string;
    datamartName: string;
    description: string;
    dbName: string;
    host: string;
    isActivate: boolean;
  }
}

export {};
