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
  updateTime: string;
  isConnUpdated: boolean;
}

interface DataMartTable {
  id: string;
  connId: string;
  connName: string;
  dataMartName: string;
  dbType: string;
  isActivate: boolean;
  isConnUpdated: boolean;
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
  list: DataMartList[];
  query: DataMartQuery;
  setting: DataMartSetting;
  dbml: UploadRawFile | File | null;
  default: {
    isDefaultSet: boolean;
    defaultConnName: string;
    defaultConnId: string;
  };
  isEdit: boolean;
}

export const useDataMartStore = defineStore("dataMart", {
  state: (): DataMartStoreState => {
    return {
      table: [],
      list: [],
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
      default: {
        isDefaultSet: false,
        defaultConnId: "",
        defaultConnName: "",
      },
      isEdit: false,
    };
  },
});
