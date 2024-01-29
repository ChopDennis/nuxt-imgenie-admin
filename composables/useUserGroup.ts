export default function useUserGroup() {
  const userGroupStore = useUserGroupStore();

  const getUsers = async () => {
    const { data: response } = await getUsersApi();
    userGroupStore.users = response.value.data;
  };

  const getUserGroups = async () => {
    const { data: response } = await getUserGroupsApi();
    userGroupStore.groups = response.value.data;
  };

  const getUserGroupMembers = async () => {
    if (isEmpty(useRoute().query)) return;
    const userGroupId = _useToString(useRoute().query.userGroupId);
    const { data: response } = await getUserGroupMembersApi(userGroupId);
    userGroupStore.members = response.value.data;
  };

  const updateUserGroup = async (
    userGroupId: string,
    isActivate: boolean,
  ): Promise<boolean> => {
    const { data: response } = await updateUserGroupApi(
      userGroupId,
      isActivate,
    );
    return response.value.code === ApiResponseCode.Success;
  };

  const saveUserGroup = async (): Promise<boolean> => {
    const { userGroupId, userGroupName, description, users } =
      userGroupStore.members;
    const userIds = _useMap(users, "userId");
    let params;
    if (!isEmpty(userGroupId)) {
      params = {
        userGroupId,
        groupName: userGroupName,
        description,
        userIds,
      };
    } else {
      params = {
        groupName: userGroupName,
        description,
        userIds,
      };
    }

    const { data: response } = await saveUserGroupApi(params);
    return response.value.code === ApiResponseCode.Success;
  };

  const resetUserGroup = () => {
    userGroupStore.members = {
      userGroupId: "",
      userGroupName: "",
      description: "",
      users: [],
    };
  };

  return {
    getUsers,
    getUserGroups,
    getUserGroupMembers,
    updateUserGroup,
    saveUserGroup,
    resetUserGroup,
  };
}
