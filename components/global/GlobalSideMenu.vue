<template>
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
            >{{ subMenu.title }}</el-menu-item
          >
        </ElMenuItemGroup>
      </ElSubMenu>
    </ElMenu>
    <!-- <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="store.isSideMenuCollapse"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu> -->
  </ClientOnly>
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
        path: "/",
      },
      {
        title: "Data Mart 設定",
        path: "/",
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
