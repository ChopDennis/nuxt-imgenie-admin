/** Backend API response code */
// TODO: 需要把其他錯誤的回傳參數補上
enum ApiResponseCode {
  Success = "A0001",
  parameterError = "P0001",

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

interface ApiResponse {
  code?: string;
  message?: string;
  data?: any[];
}

export { ApiResponseCode };
export type { ApiResponse };
