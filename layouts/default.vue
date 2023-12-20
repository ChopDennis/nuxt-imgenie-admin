<template>
  <div v-loading="isLoading" class="flex flex-col w-full">
    <GlobalSideMenu />
    <GlobalHeader />

    <div
      class="w-full transition-spacing ease-linear"
      :class="[isCollapse ? 'pl-16' : 'pl-64']"
    >
      <ElRow class="px-6 pt-4">
        <ElCol :span="24" class="text-sm"
          ><div class="flex">
            <p class="text-gray-300">{{ titleInfo.breadcrumb }}&nbsp;</p>
            <p>{{ titleInfo.pageName }}</p>
          </div>
        </ElCol>
        <ElCol class="pt-4">
          <div class="flex justify-between h-10">
            <div class="self-end">
              <h1 class="text-xl font-bold tracking-wide">
                {{ titleInfo.pageName }}
              </h1>
            </div>
            <div>
              <ElButton
                v-if="titleInfo.btnName"
                :icon="ElIconPlus"
                type="primary"
                @click="clickBtn(titleInfo.btnName)"
                >{{ titleInfo.btnName }}</ElButton
              >
            </div>
          </div>
        </ElCol>
      </ElRow>
      <div style="height: calc(100vh - 180px)" class="p-6">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const isLoading = useLoading();
const isCollapse = computed(() => useLayoutStore().sideMenu.collapse);
const titleInfo = computed(() => useLayoutStore().pageLayout[useRoute().path]);
const clickBtn = async (btn: string) => {
  if (btn === "新增連線") {
    const store = useDbConnectionStore();
    await store.getDbConnTypes();
    store.dbConnDialog.categories = true;
  } else {
    navigateTo({ path: "/data-mart/add" });
  }
};
</script>

<style></style>
