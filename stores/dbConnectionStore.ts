interface ConnectionInfo {
  database: string;
  host: string;
  port: string;
  username: string;
  password: string;
  ssl?: any;
  [key: string]: any;
}

interface ConnectionList {
  connId: string;
  connInfo: ConnectionInfo;
  connName: string;
  dbType: string;
  isActivate: boolean;
  updateTime: string;
}

interface ConnectionActivate {
  connId: string;
  dbType: string;
  connName: string;
  host: string;
  database: string;
}

interface ConnectionTable {
  id: string;
  connName: string;
  database: string;
  dbType: string;
  host: string;
  isActivate: boolean;
}

interface ConnectionTypes {
  itemId: string;
  icon: string;
  title: string;
  refUrl?: string;
  description?: string;
}

interface ConnectionSetForm extends ConnectionInfo {
  connName: string;
}

interface ConnectionSetting {
  form: ConnectionSetForm;
  connId: string;
  dbType: string;
  dialogTitle: string;
  isActivate: boolean;
}

interface DbConnectionStoreState {
  schemas: string[];
  test: {
    message: string;
    status: boolean | null;
  };
  setting: ConnectionSetting;
  select: ConnectionActivate;
  list: ConnectionActivate[];
  table: ConnectionTable[];
  types: ConnectionTypes[];
  addConnationTrigger: boolean;
  isEdit: boolean;
}

export type {
  DbConnectionStoreState,
  ConnectionList,
  ConnectionTypes,
  ConnectionSetForm,
};

export const useDbConnectionStore = defineStore("dbConnectionStore", {
  state: (): DbConnectionStoreState => {
    return {
      list: [],
      table: [],
      test: {
        message: "",
        status: null,
      },
      types: [],
      schemas: [],
      select: {
        connId: "",
        dbType: "",
        connName: "",
        host: "",
        database: "",
      },
      setting: {
        connId: "",
        dbType: "",
        dialogTitle: "",
        isActivate: true,
        form: {
          connName: "",
          host: "",
          port: "",
          username: "",
          password: "",
          database: "",
        },
      },
      addConnationTrigger: false,
      isEdit: false,
    };
  },
  actions: {},
});
