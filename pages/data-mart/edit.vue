<template>
  <div>
    <div class="flex flex-col">
      <div
        class="flex flex-col gap-4 px-5 pb-4 sticky top-0 bg-white -mt-1 z-50"
      >
        <div class="flex text-sm">
          <p class="text-gray-300">
            首頁&nbsp;/&nbsp;系統管理&nbsp;/&nbsp;DataMart&nbsp;設定&nbsp;/&nbsp;
          </p>
          <p>DataMart 編輯</p>
        </div>
        <div class="flex justify-between">
          <h1 class="text-xl font-bold tracking-wide">DataMart 編輯</h1>
          <div>
            <ElButton :icon="ElIconRefresh" type="primary">重新整理</ElButton>
            <ElButton :icon="ElIconPlus" type="primary"
              >新增 Data Mart</ElButton
            >
          </div>
        </div>
      </div>
      <DataMartInfo />
    </div>
  </div>
</template>
<script setup lang="ts">
const store = useDataMartStore();
const route = useRoute();

await store.getDataMartQuery(route.query.datamartId as string);
</script>
<style scoped></style>
