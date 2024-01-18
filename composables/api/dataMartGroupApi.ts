enum DataMartGroupApi {
  datamartGroups = "/api/admin/group/datamart-groups",
  saveDatamartGroup = "/api/admin/group/save-datamart-group",
  datamartGroupMembers = "/api/admin/group/datamart-group-members",
}

const getDataMartGroupsApi = () =>
  useApi<DataMartGroup[]>(DataMartGroupApi.datamartGroups);

const getDataMartGroupMembersApi = (datamartGroupId: string) =>
  useApi<DatamartGroupMembers[]>(DataMartGroupApi.datamartGroupMembers, {
    params: {
      datamartGroupId,
    },
  });

const saveDataMartGroupApi = (datamartGroupId: string, isActivate: boolean) =>
  useApi(DataMartGroupApi.saveDatamartGroup, {
    params: {
      datamartGroupId,
      isActivate,
    },
  });

export {
  getDataMartGroupsApi,
  getDataMartGroupMembersApi,
  saveDataMartGroupApi,
};
