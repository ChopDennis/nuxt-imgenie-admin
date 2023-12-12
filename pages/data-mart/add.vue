<template>
  <div>
    <div class="flex flex-col">
      <div
        class="flex flex-col gap-4 px-5 pb-4 sticky top-0 bg-white -mt-1 z-50"
      >
        <div class="flex text-sm">
          <p class="text-gray-300">
            首頁&nbsp;/&nbsp;系統管理&nbsp;/&nbsp;資料模型&nbsp;設定&nbsp;/&nbsp;
          </p>
          <p>資料模型新增</p>
        </div>
        <div class="flex justify-start">
          <h1 class="text-xl font-bold tracking-wide">資料模型新增</h1>
        </div>
      </div>
      <DataMartSetForm />
    </div>
  </div>
</template>
<script setup lang="ts">
const sideMenuActive = useSideMenuActive();
const store = useDataMartStore();
store.resetDataMartSetForm();
sideMenuActive.value = "2-2";
</script>
