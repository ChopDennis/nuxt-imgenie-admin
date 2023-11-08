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

export type { DbConnectionRes, DbCategoriesRes, MappingDbConnectionList };
