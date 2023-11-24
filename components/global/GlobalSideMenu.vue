<template>
  <div class="absolute h-full" style="z-index: 999">
    <ClientOnly>
      <ElMenu
        class="el-menu-vertical"
        :collapse="store.isSideMenuCollapse"
        background-color="#20222F"
        text-color="white"
        default-active="2-1"
        active-text-color="#456DEC"
      >
        <ElMenuItem style="background-color: #313549">
          <img
            :src="icons['ic_menu_collapse']"
            width="24"
            :class="[
              store.isSideMenuCollapse
                ? 'icon-menu-collapse'
                : 'icon-menu-expend',
            ]"
            @click="store.isSideMenuCollapse = !store.isSideMenuCollapse"
          />
          <template #title>
            <div
              v-if="!store.isSideMenuCollapse"
              class="text-white font-bold text-base"
            >
              iMGenie 後台管理
            </div>
          </template>
        </ElMenuItem>

        <ElSubMenu
          v-for="(menu, menuIndex) in sideMenuList"
          :key="menuIndex"
          :index="_useToString(menuIndex + 1)"
        >
          <template #title>
            <img :src="icons[`${menu.icon}`]" width="16" />
            <div
              v-if="!store.isSideMenuCollapse"
              class="font-normal text-sm px-2"
            >
              {{ menu.title }}
            </div></template
          >
          <ElMenuItemGroup>
            <el-menu-item
              v-for="(subMenu, subMenuIndex) in menu.subMenu"
              :key="subMenuIndex"
              :index="_useToString(`${menuIndex + 1}-${subMenuIndex + 1}`)"
              @click="navigateTo(`${subMenu.path}`)"
              >{{ subMenu.title }}</el-menu-item
            >
          </ElMenuItemGroup>
        </ElSubMenu>
      </ElMenu>
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
const sideMenuList = ref();
const store = useGlobalStore();
const icons = dynamicImportSideMenuIcons();

sideMenuList.value = [
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
        path: "/dbconnection",
      },
      {
        title: "Data Mart 設定",
        path: "/datamart",
      },
    ],
  },
];
</script>
<style>
.icon-menu-collapse {
  transform: scaleX(-1);
}
.icon-menu-expend {
  position: absolute;
  left: 276px;
}
</style>
