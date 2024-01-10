interface TitleInfo {
  breadcrumb: string;
  pageName: string;
  btnName: string;
  tableColumn?: { [keys: string]: string };
  sideMenuIndex: string;
}

interface PageLayout {
  [keys: string]: TitleInfo;
}

interface SubMenu {
  title: string;
  path: string;
}

interface SideMenuList {
  icon: string;
  title: string;
  subMenu: SubMenu[];
}

export const useLayoutStore = defineStore("layout", {
  state: () => {
    return {
      pageLayout: {
        "/db-connection": {
          breadcrumb: "首頁 / 系統管理 /",
          pageName: "資料庫連線",
          btnName: "新增連線",
          tableColumn: {
            connName: "連線名稱",
            database: "資料庫名稱",
            host: "主機名稱或IP",
          },
          sideMenuIndex: "2-1",
        },
        "/data-mart": {
          breadcrumb: "首頁 / 系統管理 /",
          pageName: "資料模型設定",
          btnName: "新增資料模型",
          tableColumn: {
            dataMartName: "資料模型名稱",
            connName: "連線名稱",
          },
          sideMenuIndex: "2-2",
        },
        "/data-mart/add": {
          breadcrumb: "首頁 / 系統管理 /",
          pageName: "資料模型新增",
          btnName: "",
          sideMenuIndex: "2-2",
        },
        "/data-mart/edit": {
          breadcrumb: "首頁 / 系統管理 /",
          pageName: "資料模型編輯",
          btnName: "",
          sideMenuIndex: "2-2",
        },
        "/user-group": {
          breadcrumb: "首頁 / 權限管理 /",
          pageName: "使用者群組管理",
          btnName: "建立群組",
          sideMenuIndex: "1-3",
        },
        "/user-group/edit": {
          breadcrumb: "首頁 / 權限管理 / 使用者群組管理 /",
          pageName: "群組資料設定",
          btnName: "",
          sideMenuIndex: "1-3",
        },
        "/data-mart-group": {
          breadcrumb: "首頁 / 權限管理 /",
          pageName: "資料模型群組管理",
          btnName: "建立群組",
          sideMenuIndex: "1-4",
        },
        "/data-mart-group/edit": {
          breadcrumb: "首頁 / 權限管理 / 資料模型群組管理 /",
          pageName: "群組資料設定",
          btnName: "",
          sideMenuIndex: "1-4",
        },
        "/": {
          breadcrumb: "",
          pageName: "",
          btnName: "",
          sideMenuIndex: "",
        },
      } as PageLayout,
      sideMenu: {
        list: [
          {
            icon: "ic_authority",
            title: "權限管理",
            subMenu: [
              {
                title: "帳號設定",
                path: "/db-connection",
              },
              {
                title: "角色管理",
                path: "/db-connection",
              },
              {
                title: "使用者群組管理",
                path: "/user-group",
              },
              {
                title: "資料模型群組管理",
                path: "/data-mart-group",
              },
            ],
          },
          {
            icon: "ic_system",
            title: "系統管理",
            subMenu: [
              {
                title: "資料庫連線",
                path: "/db-connection",
              },
              {
                title: "資料模型設定",
                path: "/data-mart",
              },
            ],
          },
        ] as SideMenuList[],
        collapse: false,
      },
    };
  },
});
