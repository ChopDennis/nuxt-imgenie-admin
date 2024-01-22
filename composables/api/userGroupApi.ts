enum UserGroupApi {
  users = "/api/admin/group/users",
  userGroups = "/api/admin/group/user-groups",
  saveUserGroup = "/api/admin/group/save-user-group",
  userGroupMembers = "/api/admin/group/user-group-members",
}

const getUsersApi = () => useApi<Users[]>(UserGroupApi.users);

const getUserGroupsApi = () => useApi<UserGroups[]>(UserGroupApi.userGroups);

const getUserGroupMembersApi = (userGroupId: string) =>
  useApi<UserGroupMembers>(UserGroupApi.userGroupMembers, {
    params: {
      userGroupId,
    },
  });

const updateUserGroupApi = (userGroupId: string, isActivate: boolean) =>
  useApi<UserGroups>(UserGroupApi.saveUserGroup, {
    params: {
      userGroupId,
      isActivate,
    },
  });
const saveUserGroupApi = (params: any) =>
  useApi<UserGroups>(UserGroupApi.saveUserGroup, {
    params,
  });

export {
  getUsersApi,
  getUserGroupsApi,
  getUserGroupMembersApi,
  updateUserGroupApi,
  saveUserGroupApi,
};
