enum UserGroupApi {
  users = "/api/admin/group/users",
  userGroups = "/api/admin/group/user-groups",
  saveUserGroups = "/api/admin/group/save-user-groups",
  userGroupMembers = "/api/admin/group/user-group-members",
}

const getUsersApi = () => useApi<Users[]>(UserGroupApi.users);

const getUserGroupsApi = () => useApi<UserGroups[]>(UserGroupApi.userGroups);

const getUserGroupMembersApi = (userGroupId: string) =>
  useApi<UserGroupMembers[]>(UserGroupApi.userGroupMembers, {
    params: {
      userGroupId,
    },
  });

const saveUserGroupsApi = (userGroupId: string, isActivate: boolean) =>
  useApi<UserGroups>(UserGroupApi.saveUserGroups, {
    params: {
      userGroupId,
      isActivate,
    },
  });

export {
  getUsersApi,
  getUserGroupsApi,
  getUserGroupMembersApi,
  saveUserGroupsApi,
};
