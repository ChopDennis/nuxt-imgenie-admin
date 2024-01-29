interface DataMartGroup {
  datamartGroupId: string;
  datamartGroupName: string;
  description: string;
  isActivate: boolean;
  createTime: string;
}

interface DatamartGroupMembers extends DataMartGroup {
  datamarts: {
    datamartId: string;
    datamartName: string;
    icon: string;
  }[];
  userGroups: {
    userGroupId: string;
    userGroupName: string;
  }[];
  users: {
    userId: string;
    userName: string;
    email: string;
  }[];
}

interface DataMartGroupSave {
  datamartGroupName: string;
  description: string;
  datamartIds: string[];
  userIds: string[];
  userGroupIds: string[];
}

interface DataMartGroupStoreState {
  groups: DataMartGroup[];
  members: DatamartGroupMembers;
  save: DataMartGroupSave;
}

export type { DataMartGroup, DatamartGroupMembers, DataMartGroupSave };

export const useDataMartGroupStore = defineStore("dataMartGroup", {
  state: (): DataMartGroupStoreState => {
    return {
      groups: [],
      members: {
        datamartGroupId: "",
        datamartGroupName: "",
        description: "",
        isActivate: false,
        createTime: "",
        datamarts: [],
        userGroups: [],
        users: [],
      },
      save: {
        datamartGroupName: "",
        description: "",
        datamartIds: [],
        userGroupIds: [],
        userIds: [],
      },
    };
  },
});
