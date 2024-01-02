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
  dbType: string;
  dialogTitle: string;
  isActivate: boolean;
  isNew: boolean;
}

interface DbConnectionStoreState {
  schemas: string[];
  dialog: {
    categories: boolean;
    connSetting: boolean;
  };
  test: {
    message: string;
    status: boolean | null;
  };
  setting: ConnectionSetting;
  select: ConnectionActivate;
  list: ConnectionActivate[];
  table: ConnectionTable[];
  types: ConnectionTypes[];
}

export type { DbConnectionStoreState, ConnectionList, ConnectionTypes };
