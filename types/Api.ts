/** Backend API response code */
// TODO: 需要把其他錯誤的回傳參數補上
declare global {
  interface ApiResponse {
    code?: string;
    message?: string;
    data?: any;
  }

  interface ApiOptions {
    params?: any | null;
    cached?: boolean;
    loading?: boolean;
    encrypt?: boolean;
    decrypt?: boolean;
  }
}

enum ApiResponseCode {
  Success = "A0001",
  ParameterError = "P0001",

  IllegalArgument = "E0001",
  EntityNotFound = "E0002",
  EntityAlreadyExists = "E0003",
  IllegalStatusToOperate = "E0004",
  TooManyRequests = "E0005",

  AccountStatusIsInitial = "E0011",
  AccountStatusIsInActive = "E0012",

  ExportFileFail = "E0021",
  ExportFileTimeOut = "E0022",
  UnhandledException = "E9999",

  DataNotFound = "B0001",
}

enum ApiDbConnection {
  List = "/api/datamart/dbconnection/all",
  Types = "/api/datamart/dbconnection/dbs",
  Save = "/api/datamart/dbconnection/save",
  Test = "/api/datamart/dbconnection/test-connection",
  Query = "/api/datamart/dbconnection/query",
  Update = "/api/datamart/dbconnection/update",
}

enum ApiDataMart {
  List = "/api/datamart/datamart/all",
  Update = "/api/datamart/datamart/update",
}

export { ApiDbConnection, ApiResponseCode, ApiDataMart };
