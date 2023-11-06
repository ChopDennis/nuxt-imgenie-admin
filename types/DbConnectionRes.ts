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

export type { DbConnectionRes };
