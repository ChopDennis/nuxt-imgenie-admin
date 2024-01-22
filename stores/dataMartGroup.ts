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

interface DataMartGroupStoreState {
  groups: DataMartGroup[];
  members: DatamartGroupMembers;
}

export type { DataMartGroup, DatamartGroupMembers };

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
    };
  },
});
