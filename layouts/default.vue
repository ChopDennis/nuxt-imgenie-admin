<template>
  <div v-loading="isLoading" class="flex flex-col w-full">
    <GlobalSideMenu />
    <GlobalHeader />

    <div
      class="w-full transition-spacing ease-linear overflow-y-scroll pb-4"
      :class="[isCollapse ? 'pl-16' : 'pl-64']"
      style="height: calc(100vh - 64px)"
    >
      <div class="flex flex-col top-0 px-6 pt-4 gap-4 bg-white z-50 pb-3">
        <div class="flex text-sm">
          <p class="text-gray-300">{{ titleInfo.breadcrumb }}&nbsp;</p>
          <p>{{ titleInfo.pageName }}</p>
        </div>
        <div class="flex justify-between">
          <h1 class="text-xl font-bold tracking-wide">
            {{ titleInfo.pageName }}
          </h1>
          <div>
            <ElButton
              v-if="titleInfo.btnName"
              :icon="ElIconPlus"
              type="primary"
              @click="titleInfo.btnFn"
              >{{ titleInfo.btnName }}</ElButton
            >
          </div>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const isLoading = useLoading();
const isCollapse = useSideMenuCollapse();
const useLayout = useLayoutStore();
const titleInfo = ref();
watchEffect(() => {
  const currentPath = useRoute().path;
  titleInfo.value = useLayout.pageLayout[currentPath];
});
</script>

<style></style>
