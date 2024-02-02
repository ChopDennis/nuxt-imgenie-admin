<template>
  <div v-loading="true" class="flex flex-col w-full h-screen">
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
        <ElCol class="pt-4 pb-2">
          <div class="flex justify-between h-10">
            <div class="self-end">
              <h1 class="text-xl font-bold tracking-wide">
                {{ titleInfo.pageName }}
              </h1>
            </div>
            <div>
              <ElButton
                v-if="titleInfo.btnName && !isEdit"
                :icon="ElIconPlus"
                type="primary"
                @click="clickBtn(titleInfo.btnName)"
                >{{ titleInfo.btnName }}</ElButton
              >
            </div>
          </div>
        </ElCol>
      </ElRow>
      <div style="height: calc(100vh - 180px)">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const isLoading = useLoading();
const isCollapse = computed(() => useLayoutStore().sideMenu.collapse);
const titleInfo = computed(
  () => useLayoutStore().pageLayout[useRoute().path] || "",
);
const isConnTypes = openConnectionTypes();
const dataMartStore = useDataMartStore();
const isEdit = computed(() => {
  return dataMartStore.isEdit;
});
const clickBtn = async (btn: string) => {
  if (btn === "新增連線") {
    await useDbConnectionApi().getTypes();
    isConnTypes.value = true;
  }
  if (btn === "新增資料模型") {
    useDataMartApi().resetForm();
    dataMartStore.isEdit = true;
  }
  if (btn === "建立群組" && useRoute().path === "/user-group") {
    navigateTo({ path: "/user-group/edit" });
  }
  if (btn === "建立群組" && useRoute().path === "/data-mart-group") {
    navigateTo({ path: "/data-mart-group/edit" });
  }
};
</script>
