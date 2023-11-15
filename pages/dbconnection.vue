<template>
  <div>
    <div class="px-5 flex">
      <p class="text-gray-300">首頁／系統管理／</p>
      <p>資料庫連線</p>
    </div>
    <!-- 資料庫連線 -->
    <div class="flex flex-col gap-4 p-5">
      <div class="flex justify-between">
        <h1 class="text-xl font-bold tracking-wide">資料庫連線</h1>
        <div>
          <ElButton
            style=""
            :icon="ElIconRefresh"
            type="primary"
            @click="store.getDbConnList(false)"
            >重新整理</ElButton
          >
          <ElButton
            style=""
            :icon="ElIconPlus"
            type="primary"
            @click="clickAddNewConn"
            >新增連線</ElButton
          >
        </div>
      </div>
      <DbConnectionList />
    </div>

    <!-- 選擇連線類型 -->
    <ElDialog
      v-model="store.dbConnDialog.categories"
      title="選擇連線類型"
      modal-class="backdrop-blur-sm"
      align-center
    >
      <DbConnectionTypes />
    </ElDialog>

    <!-- 連線設定 -->
    <ElDialog
      v-model="store.dbConnDialog.connSetting"
      :destroy-on-close="true"
      :title="`${store.dbConnSetTitle} 連線設定`"
      modal-class="backdrop-blur-sm"
      align-center
      width="576"
    >
      <DbConnectionSet />
    </ElDialog>
  </div>
</template>
<script setup lang="ts">
const store = useDbConnectionStore();
await store.getDbConnList(true);

const clickAddNewConn = async () => {
  await store.getDbConnTypes();
  store.dbConnDialog.categories = true;
};
</script>
<style scoped>
.db-category-active {
  border: 1px solid rgb(69, 109, 236);
  background-color: rgba(246, 247, 249, 1);
}
</style>
