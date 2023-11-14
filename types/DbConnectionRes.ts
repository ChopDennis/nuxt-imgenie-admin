declare global {
  interface ConnInfo {
    host: string;
    port: string;
    database: string;
    username?: string;
    password?: string;
    ssl?: any;
  }
  interface DbConnListRes {
    connId: string;
    dbType: string;
    connInfo: ConnInfo;
    connName: string;
    updateTime: string;
  }

  interface DbConnListMap {
    connId: string;
    connTypeName: string;
    updateTime: string;
    connInfoHostPort: string;
    connInfoDatabase: string;
    isActive: boolean;
    rowNumber: number;
  }

  interface DbCategoriesRes {
    icon: string;
    title: string;
    itemId: string;
    refUrl: string | null;
    description: string | null;
  }

  interface DbConnQueryRes {
    connId: string;
    dbType: string;
    connName: string;
    connInfo: ConnInfo;
  }
  interface DbConnSetForm {
    connName: string;
    host: string;
    port: string;
    username?: string;
    password?: string;
    database: string;
    ssl?: any;
    [key: string]: any;
  }

  interface DbConnSaveRes {
    connId: string;
    dbType: string;
    connName: string;
    connInfo: string;
    updateTime: string;
    // TODO: isActive: boolean
  }
}

export {};
