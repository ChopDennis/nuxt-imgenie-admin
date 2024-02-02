interface UserGroups {
  userGroupId: string;
  userGroupName: string;
  description: string;
  isActivate: boolean;
  createTime: string;
}

interface Users {
  userId: string;
  userName: string;
  email: string;
  emailVerified?: true;
  createTime?: string;
}

interface UserGroupMembers {
  userGroupId: string;
  userGroupName: string;
  description: string;
  users: Users[];
}

interface userGroupSave {
  userGroupName: string;
  description: string;
  userIds: string[];
}

interface UserGroupStoreState {
  users: Users[];
  groups: UserGroups[];
  members: UserGroupMembers;
  save: userGroupSave;
}

export type { Users, UserGroups, UserGroupMembers };

export const useUserGroupStore = defineStore("userGroup", {
  state: (): UserGroupStoreState => {
    return {
      groups: [],
      members: {
        userGroupId: "",
        userGroupName: "",
        description: "",
        users: [],
      },
      users: [],
      save: {
        userGroupName: "",
        description: "",
        userIds: [],
      },
    };
  },
});
