/** Backend API response code */
// TODO: 需要把其他錯誤的回傳參數補上
declare global {
  interface ApiResponse {
    code?: string;
    message?: string;
    data?: any;
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
  List = "/api/dbConnection/all",
  Types = "/api/dbConnection/dbs",
  Save = "/api/dbConnection/save",
  Test = "/api/dbConnection/test-connection",
  Query = "/api/dbConnection/query",
  Update = "/api/dbConnection/update",
}

enum ApiDataMart {
  List = "/api/dataMart/all",
}

export { ApiDbConnection, ApiResponseCode, ApiDataMart };
