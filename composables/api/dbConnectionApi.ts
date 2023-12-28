enum Api {
  All = "/api/datamart/dbconnection/all",
  List = "/api/datamart/dbconnection/list",
  Types = "/api/datamart/dbconnection/dbs",
  Save = "/api/datamart/dbconnection/save",
  Test = "/api/datamart/dbconnection/test-connection",
  Query = "/api/datamart/dbconnection/query",
  Update = "/api/datamart/dbconnection/update",
  Schemas = "/api/datamart/dbconnection/schemas",
}

export default function dbConnectionApi() {
  const store = useDbConnectionStore();
  const test = async () => {
    store.dbConnTestStatus = null;
    const dbType = store.dbConnSetType;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { connName, ...info } = store.dbConnSetForm;
    const connInfo = JSON.stringify(info);
    const params: DbConnTestReq = {
      dbType,
      connInfo,
    };

    const { data, status } = await useApi(Api.Test, {
      params,
      encrypt: true,
      loading: true,
    });

    if (status.value === "success") {
      const test = data.value as ApiResponse;
      console.log(test.code); // eslint-disable-line no-console
      if (test.code === ApiResponseCode.Success) {
        store.dbConnTestStatus = true;
        store.dbConnTestMessage = "連線成功";
      } else {
        store.dbConnTestStatus = false;
        store.dbConnTestMessage = test.message as string;
      }
    }
  };

  return {
    test,
  };
}
