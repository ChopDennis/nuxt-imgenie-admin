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
    const userGroupId = _useToString(useRoute().query.userGroupId);
    const { data: response } = await getUserGroupMembersApi(userGroupId);
    userGroupStore.members = response.value.data;
  };

  const updateUserGroups = async (
    userGroupId: string,
    isActivate: boolean,
  ): Promise<boolean> => {
    const { data: response } = await saveUserGroupsApi(userGroupId, isActivate);
    return response.value.code === ApiResponseCode.Success;
  };

  return {
    getUsers,
    getUserGroups,
    getUserGroupMembers,
    updateUserGroups,
  };
}
