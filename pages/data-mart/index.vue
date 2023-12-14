<template>
  <div>
    <div class="flex flex-col">
      <div
        class="flex flex-col gap-4 px-5 pb-4 sticky top-0 bg-white -mt-1 z-50"
      >
        <div class="flex text-sm">
          <p class="text-gray-300">首頁／系統管理／</p>
          <p>資料模型設定</p>
        </div>
        <div class="flex justify-between">
          <h1 class="text-xl font-bold tracking-wide">資料模型設定</h1>
          <div>
            <ElButton
              :icon="ElIconPlus"
              type="primary"
              @click="navigateTo({ path: '/data-mart/add' })"
              >新增資料模型</ElButton
            >
          </div>
        </div>
      </div>
      <DataMartTable :table="store.dataMartTable" />
    </div>
  </div>
</template>
<script setup lang="ts">
const store = useDataMartStore();
await store.getDataMartTable();
const sideMenuActive = useSideMenuActive();
sideMenuActive.value = "2-2";
</script>
