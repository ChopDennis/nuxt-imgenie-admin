<template>
  <div>
    <div class="flex flex-col">
      <div
        class="flex flex-col gap-4 px-5 pb-4 sticky top-0 bg-white -mt-1 z-50"
      >
        <div class="flex text-sm">
          <p class="text-gray-300">首頁／系統管理／</p>
          <p>DataMart</p>
        </div>
        <div class="flex justify-between">
          <h1 class="text-xl font-bold tracking-wide">Data Mart 設定</h1>
          <div>
            <ElButton :icon="ElIconRefresh" type="primary">重新整理</ElButton>
            <ElButton
              :icon="ElIconPlus"
              type="primary"
              @click="clickAddNewDataMart()"
              >新增 Data Mart</ElButton
            >
          </div>
        </div>
      </div>
      <DataMartList />
    </div>
  </div>
</template>
<script setup lang="ts">
const store = useDataMartStore();
await store.getDataMartList(true, false);
const clickAddNewDataMart = () => {
  store.resetDataMartForm();
  navigateTo({ path: "/datamart/edit" });
};
</script>
<style scoped></style>
