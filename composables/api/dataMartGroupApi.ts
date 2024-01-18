enum DataMartGroupApi {
  datamartGroups = "/api/admin/group/datamart-groups",
  saveDatamartGroups = "/api/admin/group/save-datamart-groups",
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
  useApi(DataMartGroupApi.saveDatamartGroups, {
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
