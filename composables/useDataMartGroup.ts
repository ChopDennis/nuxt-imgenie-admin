export default function useDataMartGroup() {
  const dataMartGroupStore = useDataMartGroupStore();

  const getDataMartGroup = async () => {
    const { data: response } = await getDataMartGroupsApi();
    dataMartGroupStore.groups = response.value.data;
  };

  const getDataMartGroupMembers = async () => {
    if (isEmpty(useRoute().query)) return;
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

  const saveDataMartGroup = async (): Promise<boolean> => {
    dataMartGroupStore.members = useForm().trim(
      dataMartGroupStore.members,
    ) as DatamartGroupMembers;
    const {
      datamartGroupId,
      datamartGroupName,
      description,
      users,
      userGroups,
      datamarts,
    } = dataMartGroupStore.members;

    const userIds = _useMap(users, "userId");
    const userGroupIds = _useMap(userGroups, "userGroupId");
    const datamartIds = _useMap(datamarts, "datamartId");
    let params;

    if (!isEmpty(datamartGroupId)) {
      params = {
        datamartGroupId,
        datamartGroupName,
        description,
        userIds,
        userGroupIds,
        datamartIds,
      };
    } else {
      params = {
        datamartGroupName,
        description,
        userIds,
        userGroupIds,
        datamartIds,
      };
    }

    const { data: response } = await saveDataMartGroupApi(params);
    return response.value.code === ApiResponseCode.Success;
  };

  const resetDataMartGroup = () => {
    dataMartGroupStore.members = {
      datamartGroupId: "",
      datamartGroupName: "",
      description: "",
      isActivate: false,
      createTime: "",
      datamarts: [],
      userGroups: [],
      users: [],
    };
  };

  return {
    getDataMartGroup,
    getDataMartGroupMembers,
    updateDataMartGroup,
    saveDataMartGroup,
    resetDataMartGroup,
  };
}
