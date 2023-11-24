<template>
  <div v-loading="isLoading" class="flex flex-col w-full">
    <GlobalSideMenu />
    <GlobalHeader />

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
</script>

<style></style>
