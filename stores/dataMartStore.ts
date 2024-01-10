import type { UploadRawFile } from "element-plus";
interface ConnectionInfo {
  database: string;
  host: string;
  port: string;
  username: string;
  password: string;
  ssl?: any;
  [key: string]: any;
}
export interface DataMartList {
  datamartId: string;
  dataMartName: string;
  description: string;
  dbType: string;
  connId: string;
  connName: string;
  icon: string;
  isActivate: boolean;
  createTIme: string;
  updateTime: string;
}

interface DataMartTable {
  id: string;
  connName: string;
  dataMartName: string;
  dbType: string;
  isActivate: boolean;
}
export interface DataMartQuery {
  datamartId: string;
  datamartName: string;
  description: string;
  dbName: string;
  dbConnection: {
    connId: string;
    dbType: string;
    connName: string;
    connInfo: ConnectionInfo;
  };
  [key: string]: any;
}

export interface DataMartSetting {
  connId: string;
  connName: string;
  datamartId: string;
  dbType: string;
  database: string;
  datamartName: string;
  description: string;
  dbName: string;
  fileName: string;
  host: string;
  isActivate: boolean;
}
interface DataMartStoreState {
  table: DataMartTable[];
  query: DataMartQuery;
  setting: DataMartSetting;
  dbml: UploadRawFile | File | null;
}

export const useDataMartStore = defineStore("dataMart", {
  state: (): DataMartStoreState => {
    return {
      table: [],
      query: {
        datamartId: "",
        datamartName: "",
        description: "",
        dbName: "",
        dbConnection: {
          connId: "",
          dbType: "",
          connName: "",
          connInfo: {
            database: "",
            host: "",
            port: "",
            username: "",
            password: "",
          },
        },
      },
      setting: {
        connId: "",
        connName: "",
        datamartId: "",
        dbType: "",
        database: "",
        datamartName: "",
        description: "",
        dbName: "",
        fileName: "",
        host: "",
        isActivate: true,
      },
      dbml: null,
    };
  },
});
