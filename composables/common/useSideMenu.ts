interface SubMenu {
  title: string;
  path: string;
}

interface SideMenuList {
  icon: string;
  title: string;
  subMenu: SubMenu[];
}

const sideMenuList = [
  {
    icon: "ic_authority",
    title: "權限管理",
    subMenu: [
      {
        title: "帳號設定",
        path: "/",
      },
      {
        title: "角色管理",
        path: "/",
      },
      {
        title: "群組管理",
        path: "/",
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
];

export const useSideMenuCollapse = () => {
  return useState<boolean>("collapse", () => false);
};

export const useSideMenuActive = () => {
  return useState<string>("active", () => "2-1");
};

export const useSideMenuList = () => {
  return useState<SideMenuList[]>("list", () => sideMenuList);
};
