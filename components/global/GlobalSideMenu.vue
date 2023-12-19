<template>
  <div class="absolute h-full" style="z-index: 999">
    <ClientOnly>
      <ElMenu
        class="el-menu-vertical"
        :collapse="isCollapse"
        background-color="#20222F"
        text-color="white"
        :default-active="sideMenuActive"
        active-text-color="#456DEC"
      >
        <ElMenuItem style="background-color: #313549">
          <img
            :src="icons['ic_menu_collapse']"
            width="24"
            :class="[isCollapse ? 'icon-menu-collapse' : 'icon-menu-expend']"
            @click="collapseSideMenu"
          />
          <template #title>
            <div v-if="!isCollapse" class="text-white font-bold text-base">
              iMGenie 後台管理
            </div>
          </template>
        </ElMenuItem>

        <ElSubMenu
          v-for="(menu, menuIndex) in useLayoutStore().sideMenu.list"
          :key="menuIndex"
          :index="_useToString(menuIndex + 1)"
        >
          <template #title>
            <img :src="icons[`${menu.icon}`]" width="16" />
            <div v-if="!isCollapse" class="font-normal text-sm px-2">
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
const sideMenuActive = computed(
  () => useLayoutStore().pageLayout[useRoute().path].sideMenuIndex,
);
const isCollapse = computed(() => useLayoutStore().sideMenu.collapse);
const icons = dynamicImportSideMenuIcons();

const collapseSideMenu = () => {
  useLayoutStore().sideMenu.collapse = !useLayoutStore().sideMenu.collapse;
};
</script>
<style>
.icon-menu-collapse {
  transform: scaleX(-1);
}
.icon-menu-expend {
  position: absolute;
  left: 280px;
}
</style>
