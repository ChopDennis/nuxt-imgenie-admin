export default function useDataMartGroup() {
  const dataMartGroupStore = useDataMartGroupStore();

  const getDataMartGroup = async () => {
    const { data: response } = await getDataMartGroupsApi();
    dataMartGroupStore.groups = response.value.data;
  };

  const getDataMartGroupMembers = async () => {
    const datamartGroupId = _useToString(useRoute().query.datamartGroupId);
    const { data: response } =
      await getDataMartGroupMembersApi(datamartGroupId);
    dataMartGroupStore.members = response.value.data;
  };

  const updateDataMartGroup = async (
    datamartGroupId: string,
    isActivate: boolean,
  ) => {
    const { data: response } = await updateDataMartGroupApi(
      datamartGroupId,
      isActivate,
    );
    return response.value.code === ApiResponseCode.Success;
  };

  const saveDataMartGroup = async (params: any) => {
    const { data: response } = await saveDataMartGroupApi(params);
    return response.value.code === ApiResponseCode.Success;
  };

  return {
    getDataMartGroup,
    getDataMartGroupMembers,
    updateDataMartGroup,
    saveDataMartGroup,
  };
}
