interface ConnInfo {
  host: string;
  port: string;
  database: string;
  username?: string;
  password?: string;
  ssl?: {
    isSSL?: boolean;
    isClientCertificate?: boolean;
    ca?: any;
    clientCertificate?: any;
    clientKey?: any;
  };
}
interface DbConnectionRes {
  connId: string;
  dbType: string;
  connInfo: ConnInfo;
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
  connName: string;
  connInfo: ConnInfo;
}
interface DbConnSetForm {
  連線名稱: string;
  主機名稱或IP: string;
  通訊埠: string;
  使用者名稱: string;
  密碼: string;
  資料庫名稱: string;
  dbType: string;
  啟用SSL: boolean;
  啟用用戶端驗證: boolean;
  // "Server Certificate": ssl.ca ?? null,
  // "Client Certificate": ssl.clientCertificate ?? null,
  // "Client Key": ssl.clientKey ?? null,
}

export type {
  ConnInfo,
  DbConnectionRes,
  DbCategoriesRes,
  MappingDbConnectionList,
  DbQueryRes,
  DbConnSetForm,
};
