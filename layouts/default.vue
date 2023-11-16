<template>
  <div v-loading="isLoading" class="flex flex-col w-full">
    <div class="absolute h-full" style="z-index: 999">
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
      class="w-full transition-spacing ease-linear overflow-y-scroll pb-4"
      :class="[store.isSideMenuCollapse ? 'pl-16' : 'pl-64']"
      style="height: calc(100vh - 64px)"
    >
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const store = useGlobalStore();
const isLoading = useLoading();
const goToLogin = () => {
  navigateTo({ path: "/" });
};
</script>

<style></style>
