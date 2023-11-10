<template>
  <div class="flex flex-col w-full">
    <div class="z-50 absolute">
      <GlobalSideMenu />
    </div>
    <div class="w-full h-16 flex justify-end items-stretch px-5">
      <div class="self-center px-8"><ElIconBell width="30" /></div>
      <img
        src="~/assets/icons/header/ic_avatar.svg"
        width="40"
        @click="goToLogin()"
      />
      <div class="self-center px-2">
        <h1 class="align-middle font-bold">Avatar</h1>
      </div>
    </div>
    <div
      class="w-full transition-spacing ease-linear"
      :class="[store.isSideMenuCollapse ? 'pl-16' : 'pl-64']"
    >
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">

const store = useGlobalStore();
const goToLogin = () => {
  navigateTo({ path: "/" });
};
</script>

<style></style>
