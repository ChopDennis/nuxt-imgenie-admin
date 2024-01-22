enum DataMartGroupApi {
  datamartGroups = "/api/admin/group/datamart-groups",
  saveDatamartGroup = "/api/admin/group/save-datamart-group",
  datamartGroupMembers = "/api/admin/group/datamart-group-members",
}

const getDataMartGroupsApi = () =>
  useApi<DataMartGroup[]>(DataMartGroupApi.datamartGroups);

const getDataMartGroupMembersApi = (datamartGroupId: string) =>
  useApi<DatamartGroupMembers>(DataMartGroupApi.datamartGroupMembers, {
    params: {
      datamartGroupId,
    },
  });

const updateDataMartGroupApi = (datamartGroupId: string, isActivate: boolean) =>
  useApi(DataMartGroupApi.saveDatamartGroup, {
    params: {
      datamartGroupId,
      isActivate,
    },
  });
const saveDataMartGroupApi = (params: any) =>
  useApi(DataMartGroupApi.saveDatamartGroup, {
    params,
  });

export {
  getDataMartGroupsApi,
  getDataMartGroupMembersApi,
  saveDataMartGroupApi,
  updateDataMartGroupApi,
};
