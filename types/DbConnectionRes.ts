interface DbConnectionRes {
  connId: string;
  dbType: string;
  connInfo: {
    host: string;
    port: string;
    database: string;
  };
  connName: string;
  updateTime: string;
}

interface MappingDbConnectionList {
  connId: string;
  connTypeName: string;
  updateTime: string;
  connInfoHostPort: string;
  connInfoDatabase: string;
  connStatus: boolean;
  rowNumber: number;
}

interface DbCategoriesRes {
  icon: string;
  title: string;
  itemId: string;
  refUrl: string | null;
  description: string | null;
}

interface DbQueryRes {
  connId: string;
  dbType: string;
  connInfo: {
    ssl?: {
      isSSL?: boolean;
      isClientCertificate?: boolean;
      ca?: any;
      clientCertificate?: any;
      clientKey?: any;
    };
    host: string;
    port: string;
    database: string;
  };
  connName: string;
}

export type {
  DbConnectionRes,
  DbCategoriesRes,
  MappingDbConnectionList,
  DbQueryRes,
};
