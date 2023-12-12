declare global {
  interface ConnInfo {
    host: string;
    port: string;
    database: string;
    username: string;
    password: string;
    ssl?: any;
  }
  interface DbConnListRes {
    connId: string;
    dbType: string;
    connInfo: ConnInfo;
    connName: string;
    updateTime: string;
    isActivate: boolean;
  }

  interface DbConnListMap {
    connId: string;
    connType: string;
    connName: string;
    updateTime: string;
    connInfoHostPort: string;
    connInfoDatabase: string;
    isActivate: boolean;
  }

  interface DbConnTypesRes {
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
    isActivate: boolean;
  }
  interface DbConnSetForm {
    connName: string;
    host: string;
    port: string;
    username?: string;
    password?: string;
    database: string;
    ssl?: {
      isSSL: boolean;
      isClientCertificate: boolean;
      ca: string;
      clientCertificate: string;
      clientKey: string;
      // TODO: File
    };
    [key: string]: any;
  }

  interface DbConnSaveRes {
    connId: string;
    dbType: string;
    connName: string;
    connInfo: ConnInfo;
    updateTime: string;
    isActivate: boolean;
  }
}

export {};
